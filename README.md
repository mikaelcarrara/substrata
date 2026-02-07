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

## Choose Your Path

Substrata is designed to be used in three distinct ways depending on your goal.

| Path | Goal | Installation | Tool |
| :--- | :--- | :--- | :--- |
| **1. Consumer** | Use default tokens in your app | `npm install @mikaelcarrara/substrata` | NPM |
| **2. Author** | Manage your own design system | `npx @mikaelcarrara/substrata init` | CLI (NPX) |
| **3. Contributor** | Modify Substrata core/docs | `git clone ...` | Git |

---

### Path 1: Consumer (Recommended)
Best for developers who want to use the official Substrata tokens (colors, spacing, etc.) in their project.

```bash
npm install @mikaelcarrara/substrata
```
*See [Getting Started](https://mikaelcarrara.github.io/substrata/getting-started) for importing CSS/JSON.*

### Path 2: Author & Automation
Best for architects building a custom design system using Substrata as the engine.

```bash
# Set up your config and folder structure
npx @mikaelcarrara/substrata init

# Build your machine-readable tokens.json
npx @mikaelcarrara/substrata generate
```
*See [Authoring & Automation](https://mikaelcarrara.github.io/substrata/automation) for guide.*

### Path 3: Contributor
Best for those who want to improve Substrata itself or host their own fork.

```bash
git clone https://github.com/mikaelcarrara/substrata.git
cd substrata
npm install
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
Import the full system or valid subsets from the package:
```css
/* Import everything */
@import "@mikaelcarrara/substrata/src/substrata.css";

/* Or just tokens */
@import "@mikaelcarrara/substrata/src/tokens/colors.css";
```

### 2. Tailwind CSS
Substrata feeds Tailwind. It does not replace it.
```css
@import "@mikaelcarrara/substrata/src/substrata.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```
*See [Consumption Strategies](./docs/consumption.html) for `tailwind.config.js` mapping.*

### 3. JavaScript / TypeScript
Import tokens as a JSON object:
```js
import tokens from '@mikaelcarrara/substrata';

const Button = styled.button`
  padding: ${tokens.space[3].value} ${tokens.space[4].value};
  background: ${tokens.color.brand[500].value};
  border-radius: ${tokens.radius.md.value};
`;
```

---

## Documentation

*   [**Presentation**](https://mikaelcarrara.github.io/substrata/)
*   [**Getting Started**](https://mikaelcarrara.github.io/substrata/getting-started)
*   [**Tokens Reference**](https://mikaelcarrara.github.io/substrata/tokens)
*   [**Reference Components**](https://mikaelcarrara.github.io/substrata/components)
*   [**Consumption Strategies**](https://mikaelcarrara.github.io/substrata/consumption)
*   [**Automation & AI**](https://mikaelcarrara.github.io/substrata/automation)
*   [**W3C Alignment**](https://mikaelcarrara.github.io/substrata/w3c-alignment)

---

## License

MIT © 2026 Mikael Carrara
