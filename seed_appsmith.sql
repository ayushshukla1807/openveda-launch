-- First, ensure Appsmith exists in organizations
INSERT INTO organizations (name, slug, logo_url, tech_stack, program)
VALUES (
    'Appsmith', 
    'appsmith', 
    'https://avatars.githubusercontent.com/u/53011310?s=200&v=4', 
    ARRAY['Java', 'Spring Boot', 'React', 'TypeScript', 'MongoDB'], 
    'GSoC 2026'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program;

-- Now, Insert the "Platinum Playbook" content
WITH org AS (SELECT id FROM organizations WHERE slug = 'appsmith')
INSERT INTO playbooks (org_id, content_markdown)
SELECT id, '
# OpenVeda Playbook: Appsmith 🚀

Your definitive guide to contributing to one of India''s fastest-growing and most developer-loved open-source projects.

## 1. The "Why": Empowering Developers to Build Internal Tools, Fast

- **The Mission**: Appsmith is an open-source framework that allows developers to build internal tools, admin panels, and dashboards with incredible speed. It''s a "low-code" platform designed for developers, giving them the power to build complex applications visually and with code.
- **Your Impact**: You''ll be contributing to a product that is used by thousands of companies and developers at major brands worldwide to save countless hours of development time.
- **Why it''s a Career Supercharger**: As a major Indian startup success story, having "Appsmith Contributor" on your resume is a huge signal to Indian tech companies. You will get direct, hands-on experience with a modern, production-grade Java (Spring Boot) and React (TypeScript) codebase. Their community is famously active, supportive, and an incredible learning environment.

---

## 2. The "What": A Modern Full-Stack Architecture

- **Core Backend**: Java 17 using the Spring Boot framework (specifically, Reactive WebFlux).
- **Core Frontend**: TypeScript using the React library. They make heavy use of Redux Saga for state management.
- **Database**: MongoDB.
- **Infrastructure & Tools**:
    - **Version Control**: GitHub.
    - **CI/CD**: GitHub Actions.
    - **Community Hub**: Discord.

---

## 3. The "How": Your Complete Appsmith Onboarding Journey

### 3.1: Immerse Yourself in the Community (Essential!)
Appsmith''s community is their heart. Join Discord before you do anything else.

- **Primary Channel**: [Join the Appsmith Discord Server](https://discord.gg/appsmith).
- **Your First Action**: Join the `#contributor` channel and introduce yourself.
- **Template**: 
    > "Hey everyone! My name is Ayush, a CSE student from Pune. I’m a huge fan of what you’re building at Appsmith and I’m excited to start contributing. My background is in React and TypeScript. I’m going through the setup guide now. Glad to be here!"

### 3.2: The Foolproof Environment Setup
- **Prerequisites**: Git, Java 17, Node.js, Yarn, and Docker.
- **Fork & Clone**: Fork the `appsmith` repo and clone your fork.
- **Start Backend Services**: 
    ```bash
    docker-compose -f "deploy/docker/local-setup.yml" up -d
    ```
- **Run the Backend Server**:
    ```bash
    ./scripts/start-server.sh
    ```
- **Run the Frontend Client**:
    ```bash
    cd app/client && yarn && yarn start
    ```
- **Access**: `http://localhost:3000`

---

## 4. GSoC History & Focus Areas
- **Historical Focus**: Appsmith is a frequent GSoC mentoring organization. Projects typically focus on:
    - Adding new UI widgets.
    - Improving developer experience (DX).
    - Creating new integrations (Databases, APIs).
    - Application performance.
- **What Mentors Look For**: High-quality PRs. Clean code, good tests, and clear communication. A single, well-crafted small PR is worth more than ten sloppy ones.

---

## 5. Key Repositories
- **Main Monorepo**: [github.com/appsmithorg/appsmith](https://github.com/appsmithorg/appsmith)

---

## 6. Your First Task Right Now
- **The Golden Link**: [Issues tagged "Good First Issue"](https://github.com/appsmithorg/appsmith/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)

---

## 7. The Unwritten Rules (Mentor Insights)
1. **Be Hyperactive on Discord**: The core engineering team is in the `#contributor` channel daily.
2. **GIFs are Golden**: Include a screen recording of your UI changes in your PR.
3. **Understand the Product**: Use the cloud version to build a small app before you code.

' FROM org
ON CONFLICT (org_id) DO UPDATE SET content_markdown = EXCLUDED.content_markdown;
