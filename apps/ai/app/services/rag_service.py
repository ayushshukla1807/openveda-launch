from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
import os
from dotenv import load_dotenv

load_dotenv()

class RAGService:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings()
        self.llm = ChatOpenAI(model="gpt-4o", temperature=0)
        self.vector_db = None

    def initialize_vector_db(self, documents: list):
        """
        Chunks and indexes the provide playbook documents.
        """
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=100
        )
        texts = text_splitter.split_documents(documents)
        self.vector_db = FAISS.from_documents(texts, self.embeddings)

    def ask_question(self, question: str):
        """
        Retrieves relevant context and answers the user's question.
        """
        if not self.vector_db:
            return "Mentorship Bot is still indexing. Please try again in a moment."

        qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vector_db.as_retriever()
        )
        return qa_chain.invoke(question)

# Enterprise implementation would include persistence and batch indexing logic here
