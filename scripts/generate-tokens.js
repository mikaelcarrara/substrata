const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '../src/tokens');
const OUTPUT_FILE = path.join(__dirname, '../tokens.json');

// Helper to convert kebab-case to nested object structure
// e.g. "color-neutral-100" -> { color: { neutral: { 100: ... } } }
function setDeep(obj, pathParts, value) {
    let current = obj;
    for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        if (i === pathParts.length - 1) {
            current[part] = value;
        } else {
            current[part] = current[part] || {};
            current = current[part];
        }
    }
}

function parseCssVariables(cssContent) {
    const tokens = {};
    const lines = cssContent.split('\n');

    for (const line of lines) {
        const match = line.match(/--([\w-]+):\s*([^;]+);/);
        if (match) {
            const variableName = match[1]; // e.g. "color-neutral-100"
            const value = match[2].trim(); // e.g. "#ffffff"

            // Remove "substrata-" prefix if present to cleaner structure, 
            // or keep it if that's the preferred token name. 
            // For now, we'll split by hyphen.
            const parts = variableName.split('-');
            setDeep(tokens, parts, {
                value: value,
                type: 'color', // TODO: Infer type based on file or value
                originalVariable: `--${variableName}`
            });
        }
    }
    return tokens;
}

async function generateTokens() {
    try {
        const files = fs.readdirSync(TOKENS_DIR);
        const allTokens = {};

        console.log(`Scanning ${TOKENS_DIR}...`);

        for (const file of files) {
            if (file.endsWith('.css')) {
                const content = fs.readFileSync(path.join(TOKENS_DIR, file), 'utf8');
                const fileTokens = parseCssVariables(content);

                // Merge into main object. 
                // Note: This simple merge assumes no key collisions across files at the top level
                // that would overwrite existing objects entirely. 
                // A deep merge would be safer for production but this suffices for flat token files.
                Object.assign(allTokens, { ...allTokens, ...fileTokens });
            }
        }

        const outputContent = JSON.stringify(allTokens, null, 2);
        fs.writeFileSync(OUTPUT_FILE, outputContent);

        console.log(`✅ Generated tokens.json at ${OUTPUT_FILE}`);
    } catch (error) {
        console.error('❌ Error generating tokens:', error);
        process.exit(1);
    }
}

generateTokens();
