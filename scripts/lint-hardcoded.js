const fs = require('fs');
const path = require('path');

const TARGET_DIRS = [
  path.join(__dirname, '../src/components'),
  path.join(__dirname, '../src/consumption'),
];

const HEX_REGEX = /#[0-9a-fA-F]{3,6}/;

function scanFile(filePath, errors) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (HEX_REGEX.test(line) && !line.includes('var(')) {
      errors.push(`${filePath}:${idx + 1} contains hardcoded hex color`);
    }
  });
}

function main() {
  const errors = [];
  for (const dir of TARGET_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) continue;
      if (/\.(css|scss)$/.test(entry)) {
        scanFile(full, errors);
      }
    }
  }

  if (errors.length) {
    console.error('❌ Hardcoded color values detected:');
    for (const e of errors) console.error(' -', e);
    process.exit(1);
  } else {
    console.log('✅ No hardcoded hex color values found in target directories');
  }
}

main();
