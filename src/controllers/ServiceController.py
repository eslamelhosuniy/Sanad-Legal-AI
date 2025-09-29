import os
import re
import logging
from dotenv import load_dotenv
from helpers.config import get_settings
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

from huggingface_hub import InferenceClient
from langchain.schema import Document
from langchain.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Chroma
from langchain.chains.question_answering import load_qa_chain
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv("../assets/.env")
settings = get_settings()
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

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
embeddings = HuggingFaceEmbeddings(model_name=HF_MODEL)
hf_client = InferenceClient(model=HF_MODEL, token=HGFACE_API_KEY) 



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
            r'((?:مادة|المادة)\s*\([\d\u0660-\u0669\u06F0-\u06F9]+\))\s*[:：]?',
            chunk
        )
        article_number = match.group(1) if match else "unknown"
        article_id = f"المادة ({article_number})"

        documents.append(
            Document(
                page_content=chunk,
                metadata={
                    "article_number": article_number,
                    "article_id": article_id
                }
            )
        )
    return documents

def load_vector_db() -> Chroma:
    logging.log(logging.INFO, "db loaded")
    return Chroma(
        persist_directory=VECTOR_DB_DIR,
        embedding_function=embeddings
    )

def create_vector_db(documents: list[Document]) -> Chroma:
    ids = [str(i) for i in range(len(documents))]
    return Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        persist_directory=VECTOR_DB_DIR,
        ids=ids
    )


def build_qa_chain(context,question):
    """Return a QA chain with Gemini + custom prompt."""
    prompt = PromptTemplate(
        template=(
            "Answer the next question using the provided context.\n"
            "If the answer is not contained in the context, say 'NO ANSWER IS AVAILABLE'.\n\n"
            "### Context:\n{context}\n\n"
            "### Question:\n{question}\n\n"
            "### Answer:\n"
        ),
        input_variables=["context", "question"]
    )
    
    
    
    logging.log(logging.INFO, f"GEMINI_API_KEY: {GEMINI_API_KEY}, GEMINI_MODEL:{GEMINI_MODEL}")
    llm = ChatGoogleGenerativeAI(model=GEMINI_MODEL, google_api_key=GEMINI_API_KEY)
    return load_qa_chain(llm, chain_type="stuff", prompt=prompt)

