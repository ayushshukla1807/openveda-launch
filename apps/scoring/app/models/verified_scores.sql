-- Migration: Create verified_scores table for LinkedIn Credentials
CREATE TABLE IF NOT EXISTS verified_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    github_username TEXT NOT NULL,
    full_name TEXT,
    score DECIMAL(5, 2) NOT NULL,
    breakdown JSONB, -- Store JSON breakdown for the verification card
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB -- Additional info for LinkedIn OpenGraph
);

-- Index for fast lookup by username
CREATE INDEX IF NOT EXISTS idx_verified_scores_username ON verified_scores(github_username);

-- Index for the UUID (primary key already indexed, but for clarity)
CREATE UNIQUE INDEX IF NOT EXISTS idx_verified_scores_uuid ON verified_scores(id);
