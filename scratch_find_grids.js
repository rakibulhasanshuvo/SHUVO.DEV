const fs = require('fs');
const content = fs.readFileSync('src/app/page.tsx', 'utf8');

const lines = content.split('\n');
console.log('--- Matches in page.tsx ---');
lines.forEach((line, index) => {
  if (line.includes('bg-[') || line.includes('linear-gradient') || line.includes('border') || line.includes('grid-') || line.includes('max-w-')) {
    console.log(`${index + 1}: ${line.trim()}`);
  }
});
