const fs = require('fs');

const orgs = JSON.parse(fs.readFileSync('gsoc_2026_orgs.json', 'utf8'));
const repos = JSON.parse(fs.readFileSync('gsoc_2026_repos.json', 'utf8'));

// Map slugs to repo urls for easy lookup
const repoMap = {};
repos.forEach(r => {
  repoMap[r.slug] = r.source_url;
});

function getRepoPath(url) {
  if (!url) return null;
  const githubMatch = url.match(/github\.com\/([^/]+\/[^/]+)/);
  if (githubMatch) {
    let path = githubMatch[1];
    path = path.replace(/\/$/, '').replace(/\.git$/, '');
    const parts = path.split('/');
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
  }
  return null; 
}

function escapeSql(str) {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

let sql = `-- ==========================================
-- RESTORE & POPULATE ORGANIZATIONS SQL SCRIPT
-- ==========================================
-- This script safely UPSERTS organizations into your database.
-- It covers GSoC 2026, LFX, Outreachy, and ESOC 2026.

BEGIN;

`;

orgs.forEach(org => {
  const sourceUrl = repoMap[org.slug];
  const repoPath = getRepoPath(sourceUrl);
  
  const techStackArr = org.tech_stack && org.tech_stack.length > 0
    ? `ARRAY[${org.tech_stack.map(t => `'${escapeSql(t)}'`).join(', ')}]`
    : `ARRAY[]::TEXT[]`;

  sql += `INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    '${escapeSql(org.name)}',
    '${escapeSql(org.slug)}',
    'https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(org.name)}',
    ${techStackArr},
    'GSoC 2026',
    ${repoPath ? `'${escapeSql(repoPath)}'` : 'NULL'}
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

`;
});

// Appsmith (GSoC) update Logo
sql += `
INSERT INTO organizations (name, slug, logo_url, tech_stack, program)
VALUES ('Appsmith', 'appsmith', 'https://avatars.githubusercontent.com/u/53011310?s=200&v=4', ARRAY['Java', 'Spring Boot', 'React', 'TypeScript', 'MongoDB'], 'GSoC 2026')
ON CONFLICT (slug) DO UPDATE SET logo_url = EXCLUDED.logo_url, tech_stack = EXCLUDED.tech_stack, program = EXCLUDED.program;
`;

// LFX Mentorship Orgs
sql += `
-- Insert LFX Mentorship Organizations
INSERT INTO organizations (name, slug, logo_url, tech_stack, program, description)
VALUES 
('Linux Kernel', 'linux-kernel', 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg', ARRAY['C', 'Assembly', 'Make'], 'LFX', 'The core of the Linux operating system.'),
('Kubernetes', 'kubernetes', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg', ARRAY['Go', 'Bash', 'Docker'], 'LFX', 'Production-grade container orchestration.'),
('Cloud Native Computing Foundation', 'cncf', 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Cloud_Native_Computing_Foundation_logo.svg', ARRAY['Go', 'Rust', 'Cloud'], 'LFX', 'Fostering and sustaining an ecosystem of open source, vendor-neutral projects.')
ON CONFLICT (slug) DO UPDATE SET logo_url = EXCLUDED.logo_url, tech_stack = EXCLUDED.tech_stack, program = EXCLUDED.program, description = EXCLUDED.description;
`;


// Outreachy Orgs
sql += `
-- Insert Outreachy Organizations
INSERT INTO organizations (name, slug, logo_url, tech_stack, program, description, repo_path)
VALUES 
('GNOME', 'gnome', 'https://upload.wikimedia.org/wikipedia/commons/3/3d/GNOME_logo.svg', ARRAY['C', 'Rust', 'Python', 'GTK'], 'Outreachy', 'The desktop environment for the Linux community.', 'GNOME/gnome-shell'),
('Fedora', 'fedora', 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fedora_logo.svg', ARRAY['Python', 'Shell', 'C', 'Ansible'], 'Outreachy', 'A community-driven Linux distribution and OS ecosystem.', 'fedora-infra/fedora-messaging'),
('OpenTelemetry', 'opentelemetry', 'https://raw.githubusercontent.com/open-telemetry/opentelemetry.io/main/icon.svg', ARRAY['Go', 'Java', 'Python', 'Collector'], 'Outreachy', 'A collection of tools, APIs, and SDKs for observability.', 'open-telemetry/opentelemetry-collector')
ON CONFLICT (slug) DO UPDATE SET logo_url = EXCLUDED.logo_url, tech_stack = EXCLUDED.tech_stack, program = EXCLUDED.program, description = EXCLUDED.description, repo_path = EXCLUDED.repo_path;
`;

// ESOC 2026 Orgs
sql += `
-- Insert ESOC 2026 Organizations
INSERT INTO organizations (name, slug, logo_url, tech_stack, program, description, repo_path)
VALUES 
('OpenSource Health', 'os-health', 'https://api.dicebear.com/7.x/initials/svg?seed=OH', ARRAY['React', 'Node.js', 'PostgreSQL'], 'ESOC 2026', 'Building open tools for community healthcare in Europe.', 'os-health/core'),
('GreenCode', 'greencode', 'https://api.dicebear.com/7.x/initials/svg?seed=GC', ARRAY['Python', 'D3.js', 'EarthData'], 'ESOC 2026', 'Open data pipelines for environmental monitoring.', 'greencode/pipeline')
ON CONFLICT (slug) DO UPDATE SET logo_url = EXCLUDED.logo_url, tech_stack = EXCLUDED.tech_stack, program = EXCLUDED.program, description = EXCLUDED.description, repo_path = EXCLUDED.repo_path;
`;

sql += `COMMIT;\n`;

fs.writeFileSync('restore_all_orgs.sql', sql);
console.log('Successfully generated restore_all_orgs.sql with ' + orgs.length + ' GSoC orgs and additional programs.');
