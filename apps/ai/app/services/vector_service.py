import os
import httpx
from typing import List, Dict, Any
from supabase import create_client, Client
from langchain_openai import OpenAIEmbeddings

class VectorService:
    def __init__(self):
        supabase_url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "")
        supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY", ""))
        self.supabase: Client = create_client(supabase_url, supabase_key)
        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

    async def ingest_github_issue(self, repo_owner: str, repo_name: str, issue_number: int):
        """Fetches a GitHub issue and stores its vector embedding in Supabase pgvector."""
        github_token = os.environ.get("GITHUB_TOKEN")
        headers = {"Accept": "application/vnd.github.v3+json"}
        if github_token:
            headers["Authorization"] = f"token {github_token}"
            
        async with httpx.AsyncClient() as client:
            url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/issues/{issue_number}"
            resp = await client.get(url, headers=headers)
            
            if resp.status_code != 200:
                raise Exception(f"Failed to fetch issue: {resp.text}")
                
            issue_data = resp.json()
            return await self._process_and_store_issue(repo_owner, repo_name, issue_data)

    async def ingest_repo_issues(self, repo_owner: str, repo_name: str, limit: int = 30):
        """Fetches multiple open issues from a repository for batch ingestion."""
        github_token = os.environ.get("GITHUB_TOKEN")
        headers = {"Accept": "application/vnd.github.v3+json"}
        if github_token:
            headers["Authorization"] = f"token {github_token}"

        async with httpx.AsyncClient() as client:
            url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/issues?state=open&per_page={limit}"
            resp = await client.get(url, headers=headers)
            
            if resp.status_code != 200:
                raise Exception(f"Failed to fetch issues: {resp.text}")
                
            issues = resp.json()
            ingested_count = 0
            
            for issue_data in issues:
                if "pull_request" not in issue_data:
                    await self._process_and_store_issue(repo_owner, repo_name, issue_data)
                    ingested_count += 1
                    
            return {"ingested": ingested_count, "total_scanned": len(issues)}

    async def _process_and_store_issue(self, repo_owner: str, repo_name: str, issue_data: dict):
        """Internal helper to chunk and store an issue's embeddings."""
        from langchain.text_splitter import RecursiveCharacterTextSplitter
        
        if "pull_request" in issue_data:
            raise Exception("This is a pull request, not an issue.")
            
        title = issue_data.get("title", "")
        body = issue_data.get("body", "") or ""
        labels = issue_data.get("labels", [])
        state = issue_data.get("state", "open")
        github_id = issue_data.get("id")
        html_url = issue_data.get("html_url")
        
        # We split the body if it's too long using LangChain's splitter
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=200)
        chunks = text_splitter.split_text(body)
        
        # We'll just embed the first chunk for simplicity, or we could store multiple rows
        # For this implementation, we take the primary chunk and concatenate with title/labels
        primary_body = chunks[0] if chunks else ""
        
        label_names = [label["name"] for label in labels]
        text_to_embed = f"Title: {title}\nLabels: {', '.join(label_names)}\n\nBody: {primary_body}"
        
        # Generate OpenAI Embedding
        embedding_vector = self.embeddings.embed_query(text_to_embed)
        
        payload = {
            "github_id": github_id,
            "org_name": repo_owner,
            "repo_name": repo_name,
            "title": title,
            "body": body,  # store the full body, but we only embedded the chunk
            "url": html_url,
            "state": state,
            "labels": labels,
            "embedding": embedding_vector
        }
        
        result = self.supabase.table("github_issues").upsert(payload, on_conflict="github_id").execute()
        return result.data

    async def search_issues(self, query: str, limit: int = 5):
        """Searches for relevant issues based on natural language query using pgvector."""
        query_embedding = self.embeddings.embed_query(query)
        
        # Use the RPC function we defined in the schema
        response = self.supabase.rpc(
            "match_github_issues",
            {
                "query_embedding": query_embedding,
                "match_threshold": 0.5,
                "match_count": limit
            }
        ).execute()
        
        return response.data
