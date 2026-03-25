-- Update Playbook for Postman
INSERT INTO playbooks (org_id, content_markdown)
SELECT id, '# Platinum Playbook: Postman
Your definitive guide to contributing to the world''s leading API platform.

## 1. The "Why": Building the API-First World
**The Mission:** Postman is the world''s largest API platform, used by 30M+ developers. They participate in GSoC to improve their open-source tooling like Newman, Bruno, and their internal DX tools.
**Your Impact:** You''ll be working on tools that automate API testing and documentation for millions of engineers.
**Career Supercharger:** "Postman Contributor" is a massive signal for Backend and DevOps roles globally.

## 2. Architecture Analysis
- **Core Stack:** Node.js (TypeScript), React, and Go.
- **Micro-services:** Highly distributed architecture.
- **Key Repos:** `postman-app/newman`, `postmanlabs/postman-runtime`.

## 3. The First PR Roadmap
1. **The "Easy" Entry:** Fix a documentation typo in `newman` or add a test case to `postman-collection`.
2. **The "Medium" Step:** Resolve a "Good First Issue" in the Postman CLI or Newman reporters.
3. **The "Expert" Level:** Propose a performance optimization for the Postman Runtime engine.

## 4. The Unwritten Rules (Internal Secrets)
- **Quality over Speed:** Postman engineers value well-tested code over fast delivery. Never skip unit tests.
- **Documentation is Code:** If it''s not documented, it doesn''t exist. Update the README with every PR.
- **Community First:** Engage in their GitHub discussions before opening a PR. They love "problem-solvers," not just "code-writers."'
FROM organizations WHERE slug = 'postman'
ON CONFLICT (org_id) DO UPDATE SET content_markdown = EXCLUDED.content_markdown;

-- Update Playbook for Zerodha (FOSS)
INSERT INTO playbooks (org_id, content_markdown)
SELECT id, '# Platinum Playbook: Zerodha
Contributing to India''s most successful bootstrap startup and its FOSS initiatives.

## 1. The "Why": Fintech for Common People
**The Mission:** Zerodha is India''s largest stockbroker. They are vocal advocates of FOSS and contribute back through projects like ERPNext, and their own financial libraries.
**Your Impact:** Your code might help process millions of trades daily or simplify tax filings for Indian citizens.
**Career Supercharger:** Having a Zerodha engineer''s LGTM is the ultimate validation for any dev in the Indian startup ecosystem.

## 2. Architecture Analysis
- **Core Stack:** Go (Golang), Python, and Vue.js.
- **Philosophy:** Minimalist, high-performance, and no-bloat software.
- **Key Projects:** Kite Connect API wrappers, Listmonk, and FOSS United projects.

## 3. The First PR Roadmap
1. **The Entry:** Look for UI fixes in `listmonk` or translation updates in FOSS projects.
2. **The Step-up:** Implement a new feature in a Go-based microservice or fix a data parsing bug.
3. **The Mastery:** Contribute to core high-concurrency logic in their trading infrastructure.

## 4. The Unwritten Rules
- **Simplicity is King:** If you can do it without a new library, do it. Zerodha hates dependency bloat.
- **Privacy First:** When working on fintech, always think about data security and user privacy.
- **Direct Communication:** Join the FOSS United Telegram/Discord. Being active in the community is 50% of the selection process.'
FROM organizations WHERE slug = 'zerodha'
ON CONFLICT (org_id) DO UPDATE SET content_markdown = EXCLUDED.content_markdown;

-- Update Playbook for PECan Project
INSERT INTO playbooks (org_id, content_markdown)
SELECT id, '# Platinum Playbook: PECan Project
Mastering the Predictive Ecosystem Analyzer (PECan) for environmental science.

## 1. The "Why": Scaling Climate Insights
**The Mission:** PECan is an integrated eco-informatics toolbox. It helps climate scientists predict how ecosystems respond to environmental changes.
**Your Impact:** You are literally building tools to fight climate change through better data modeling.
**Career Supercharger:** Perfect for devs interested in Data Science, R, and Academic Research.

## 2. Architecture Analysis
- **Core Stack:** R, JavaScript (D3.js), and PostgreSQL.
- **Complexity:** Heavy on statistics and data pipelines.
- **Key Modules:** BETYdb database and the PECan web interface.

## 3. The Unwritten Rules
- **Scientific Rigor:** This isn''t just a software project; it''s a scientific one. Reproducibility is everything.
- **R Mastery:** You must be comfortable with the R ecosystem and its package structure.
- **Patience:** Scientific software often has longer review cycles. Stay engaged in the Slack channel.'
FROM organizations WHERE slug = 'pecan-project'
ON CONFLICT (org_id) DO UPDATE SET content_markdown = EXCLUDED.content_markdown;
