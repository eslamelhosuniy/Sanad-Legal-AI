import os
import re
import logging
from dotenv import load_dotenv
from helpers.config import get_settings
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from huggingface_hub import InferenceClient
from langchain.schema import Document
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Chroma
from langchain.chains.question_answering import load_qa_chain
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings

load_dotenv("../assets/.env")
settings = get_settings()
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s"
)

# ============================================================
# Configuration
# ============================================================
LAW_FILE = "src/assets/files/law_modified.txt"
QA_FILE = "src/assets/files/100_QA_LaborLaw2025_Final.txt"
VECTOR_DB_DIR = "C:/ao/RAG/RAG-App/src/assets/files/RAG-db"

HF_MODEL = "intfloat/multilingual-e5-large"
GEMINI_MODEL = "gemini-2.5-flash"
GEMINI_API_KEY = settings.GEMINI_API_KEY
HGFACE_API_KEY = settings.HGFACE_API_KEY

# ============================================================
# Setup
# ============================================================
# embeddings = HuggingFaceEmbeddings(model_name=HF_MODEL)
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain_huggingface import HuggingFaceEndpointEmbeddings

# hf_client = HuggingFaceInferenceAPIEmbeddings(
#     api_key=HGFACE_API_KEY,
#     model_name="sentence-transformers/all-MiniLM-L6-v2"
# )

hf_client = HuggingFaceEndpointEmbeddings(
model="intfloat/multilingual-e5-large",
task="feature-extraction",
huggingfacehub_api_token=HGFACE_API_KEY
)



embedding = hf_client.embed_query("ما هو الأجر؟")
logging.log(logging.INFO, f"Embedding Vector Length: {len(embedding)}")
logging.log(logging.INFO, f"First 5 values: {embedding[:5]}")


# ============================================================
# Helper Functions
# ============================================================
def load_documents() -> list[Document]:
    """Load and preprocess documents into LangChain Document objects."""
    data1 = TextLoader(LAW_FILE, encoding="utf-8").load()
    data2 = TextLoader(QA_FILE, encoding="utf-8").load()
    chunks = str(data1).split("##") + str(data2).split(r"\n\n")

    documents = []
    for chunk in chunks:
        match = re.search(
            r"((?:مادة|المادة)\s*\([\d\u0660-\u0669\u06F0-\u06F9]+\))\s*[:：]?", chunk
        )
        article_number = match.group(1) if match else "unknown"
        article_id = f"المادة ({article_number})"

        documents.append(
            Document(
                page_content=chunk,
                metadata={"article_number": article_number, "article_id": article_id},
            )
        )
    return documents


def load_vector_db() -> Chroma:
    logging.log(logging.INFO, "db loaded")
    return Chroma(persist_directory=VECTOR_DB_DIR, embedding_function=hf_client)


def create_vector_db(documents: list[Document]) -> Chroma:
    ids = [str(i) for i in range(len(documents))]
    return Chroma.from_documents(
        documents=documents,
        embedding=hf_client,
        persist_directory=VECTOR_DB_DIR,
        ids=ids,
    )


def build_qa_chain() -> LLMChain:
    prompt = PromptTemplate(
        template=(
            "You are a legal assistant specialized in Egyptian Labor Law.\n"
            "Your task is to answer the user's question using context and any directly related information it implies to answer the question clearly and accurately.\n"
            "The context may contain multiple articles or examples; focus on the parts most relevant to the question and keywords.\n"
            "Stay grounded in the context and its related meaning. If the context and related information do not contain an answer, reply: 'NO ANSWER IS AVAILABLE'.\n\n"
            "Guidelines:\n"
            "1. Always rely strictly on the context. Do not use outside knowledge.\n"
            "2. Use the keywords to identify the most relevant legal rules or articles in the context.\n"
            "3. If the context does not provide enough information to answer, reply exactly with: NO ANSWER IS AVAILABLE.\n"
            "4. Keep the answer clear, concise, and in Modern Standard Arabic.\n\n"
            "### Context:\n{context}\n\n"
            "### Question:\n{question}\n\n"
            "### Keywords:\n{keywords}\n\n"
            "### Answer:\n"
        ),
        input_variables=["context", "question", "keywords"],
    )

    llm = ChatGoogleGenerativeAI(model=GEMINI_MODEL, google_api_key=GEMINI_API_KEY)
    return LLMChain(llm=llm, prompt=prompt)


def Question_Rewriting(question: str):
    prompt = PromptTemplate(
        template=(
            "You are a legal assistant specialized in Egyptian Labor Law.\n"
            "1. Reformulate the user's question so it matches the terminology and keywords "
            "commonly used in Egyptian Labor Law articles.\n"
            "   - Prefer exact legal terms (مثل: 'المادة', 'صاحب العمل', 'العامل', 'عقد العمل', 'الأجر', 'الفصل من العمل').\n"
            "2. Extract the most important keywords from the rewritten question (3–7 max).\n"
            "   - Keep them concise.\n"
            "   - Focus on legal terms and entities.\n"
            "Do NOT answer the question itself.\n\n"
            "### Original Question:\n{question}\n\n"
            "### Rewritten Question:\n"
            "(write the formal legal version here)\n\n"
            "### Keywords:\n"
            "(list the keywords here, separated by commas)\n"
        ),
        input_variables=["question"],
    )

    llm = ChatGoogleGenerativeAI(model=GEMINI_MODEL, google_api_key=GEMINI_API_KEY)
    chain = LLMChain(llm=llm, prompt=prompt)

    rewritten = chain.run(question=question)
    # Parse response into dict
    parts = rewritten.split("### Keywords:")
    rewritten_question = parts[0].replace("### Rewritten Question:", "").strip()
    keywords = parts[1].strip() if len(parts) > 1 else ""
    keywords = [kw.strip() for kw in keywords.split(",") if kw.strip()]
    print(f"rewritten_question: {rewritten_question}, keywords: {keywords}")
    return {
        "rewritten_question": rewritten_question,
        "keywords": keywords,
    }


def enhanced_answer_pipeline(user_question: str, vector_db, k: int = 5):
    processed = Question_Rewriting(user_question)
    # Step 2: Retrieve context using FAISS (local, free)
    similar_docs = vector_db.similarity_search(processed["rewritten_question"], k=k)
    context = "\n\n".join([doc.page_content for doc in similar_docs])
    # logging.log(logging.INFO, f"similar_docs: {similar_docs[0][:10]}")
    logging.info(f"similar_doc[0] content preview: {similar_docs[0].page_content[:10]}")
    qa_chain = build_qa_chain()

    return {
        "answer": qa_chain.run(
            context=context,
            question=processed["rewritten_question"],
            keywords=", ".join(processed["keywords"]),
        ),
        "source_docs": context,
    }

def format_answer(raw_answer: str):
    """
    Formats a raw answer string (with \n) into clean text.
    """
    import re

    answer = raw_answer.replace("\\n", "\n").strip()

    answer = re.sub(r"\n(?=\d+\.\s)", "\n\n", answer)  
    answer = re.sub(r"\n(?=\*\*)", "\n\n", answer) 
    return answer
