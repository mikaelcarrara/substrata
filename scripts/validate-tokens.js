const fs = require('fs');
const path = require('path');

const ALLOWED_TYPES = new Set([
  'color',
  'spacing',
  'typography',
  'radius',
  'border',
  'elevation',
  'motion',
  'opacity',
  'breakpoint',
  'semantic',
  'unknown',
]);

function isLeaf(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return false;
  const keys = Object.keys(node);
  return keys.includes('value') && keys.includes('type') && keys.includes('originalVariable');
}

function validateLeaf(node, pathStr, errors) {
  if (typeof node.value !== 'string' || node.value.length === 0) {
    errors.push(`Invalid value at ${pathStr}`);
  }
  if (!ALLOWED_TYPES.has(node.type)) {
    errors.push(`Invalid type "${node.type}" at ${pathStr}`);
  }
  if (typeof node.originalVariable !== 'string' || !node.originalVariable.startsWith('--')) {
    errors.push(`Invalid originalVariable at ${pathStr}`);
  }
}

function traverse(obj, pathParts, errors, stats) {
  if (isLeaf(obj)) {
    const pathStr = pathParts.join('.');
    stats.leaves += 1;
    validateLeaf(obj, pathStr, errors);
    return;
  }
  if (!obj || typeof obj !== 'object') return;
  for (const key of Object.keys(obj)) {
    traverse(obj[key], [...pathParts, key], errors, stats);
  }
}

function main() {
  try {
    const cwd = process.cwd();
    const tokensPath = path.join(cwd, 'tokens.json');
    if (!fs.existsSync(tokensPath)) {
      console.error('❌ tokens.json not found. Run "npm run build:tokens" first.');
      process.exit(1);
    }
    const content = fs.readFileSync(tokensPath, 'utf8');
    const tokens = JSON.parse(content);

    const errors = [];
    const stats = { leaves: 0 };
    traverse(tokens, [], errors, stats);

    if (stats.leaves === 0) {
      console.error('❌ No token leaves found in tokens.json');
      process.exit(1);
    }

    if (errors.length) {
      console.error(`❌ Validation failed with ${errors.length} error(s):`);
      for (const e of errors) console.error(' -', e);
      process.exit(1);
    }

    console.log(`✅ tokens.json validated successfully (${stats.leaves} tokens)`);
  } catch (error) {
    console.error('❌ Error validating tokens:', error);
    process.exit(1);
  }
}

main();
