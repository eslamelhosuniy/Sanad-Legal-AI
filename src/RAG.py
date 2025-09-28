from langchain_community.document_loaders import TextLoader
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.schema import Document
import re

# Required installations:
# pip install langchain langchain-community tqdm unstructured faiss-cpu sentence-transformers

# Load document
lm_loader = TextLoader("./assets/files/law_modified.txt", encoding='utf-8')
llm_data1 = lm_loader.load()
lm_loader2 = TextLoader("./assets/files/100_QA_LaborLaw2025_Final.txt", encoding='utf-8')
llm_data2 = lm_loader2.load()

# Split documents
chunks1 = str(llm_data1).split("##")
chunks2 = str(llm_data2).split(r"\n\n")
chunks = chunks1 + chunks2
# Process chunks and extract article metadata
llm_chunks = []
for chunk in chunks:
    chunk_text = chunk
    
    # Extract article number using regex
    article_match = re.search(
        r'((?:مادة|المادة)\s*\([\d\u0660-\u0669\u06F0-\u06F9]+\))\s*[:：]?([\s\S]*?)'
        r'(?=(?:\n\n(?:مادة|المادة)\s*\([\d\u0660-\u0669\u06F0-\u06F9]+\)\s*[:：]?)|\Z)', 
        chunk_text
    )
    
    article_number = 'unknown'
    article_id = 'المادة (غير معروف)'
    
    if article_match:
        article_number = article_match.group(1)
        article_id = f"المادة ({article_number})"
    
    llm_chunks.append({
        "page_content": chunk_text,
        "metadata": {
            "article_number": article_number,
            "article_id": article_id
        }
    })

print(f"Total chunks processed: {len(llm_chunks)}")
if len(llm_chunks) > 3:
    print(f"Sample chunk: {llm_chunks[3]}")

# Create documents for vector store
documents = [
    Document(
        page_content=chunk["page_content"], 
        metadata=chunk["metadata"]
    )
    for chunk in llm_chunks
]

# Initialize embeddings with local model
embeddings = SentenceTransformerEmbeddings(
    model_name="intfloat/multilingual-e5-large"
)

# Create FAISS vector store with custom embeddings
vector_db = FAISS.from_documents(documents, embeddings)


# from langchain.vectorstores import Chroma

# # store text documents as vectors
# save_to_dir = "/assets/files/RAG-db"

# if(os.exist("/assets/files/RAG-db"):
#     ## Load from disk
#     load_from_dir = "/assets/files/RAG-db"

#     loaded_vector_db = Chroma(
#         persist_directory=load_from_dir,
#         embedding_function=embedding_llm
#     )
# else:
#     docs_ids = list( range( len(documents) ) )
#     docs_ids = [ str(d) for d in docs_ids ]
#     vector_db = Chroma.from_documents(
#                                 documents,
#                                 embeddings,
#                                 persist_directory=save_to_dir,
#                                 ids=docs_ids
#                             )
#     vector_db.persist()
    




# Query the vector database
query_text = "بماذا يلتزم صاحب العمل"

similar_docs = vector_db.similarity_search(query_text, k=3)

print("Similar documents found:")
for i, doc in enumerate(similar_docs):
    print(f"\n--- Document {i+1} ---")
    print(f"Content: {doc.page_content[:200]}...")
    print(f"Metadata: {doc.metadata}")


# Test similarity function
similar_docs_embeddings = [embeddings.embed_query(doc.page_content) for doc in similar_docs]
if len(similar_docs_embeddings) > 1:
    from sklearn.metrics.pairwise import cosine_similarity
    similarities = cosine_similarity(similar_docs_embeddings)
    print(f"\nSimilarity matrix shape: {similarities.shape}")

