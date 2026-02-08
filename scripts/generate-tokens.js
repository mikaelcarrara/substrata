const fs = require('fs');
const path = require('path');

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

function inferTypeFromFilename(filename) {
    const name = filename.toLowerCase();
    if (name.includes('color')) return 'color';
    if (name.includes('spacing')) return 'spacing';
    if (name.includes('typography')) return 'typography';
    if (name.includes('radius')) return 'radius';
    if (name.includes('border')) return 'border';
    if (name.includes('elevation') || name.includes('shadow')) return 'elevation';
    if (name.includes('motion')) return 'motion';
    if (name.includes('opacity')) return 'opacity';
    if (name.includes('breakpoint')) return 'breakpoint';
    if (name.includes('semantic')) return 'semantic';
    return 'unknown';
}

function parseCssVariables(cssContent, fileType) {
    const tokens = {};
    const lines = cssContent.split('\n');

    for (const line of lines) {
        const match = line.match(/--([\w-]+):\s*([^;]+);/);
        if (match) {
            const variableName = match[1]; // e.g. "color-neutral-100"
            const value = match[2].trim(); // e.g. "#ffffff"

            const parts = variableName.split('-');
            setDeep(tokens, parts, {
                value: value,
                type: fileType,
                originalVariable: `--${variableName}`
            });
        }
    }
    return tokens;
}

function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        const srcVal = source[key];
        const tgtVal = target[key];
        if (srcVal && typeof srcVal === 'object' && !Array.isArray(srcVal)) {
            if (!tgtVal || typeof tgtVal !== 'object' || Array.isArray(tgtVal)) {
                target[key] = {};
            }
            deepMerge(target[key], srcVal);
        } else {
            target[key] = srcVal;
        }
    }
    return target;
}

async function generateTokens() {
    try {
        // Default paths (relative to this script when running in the repo)
        let tokensDir = path.join(__dirname, '../src/tokens');
        let outputFile = path.join(__dirname, '../tokens.json');

        // Check for user config
        const configPath = path.join(process.cwd(), 'substrata.config.js');
        if (fs.existsSync(configPath)) {
            console.log('Found substrata.config.js');
            const config = require(configPath);
            if (config.tokens) {
                tokensDir = path.resolve(process.cwd(), config.tokens);
            }
            if (config.output) {
                outputFile = path.resolve(process.cwd(), config.output);
            }
        }

        if (!fs.existsSync(tokensDir)) {
            console.error(`❌ Tokens directory not found: ${tokensDir}`);
            process.exit(1);
        }

        const files = fs.readdirSync(tokensDir);
        const allTokens = {};

        console.log(`Scanning ${tokensDir}...`);

        for (const file of files) {
            if (file.endsWith('.css')) {
                const content = fs.readFileSync(path.join(tokensDir, file), 'utf8');
                const fileType = inferTypeFromFilename(file);
                const fileTokens = parseCssVariables(content, fileType);

                deepMerge(allTokens, fileTokens);
            }
        }

        const outputContent = JSON.stringify(allTokens, null, 2);
        // Ensure output directory exists
        const outputDir = path.dirname(outputFile);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputFile, outputContent);

        console.log(`✅ Generated tokens.json at ${outputFile}`);
    } catch (error) {
        console.error('❌ Error generating tokens:', error);
        process.exit(1);
    }
}

generateTokens();
