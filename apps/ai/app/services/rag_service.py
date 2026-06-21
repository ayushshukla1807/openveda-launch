from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import SupabaseVectorStore
from langchain.chains import RetrievalQA
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

class RAGService:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
        self.llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.3)
        
        supabase_url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "")
        supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY", ""))
        
        if supabase_url and supabase_key:
            self.supabase: Client = create_client(supabase_url, supabase_key)
            self.vector_db = SupabaseVectorStore(
                client=self.supabase,
                embedding=self.embeddings,
                table_name="github_issues",
                query_name="match_github_issues"
            )
        else:
            self.vector_db = None

    def ask_question(self, question: str):
        """
        Retrieves relevant context from pgvector and answers the user's question.
        """
        if not self.vector_db:
            return "Mentorship Bot is in offline mode. Please configure SUPABASE_URL and OPENAI_API_KEY."

        # Create a RetrievalQA chain using the Supabase pgvector store
        qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vector_db.as_retriever(search_kwargs={"k": 3})
        )
        
        # Add a custom prompt instruction to the query
        enhanced_question = (
            "You are the OpenVeda AI Mentor. Using the provided open-source issues context, "
            "help the developer understand the codebase, suggest next steps, or answer their question. "
            f"\n\nQuestion: {question}"
        )
        
        response = qa_chain.invoke(enhanced_question)
        return response
