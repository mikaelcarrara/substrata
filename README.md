# Substrata

Substrata is a framework-agnostic design tokens system built with CSS Variables. It serves as a **single source of truth** for design decisions, enabling consistent UI foundations across any framework, platform, or tech stack.

Unlike a UI library, Substrata provides the *definitions* (tokens) that drive the UI, ensuring that design intent is preserved from Figma to production code.

**[Documentation](https://mikaelcarrara.github.io/substrata)**

---

## Why Substrata?

*   **Framework Agnostic**: Works with plain CSS, Tailwind, Sass, CSS-in-JS, or any other styling solution.
*   **W3C Aligned**: Follows the W3C Design Tokens Community Group architecture (Definition → Transformation → Source → Consumption).
*   **Automation Ready**: Designed to be consumed by CI pipelines and AI agents for safe, deterministic refactors.
*   **Governance First**: Enforces design rules via strict token contracts, not just conventions.

---

## Core Principles

Substrata operates under strict governance to ensure it remains a reliable foundation.

*   **Single Source of Truth**: The canonical repository is the only place where tokens are defined.
*   **Tokens as Contracts**: Changing a token value is a breaking change.
*   **Automated Validation**: CI ensures no tokens are broken and detects breaking changes automatically.
*   **AI Compatible**: Tokens provide a bounded context that allows AI to generate and refactor UI safely.

For deep dives into our operating model:
*   [**Governance Policy**](./GOVERNANCE.md) - How we manage changes and ownership.
*   [**CI & Automation**](./CI.md) - How automation preserves integrity.
*   [**Contributing**](./CONTRIBUTING.md) - How to propose changes safely.

---

## Architecture & W3C Alignment

Substrata implements the "Source of Truth" layer in the W3C reference architecture:

1.  **Definition**: Design intent defined in design tools (e.g., Figma).
2.  **Transformation**: Raw data processed into usable artifacts.
3.  **Source of Truth (Substrata)**: The detailed, versioned, and semantic definition of all tokens (CSS variables, JSON).
4.  **Consumption**: Applications (React, Vue, iOS, Android) consuming these tokens.

Read more in [W3C Alignment](./docs/w3c-alignment.html).

---

## Installation

### Via CLI (Recommended)

```bash
# Initialize configuration
npx substrata init

# Generate machine-readable tokens
npm run build:tokens
```

### Manual Download

Clone or download from GitHub:

```bash
git clone https://github.com/mikaelcarrara/substrata.git
```

Or download directly and include in your project.

## Usage

Substrata is designed to be consumed, not imposed. You can use it in multiple ways:

### 1. Plain CSS
Import the full system or valid subsets:
```css
/* Import everything */
@import "path/to/substrata/src/substrata.css";

/* Or just tokens */
@import "path/to/substrata/src/tokens.css";
```

### 2. Tailwind CSS
Substrata feeds Tailwind. It does not replace it.
```css
@import "path/to/substrata/src/tokens.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```
*See [Getting Started](./docs/getting-started.html) for `tailwind.config.js` mapping.*

### 3. CSS-in-JS
Use tokens as values in your styled components:
```js
import "path/to/substrata/src/tokens.css";

const Button = styled.button`
  padding: var(--space-3) var(--space-4);
  background: var(--brand-500);
  border-radius: var(--radius-md);
`;
```

---

## Documentation

*   [**Presentation**](./docs/index.html)
*   [**Getting Started**](./docs/getting-started.html)
*   [**Tokens Reference**](./docs/tokens.html)
*   [**Reference Components**](./docs/components.html)
*   [**Consumption Strategies**](./docs/consumption.html)
*   [**Automation & AI**](./docs/automation.html)
*   [**W3C Alignment**](./docs/w3c-alignment.html)

---

## License

MIT © 2026 Mikael Carrara
