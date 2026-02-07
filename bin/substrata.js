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
    const srcDir = path.join(cwd, 'src');

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

    const samples = {
        'colors.css': `:root {
  /* Neutrals */
  --neutral-0: #ffffff;
  --neutral-50: #f8fafc;
  --neutral-100: #f1f5f9;
  --neutral-200: #e2e8f0;
  --neutral-300: #cbd5e1;
  --neutral-400: #94a3b8;
  --neutral-500: #64748b;
  --neutral-600: #475569;
  --neutral-700: #334155;
  --neutral-800: #1e293b;
  --neutral-900: #0f172a;

  /* Brand */
  --brand-300: #93c5fd;
  --brand-500: #3b82f6;
  --brand-700: #1d4ed8;
}
`,
        'spacing.css': `:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
}
`,
        'typography.css': `:root {
  --font-family-base: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}
`,
        'radius-and-borders.css': `:root {
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  --border-width: 1px;
  --border-color: var(--neutral-200);
}
`
    };

    for (const [file, content] of Object.entries(samples)) {
        const filePath = path.join(tokensDir, file);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content);
            console.log(`✅ Created src/tokens/${file}`);
        }
    }

    // 4. Create substrata.css (entry point that imports tokens)
    const substrataCssPath = path.join(srcDir, 'substrata.css');
    const substrataCss = `@import "tokens/typography.css";
@import "tokens/spacing.css";
@import "tokens/colors.css";
@import "tokens/radius-and-borders.css";

@import "./base.css";
`;
    if (!fs.existsSync(substrataCssPath)) {
        if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });
        fs.writeFileSync(substrataCssPath, substrataCss);
        console.log('✅ Created src/substrata.css');
    }

    // 5. Create base.css (typography reset)
    const baseCssPath = path.join(srcDir, 'base.css');
    const baseCss = `body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--neutral-900);
  background-color: var(--neutral-0);
}
`;
    if (!fs.existsSync(baseCssPath)) {
        fs.writeFileSync(baseCssPath, baseCss);
        console.log('✅ Created src/base.css');
    }

    // 6. Add build:tokens to package.json if it exists
    const pkgPath = path.join(cwd, 'package.json');
    if (fs.existsSync(pkgPath)) {
        try {
            const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
            if (!pkg.scripts) pkg.scripts = {};
            if (!pkg.scripts['build:tokens']) {
                pkg.scripts['build:tokens'] = 'npx @mikaelcarrara/substrata generate';
                fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
                console.log('✅ Added build:tokens script to package.json');
            }
        } catch (e) {
            // ignore parse errors
        }
    }

    console.log('\n✨ Substrata is ready! Import src/substrata.css in your app, then run "npx @mikaelcarrara/substrata generate" to build tokens.json.');
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
