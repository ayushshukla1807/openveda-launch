const fs = require('fs');
const path = require('path');

function getRelativePath(fromDir, toFile) {
  let rel = path.relative(fromDir, toFile);
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

function processDirectory(dir, basePath) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath, basePath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace @/... imports
      content = content.replace(/from\s+['"]@\/([^'"]+)['"]/g, (match, p1) => {
        const targetPath = path.join(basePath, p1);
        const relPath = getRelativePath(path.dirname(fullPath), targetPath);
        return `from '${relPath}'`;
      });
      // Replace dynamic imports e.g. import('@/...')
      content = content.replace(/import\(['"]@\/([^'"]+)['"]\)/g, (match, p1) => {
        const targetPath = path.join(basePath, p1);
        const relPath = getRelativePath(path.dirname(fullPath), targetPath);
        return `import('${relPath}')`;
      });

      fs.writeFileSync(fullPath, content);
    }
  }
}

const appsWebDir = path.join(__dirname, 'apps/web');
processDirectory(appsWebDir, appsWebDir);
console.log('Done fixing imports!');
