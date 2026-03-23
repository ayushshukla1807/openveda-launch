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
  // Handle GitHub URLs
  const githubMatch = url.match(/github\.com\/([^/]+\/[^/]+)/);
  if (githubMatch) {
    let path = githubMatch[1];
    // Remove trailing slash or .git
    path = path.replace(/\/$/, '').replace(/\.git$/, '');
    // Handle cases like "org/repo/..."
    const parts = path.split('/');
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
  }
  return null; // For now, only support GitHub for Live Issues
}

let sql = `-- GSOC 2026 Next Steps Migration: Repo Paths and Playbook Content
BEGIN;

`;

orgs.forEach(org => {
  const sourceUrl = repoMap[org.slug];
  const repoPath = getRepoPath(sourceUrl);
  
  if (repoPath) {
    sql += `UPDATE organizations SET repo_path = '${repoPath}' WHERE slug = '${org.slug}';\n`;
  }
  
  // Generate slightly better playbook content
  const tech = org.tech_stack && org.tech_stack.length > 0 ? org.tech_stack.join(', ') : 'Open Source';
  const content = `### Welcome to ${org.name}!

This organization is part of **Google Summer of Code 2026**.

**Technologies used:** ${tech}

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](${sourceUrl || '#'})
2. **Setup your environment:** Look for a \`README.md\` or \`CONTRIBUTING.md\` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization's website for communication channels (Slack, Discord, Mailing List).

Happy coding!
`;

  // Safely escape single quotes for SQL
  const escapedContent = content.replace(/'/g, "''");
  
  sql += `UPDATE playbooks SET content_markdown = '${escapedContent}' WHERE org_id = (SELECT id FROM organizations WHERE slug = '${org.slug}');\n\n`;
});

sql += `COMMIT;`;

fs.writeFileSync('GSOC_2026_NEXT_STEPS.sql', sql);
console.log('Migration script generated: GSOC_2026_NEXT_STEPS.sql');
