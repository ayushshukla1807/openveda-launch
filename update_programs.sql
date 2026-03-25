-- 1. Insert Outreachy Organizations
INSERT INTO organizations (name, slug, logo_url, tech_stack, program, description, repo_path)
VALUES 
('GNOME', 'gnome', 'https://upload.wikimedia.org/wikipedia/commons/3/3d/GNOME_logo.svg', ARRAY['C', 'Rust', 'Python', 'GTK'], 'Outreachy', 'The desktop environment for the Linux community.', 'GNOME/gnome-shell'),
('Fedora', 'fedora', 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fedora_logo.svg', ARRAY['Python', 'Shell', 'C', 'Ansible'], 'Outreachy', 'A community-driven Linux distribution and OS ecosystem.', 'fedora-infra/fedora-messaging'),
('OpenTelemetry', 'opentelemetry', 'https://raw.githubusercontent.com/open-telemetry/opentelemetry.io/main/icon.svg', ARRAY['Go', 'Java', 'Python', 'Collector'], 'Outreachy', 'A collection of tools, APIs, and SDKs for observability.', 'open-telemetry/opentelemetry-collector');

-- 2. Insert ESOC 2026 Organizations (EuroSocio-OpenSource)
INSERT INTO organizations (name, slug, logo_url, tech_stack, program, description, repo_path)
VALUES 
('OpenSource Health', 'os-health', 'https://api.dicebear.com/7.x/initials/svg?seed=OH', ARRAY['React', 'Node.js', 'PostgreSQL'], 'ESOC 2026', 'Building open tools for community healthcare in Europe.', 'os-health/core'),
('GreenCode', 'greencode', 'https://api.dicebear.com/7.x/initials/svg?seed=GC', ARRAY['Python', 'D3.js', 'EarthData'], 'ESOC 2026', 'Open data pipelines for environmental monitoring.', 'greencode/pipeline');

-- 3. Update Playbook for GNOME (Platinum)
INSERT INTO playbooks (org_id, content_markdown)
SELECT id, '# Platinum Playbook: GNOME
The definitive guide to contributing to the Linux Desktop powerhouse.

## 1. The "Why": Standardizing Open Desktop
**The Mission:** GNOME is more than a desktop; it''s an ecosystem of apps and libraries that define the Linux experience.
**Your Impact:** Your code will be used by millions of Linux users (Fedora, Ubuntu, etc.) every day.
**Career Supercharger:** Mastering C/GTK or Rust in GNOME is a massive signal for system-level engineering roles.

## 2. Architecture Analysis
- **Core Stack:** C (GLib/GObject), Rust, and Python for apps.
- **The Engine:** GTK for UI, Mutter for window management.
- **Key Channels:** Matrix (#gnome:gnome.org) and GNOME Discourse.

## 3. The Unwritten Rules
- **Human Interface Guidelines (HIG):** GNOME is obsessed with design. Your UI PRs must follow the HIG strictly.
- **The "Newcomer" Label:** Look for issues tagged "Newcomer" on GNOME GitLab.
- **Matrix over Slack:** GNOME lives on Matrix. Engage there to get noticed.'
FROM organizations WHERE slug = 'gnome'
ON CONFLICT (org_id) DO UPDATE SET content_markdown = EXCLUDED.content_markdown;

-- 4. Update Playbook for OpenTelemetry (Platinum)
INSERT INTO playbooks (org_id, content_markdown)
SELECT id, '# Platinum Playbook: OpenTelemetry
Mastering the future of cloud-native observability.

## 1. The "Why": Visibility into Complexity
**The Mission:** OTEL is the industry standard for tracing, metrics, and logs. It''s used by every major cloud company.
**Your Impact:** You''re building the infrastructure that helps devs debug complex microservices.
**Career Supercharger:** OTEL knowledge is the hottest skill in DevOps/SRE right now.

## 2. Architecture Analysis
- **Core Stack:** Go, Java, Python (SDKs) and the Collector (Go).
- **Key Component:** The OTLP protocol.

## 3. The First PR Roadmap
1. **The Entry:** Fix an exporter bug or add a missing metric in an SDK.
2. **The Step-up:** Contribute to the Collector''s processing logic.
3. **The Unwritten Rule:** OTEL is huge. Pick *one* SDK (like Python or Go) and stick to it.'
FROM organizations WHERE slug = 'opentelemetry'
ON CONFLICT (org_id) DO UPDATE SET content_markdown = EXCLUDED.content_markdown;
