-- Migration: Add year-round activity tracking for "The Contribution Engine" pivot
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS is_active_year_round BOOLEAN DEFAULT FALSE;

-- Mark key organizations as year-round active for the initial launch
UPDATE organizations SET is_active_year_round = TRUE 
WHERE slug IN ('apache', 'linux-foundation', 'cncf', 'mozilla', 'redhat', 'electron');
