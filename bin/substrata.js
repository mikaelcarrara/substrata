#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

if (!command || (command !== 'init' && command !== 'generate')) {
    console.log('Usage: @mikaelcarrara/substrata <command>');
    console.log('Commands:');
    console.log('  init      Initialize a new Substrata configuration and directory structure');
    console.log('  generate  Generate tokens.json from source');
    process.exit(1);
}

if (command === 'init') {
    console.log('🚀 Initializing Substrata...');

    const cwd = process.cwd();
    const configPath = path.join(cwd, 'substrata.config.js');
    const tokensDir = path.join(cwd, 'src/tokens');

    // 1. Create config file
    if (fs.existsSync(configPath)) {
        console.log('⚠️  substrata.config.js already exists.');
    } else {
        const defaultConfig = `module.exports = {
  tokens: './src/tokens',
  output: './tokens.json'
};
`;
        fs.writeFileSync(configPath, defaultConfig);
        console.log('✅ Created substrata.config.js');
    }

    // 2. Create directory structure
    if (!fs.existsSync(tokensDir)) {
        fs.mkdirSync(tokensDir, { recursive: true });
        console.log('✅ Created src/tokens directory');
    }

    // 3. Create sample tokens
    const sampleColors = `:root {
  /* Brand */
  --brand-500: #3b82f6;
  --brand-700: #1d4ed8;

  /* Neutrals */
  --neutral-0: #ffffff;
  --neutral-900: #0f172a;
}
`;
    const sampleSpacing = `:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
}
`;

    const colorsPath = path.join(tokensDir, 'colors.css');
    const spacingPath = path.join(tokensDir, 'spacing.css');

    if (!fs.existsSync(colorsPath)) {
        fs.writeFileSync(colorsPath, sampleColors);
        console.log('✅ Created src/tokens/colors.css (sample)');
    }

    if (!fs.existsSync(spacingPath)) {
        fs.writeFileSync(spacingPath, sampleSpacing);
        console.log('✅ Created src/tokens/spacing.css (sample)');
    }

    console.log('\n✨ Substrata is ready! Run "npx @mikaelcarrara/substrata generate" to build your tokens.');
}

if (command === 'generate') {
    console.log('Generating tokens...');
    try {
        // In the context of the package, the script is in ../scripts/
        // When installed as a dependency, it will be relative to this file
        const scriptPath = path.join(__dirname, '../scripts/generate-tokens.js');

        if (fs.existsSync(scriptPath)) {
            require(scriptPath);
        } else {
            console.error('❌ Could not find generation script at:', scriptPath);
            process.exit(1);
        }
    } catch (error) {
        console.error('❌ Error during generation:', error);
        process.exit(1);
    }
}
