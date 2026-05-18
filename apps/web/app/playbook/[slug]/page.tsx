import { createServerSupabaseClient } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';
import PlaybookClient from './PlaybookClient';
import gsocOrgsRaw from '../../../../../gsoc_2026_orgs.json';

// Force dynamic rendering — skip SSG entirely to avoid build-time prerender errors
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PlaybookPageProps {
  params: { slug: string };
}

// Replicate master organizations mapping for static lookup on server-side
const staticProgramsOrgs = [
  { name: 'Linux Kernel', slug: 'linux-kernel', tech_stack: ['C', 'Assembly', 'Make'], program: 'LFX', repo_path: 'torvalds/linux', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg' },
  { name: 'Kubernetes', slug: 'kubernetes', tech_stack: ['Go', 'Bash', 'Docker'], program: 'LFX', repo_path: 'kubernetes/kubernetes', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg' },
  { name: 'Cloud Native Computing Foundation', slug: 'cncf', tech_stack: ['Go', 'Rust', 'Cloud'], program: 'LFX', repo_path: 'cncf/sandbox', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Cloud_Native_Computing_Foundation_logo.svg' },
  { name: 'GNOME', slug: 'gnome', tech_stack: ['C', 'Rust', 'Python', 'GTK'], program: 'Outreachy', repo_path: 'GNOME/gnome-shell', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/GNOME_logo.svg' },
  { name: 'Fedora', slug: 'fedora', tech_stack: ['Python', 'Shell', 'C', 'Ansible'], program: 'Outreachy', repo_path: 'fedora-infra/fedora-messaging', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fedora_logo.svg' },
  { name: 'OpenTelemetry', slug: 'opentelemetry', tech_stack: ['Go', 'Java', 'Python', 'Collector'], program: 'Outreachy', repo_path: 'open-telemetry/opentelemetry-collector', logo_url: 'https://raw.githubusercontent.com/open-telemetry/opentelemetry.io/main/icon.svg' },
  { name: 'OpenSource Health', slug: 'os-health', tech_stack: ['React', 'Node.js', 'PostgreSQL'], program: 'ESOC 2026', repo_path: 'os-health/core', logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=OH' },
  { name: 'GreenCode', slug: 'greencode', tech_stack: ['Python', 'D3.js', 'EarthData'], program: 'ESOC 2026', repo_path: 'greencode/pipeline', logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=GC' }
];

const parsedGsocOrgs = gsocOrgsRaw.map((org: any) => ({
  name: org.name,
  slug: org.slug,
  tech_stack: org.slug === 'appsmith' ? ['Java', 'Spring Boot', 'React', 'TypeScript', 'MongoDB'] : (org.tech_stack || []),
  program: 'GSoC 2026',
  repo_path: org.slug === 'appsmith' ? 'appsmithorg/appsmith' : null,
  logo_url: org.slug === 'appsmith' ? 'https://avatars.githubusercontent.com/u/53011310?s=200&v=4' : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(org.name)}`
}));

const MASTER_ORGS_LIST = [...staticProgramsOrgs, ...parsedGsocOrgs];

// Veteran playbooks content store
const STATIC_PLAYBOOKS: Record<string, string> = {
  'appsmith': `
# OpenVeda Playbook: Appsmith 🚀

Your definitive guide to contributing to one of India's fastest-growing and most developer-loved open-source projects.

## 1. The "Why": Empowering Developers to Build Internal Tools, Fast

- **The Mission**: Appsmith is an open-source framework that allows developers to build internal tools, admin panels, and dashboards with incredible speed. It's a "low-code" platform designed for developers, giving them the power to build complex applications visually and with code.
- **Your Impact**: You'll be contributing to a product that is used by thousands of companies and developers at major brands worldwide to save countless hours of development time.
- **Why it's a Career Supercharger**: As a major Indian startup success story, having "Appsmith Contributor" on your resume is a huge signal to Indian tech companies. You will get direct, hands-on experience with a modern, production-grade Java (Spring Boot) and React (TypeScript) codebase. Their community is famously active, supportive, and an incredible learning environment.

---

## 2. Architecture Analysis

- **Core Backend**: Java 17 using the Spring Boot framework (specifically, Reactive WebFlux).
- **Core Frontend**: TypeScript using the React library. They make heavy use of Redux Saga for state management.
- **Database**: MongoDB.
- **Infrastructure & Tools**:
    - **Version Control**: GitHub.
    - **CI/CD**: GitHub Actions.
    - **Community Hub**: Discord.

---

## 3. Your Onboarding Journey
1. **Immerse Yourself in the Community**: Join the Discord server and introduce yourself in the #contributor channel.
2. **The Foolproof Environment Setup**: Clone the repository and start backend services locally using docker-compose.
3. **Grab a Good First Issue**: Look for beginner-friendly tags to submit your first proactive PR.

## 4. The Unwritten Rules (Mentor Insights)
1. **Be Hyperactive on Discord**: The core engineering team is in the #contributor channel daily.
2. **GIFs are Golden**: Include a screen recording of your UI changes in your PR.
3. **Understand the Product**: Use the cloud version to build a small app before you code.
`,

  'postman': `
# Platinum Playbook: Postman 🚀

Your definitive guide to contributing to the world's leading API platform.

## 1. The "Why": Building the API-First World
- **The Mission:** Postman is the world's largest API platform, used by 30M+ developers. They participate in GSoC to improve their open-source tooling like Newman, Bruno, and their internal DX tools.
- **Your Impact:** You'll be working on tools that automate API testing and documentation for millions of engineers.
- **Career Supercharger:** "Postman Contributor" is a massive signal for Backend and DevOps roles globally.

---

## 2. Architecture Analysis
- **Core Stack:** Node.js (TypeScript), React, and Go.
- **Micro-services:** Highly distributed architecture.
- **Key Repos:** \`postman-app/newman\`, \`postmanlabs/postman-runtime\`.

---

## 3. The First PR Roadmap
1. **The "Easy" Entry:** Fix a documentation typo in \`newman\` or add a test case to \`postman-collection\`.
2. **The "Medium" Step:** Resolve a "Good First Issue" in the Postman CLI or Newman reporters.
3. **The "Expert" Level:** Propose a performance optimization for the Postman Runtime engine.

---

## 4. The Unwritten Rules (Internal Secrets)
- **Quality over Speed:** Postman engineers value well-tested code over fast delivery. Never skip unit tests.
- **Documentation is Code:** If it's not documented, it doesn't exist. Update the README with every PR.
- **Community First:** Engage in their GitHub discussions before opening a PR. They love "problem-solvers," not just "code-writers."
`,

  'zerodha': `
# Platinum Playbook: Zerodha 🚀

Contributing to India's most successful bootstrap fintech startup and its FOSS initiatives.

## 1. The "Why": Fintech for Common People
- **The Mission:** Zerodha is India's largest stockbroker. They are vocal advocates of FOSS and contribute back through projects like ERPNext, and their own financial libraries.
- **Your Impact:** Your code might help process millions of trades daily or simplify tax filings for Indian citizens.
- **Career Supercharger:** Having a Zerodha engineer's LGTM is the ultimate validation for any dev in the Indian startup ecosystem.

---

## 2. Architecture Analysis
- **Core Stack:** Go (Golang), Python, and Vue.js.
- **Philosophy:** Minimalist, high-performance, and no-bloat software.
- **Key Projects:** Kite Connect API wrappers, Listmonk, and FOSS United projects.

---

## 3. The First PR Roadmap
1. **The Entry:** Look for UI fixes in \`listmonk\` or translation updates in FOSS projects.
2. **The Step-up:** Implement a new feature in a Go-based microservice or fix a data parsing bug.
3. **The Mastery:** Contribute to core high-concurrency logic in their trading infrastructure.

---

## 4. The Unwritten Rules
- **Simplicity is King:** If you can do it without a new library, do it. Zerodha hates dependency bloat.
- **Privacy First:** When working on fintech, always think about data security and user privacy.
- **Direct Communication:** Join the FOSS United Telegram/Discord. Being active in the community is 50% of the selection process.
`,

  'pecan-project': `
# Platinum Playbook: PECan Project 🌳

Mastering the Predictive Ecosystem Analyzer (PECan) for environmental science.

## 1. The "Why": Scaling Climate Insights
- **The Mission:** PECan is an integrated eco-informatics toolbox. It helps climate scientists predict how ecosystems respond to environmental changes.
- **Your Impact:** You are literally building tools to fight climate change through better data modeling.
- **Career Supercharger:** Perfect for devs interested in Data Science, R, and Academic Research.

---

## 2. Architecture Analysis
- **Core Stack:** R, JavaScript (D3.js), and PostgreSQL.
- **Complexity:** Heavy on statistics and data pipelines.
- **Key Modules:** BETYdb database and the PECan web interface.

---

## 3. The Unwritten Rules
- **Scientific Rigor:** This isn't just a software project; it's a scientific one. Reproducibility is everything.
- **R Mastery:** You must be comfortable with the R ecosystem and its package structure.
- **Patience:** Scientific software often has longer review cycles. Stay engaged in the Slack channel.
`,

  'linux-kernel': `
# Platinum Playbook: Linux Kernel 🐧

Mastering contributions to the core operating system of modern cloud computing.

## 1. The "Why": The Foundation of Modern Software
- **The Mission:** The Linux Kernel drives 90%+ of the world's cloud computing infrastructure, mobile ecosystems, and high-concurrency databases.
- **Your Impact:** Write highly optimized drivers, CPU scheduler patches, or security protocols.
- **Career Supercharger:** Immediate top-tier placement signals across core infrastructure companies globally.

---

## 2. Architecture Analysis
- **Core Stack:** Linux C, Assembly, Shell, and Makefiles.
- **Complexity:** Extreme low-latency constraints, hardware-specific drivers, and POSIX compliance rules.

---

## 3. The Unwritten Rules
- **Checkpatch Compliance:** Always run checkpatch.pl scripts before sending emails.
- **Mailing Lists first:** Linux still utilizes mailing lists. Understand public-inbox archives and submit clean v2 patches.
`,

  'kubernetes': `
# Platinum Playbook: Kubernetes ☸️

Scaling production-grade container orchestration for cloud native ecosystem.

## 1. The "Why": The Cloud Operating System
- **The Mission:** Kubernetes orchestrates millions of production containers across multi-cloud deployments.
- **Your Impact:** Optimize kubelet performance, custom controllers, scheduling algorithms, and API server extensions.
- **Career Supercharger:** High-throughput backend/platform roles across AWS, Google Cloud, and major tech firms.

---

## 2. Architecture Analysis
- **Core Stack:** Go (Golang), gRPC, Docker, and YAML.
- **Key Repos:** \`kubernetes/kubernetes\`, \`kubernetes/client-go\`.
`,

  'cncf': `
# Platinum Playbook: CNCF (Cloud Native Computing Foundation) 🌐

Mastering LFX and year-round contributions across high-velocity Sandbox & Incubating projects.

## 1. The "Why": Democratizing Cloud Infrastructure
- **The Mission:** CNCF hosts critical projects like Prometheus, Envoy, Helm, and Jaeger to form vendor-neutral cloud standards.
- **Your Impact:** You'll build telemetry data systems, API proxies, and cluster networking software.
- **Career Supercharger:** Establishes you as a global-class backend systems developer.
`
};

export default async function PlaybookPage({ params }: PlaybookPageProps) {
  const supabase = createServerSupabaseClient();

  // Try fetching organization data from remote database
  let orgData = null;
  try {
    const { data } = await supabase
      .from('organizations')
      .select('id, name, repo_path, logo_url')
      .eq('slug', params.slug)
      .single();
    orgData = data;
  } catch (err) {
    console.warn("DB org fetch failed, seeking static fallback...", err);
  }

  // Define lookup properties
  let id = "";
  let name = "";
  let repo_path = null;
  let logo_url = null;
  let tech_stack: string[] = [];

  if (orgData) {
    id = orgData.id;
    name = orgData.name;
    repo_path = orgData.repo_path;
    logo_url = orgData.logo_url;
  } else {
    // Look up in static master seeds
    const staticOrg = MASTER_ORGS_LIST.find(o => o.slug === params.slug);
    if (!staticOrg) {
      notFound();
    }
    id = "static-org-" + params.slug;
    name = staticOrg.name;
    repo_path = staticOrg.repo_path || null;
    logo_url = staticOrg.logo_url || null;
    tech_stack = staticOrg.tech_stack || [];
  }

  // Try fetching playbook content from remote database
  let playbookData = null;
  if (orgData) {
    try {
      const { data } = await supabase
        .from('playbooks')
        .select('content_markdown')
        .eq('org_id', orgData.id)
        .single();
      playbookData = data;
    } catch (err) {
      console.warn("DB playbook fetch failed, seeking static fallback...", err);
    }
  }

  // Determine Markdown Content
  let content = playbookData?.content_markdown;

  if (!content) {
    // Seek custom static handbook
    content = STATIC_PLAYBOOKS[params.slug];
  }

  if (!content) {
    // Generate premium on-the-fly playbooks for any GSoC 2026 org!
    content = `
# Platinum Playbook: ${name} 🚀

Your definitive guide to contributing to ${name}.

## 1. The "Why": Building for Open Source
- **The Mission:** Contributing to ${name} is the ultimate gateway to mastering high-performance software engineering.
- **Your Impact:** You'll work alongside senior maintainers on production-ready tools utilized by millions.
- **Career Supercharger:** Selected GSoC/LFX fellows receive direct mentorship, high-value signals, and strong tech connections.

---

## 2. Architecture Analysis
- **Core Stack:** ${tech_stack.length > 0 ? tech_stack.join(', ') : 'Modern Languages (Go/Rust/Python/TypeScript)'}.
- **Philosophy:** Scalable architecture, well-commented modules, and clean workflows.
- **Key Modules:** Inspect open GitHub issues tagged with "Good First Issue" to map core bottlenecks.

---

## 3. The First PR Roadmap
1. **The Entry:** Audit documentation, repair small typos, and learn repository guidelines.
2. **The Step-up:** Claim low-latency good-first issues to submit proactive pull requests.
3. **The Mastery:** Lock target metrics with technical architects and draft your proposal blueprint.

---

## 4. The Unwritten Rules
- **Quality Standards:** Maintainers appreciate well-tested, clean pull requests.
- **Join Community Channels:** Connect early on their Slack/Discord/Gitter channels to secure mentor feedback.
`;
  }

  const data = {
    id,
    name,
    repo_path,
    content,
    logo_url
  };

  return <PlaybookClient data={data} />;
}