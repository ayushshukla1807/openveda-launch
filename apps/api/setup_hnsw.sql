-- Optimize pgvector search with HNSW (Hierarchical Navigable Small World) indexes
-- HNSW drastically reduces similarity search latency from linear time O(N) to logarithmic time O(log N).

-- 1. Ensure the pgvector extension is enabled
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create the HNSW index on the embedding column of the github_issues table
-- Using cosine distance (vector_cosine_ops) since we use cosine similarity in our RAG logic
CREATE INDEX ON github_issues USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Note: 'm' is the max number of connections per layer (16 is good for OpenAI embeddings)
-- 'ef_construction' is the size of the dynamic candidate list for constructing the graph.

-- 3. Optimize the RPC function to take advantage of the index
CREATE OR REPLACE FUNCTION match_github_issues(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  github_id bigint,
  org_name text,
  repo_name text,
  title text,
  body text,
  url text,
  state text,
  labels jsonb,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    github_id,
    org_name,
    repo_name,
    title,
    body,
    url,
    state,
    labels,
    1 - (embedding <=> query_embedding) AS similarity
  FROM github_issues
  -- The index is used when we ORDER BY the distance operator <=>
  -- We also filter by threshold directly, but the index mainly helps the ORDER BY LIMIT
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
