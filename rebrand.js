const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'app/agents/resume-analyzer/rendercv');

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content
      .replace(/RenderCV/g, 'Superplaced AI CV')
      .replace(/rendercv/g, 'superplaced-cv');
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (e) {
    // Ignore binary files or read errors
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['.git', 'node_modules', 'tests'].includes(file)) {
        walkDir(fullPath);
      }
    } else {
      if (['.md', '.toml', '.py', '.json'].includes(path.extname(fullPath))) {
        replaceInFile(fullPath);
      }
    }
  }
}

walkDir(targetDir);
console.log("Rebranding complete.");
