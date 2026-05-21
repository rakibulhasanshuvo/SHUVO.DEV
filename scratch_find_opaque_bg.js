const fs = require('fs');
const path = require('path');

const dirs = ['src/components', 'src/app'];

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('bg-black') || line.includes('bg-cyber-black') || line.includes('background: #') || line.includes('background-color:')) {
          console.log(`${fullPath}:${index + 1}: ${line.trim()}`);
        }
      });
    }
  }
}

console.log('--- Scanning for opaque backgrounds ---');
dirs.forEach(dir => {
  if (fs.existsSync(dir)) scanDir(dir);
});
