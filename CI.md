# CI & Automation

This document defines how **CI, automation, and AI-assisted workflows** interact with Substrata as a **canonical design token system**.

Substrata is designed to operate as a **stable, machine-readable design layer** that enables:
- deterministic CI validation
- safe automation
- AI-assisted UI generation and refactoring

Tokens act as **hard constraints**, not suggestions.

## Current state vs. Roadmap

| Today (available) | Roadmap ([ROADMAP.md](./ROADMAP.md)) |
|-------------------|--------------------------------------|
| `npx @mikaelcarrara/substrata init` | JSON Schema, `validate`, `migrate` |
| `npx @mikaelcarrara/substrata generate` → `tokens.json` | Figma Sync, VS Code Extension |
| `npm run build:tokens` | MCP Server, auto-refactor agent |
| CI: build tokens only | lint:tokens, breaking-change detection, lint:code, visual-regression |

The sections below describe the **target CI model**. Jobs marked as *roadmap* are planned; only `build:tokens` runs today.

## Role of CI in Substrata

CI is responsible for enforcing governance rules automatically.

Specifically, CI ensures that:
- tokens remain the single source of truth
- breaking changes are detected early (roadmap)
- design decisions are not bypassed by hardcoded values (roadmap)
- automation and AI outputs remain constrained by tokens

The full CI pipeline is roadmap; today, CI can at least regenerate `tokens.json` on token changes.

## Core principles

- **Tokens are contracts** between design and code
- **Automation must be deterministic**
- **AI operates within constraints**
- **All outputs must be auditable**
- **Human approval remains mandatory for critical changes**

## Canonical inputs and outputs

### Inputs
- `src/tokens/**` — canonical token definitions (CSS variables)

### Outputs (today)
- `src/substrata.css` — CSS Custom Properties (built from tokens)
- `tokens.json` — machine-readable token data for tools and agents (from `substrata generate`)

### Outputs (roadmap)
- `substrata.d.ts` — TypeScript types
- `design-contract.json` — mapping between tokens and design tools
- CI reports (lint, breaking changes, audits)

## CI jobs

### 1. build:tokens ✓ (available today)

**Purpose**  
Generate `tokens.json` from the canonical token source.

**Responsibilities**
- Read `src/tokens/**/*.css`
- Generate `tokens.json` via `npx @mikaelcarrara/substrata generate` or `npm run build:tokens`

**Failure conditions**
- Tokens directory not found
- Generation script error

### 2. lint:tokens *(roadmap)*

**Purpose**  
Validate the structural and semantic correctness of tokens.

**Validations** — Schema compliance, naming conventions, alias resolution, deprecated usage, type consistency.

**Failure conditions** — Invalid schema, broken references, invalid naming.

### 3. breaking-change detection *(roadmap)*

**Purpose**  
Detect changes that break the token contract (removal, rename, value change).

**Behavior** — CI fails by default; requires approval and semver major bump.

### 4. lint:code (token-aware) *(roadmap)*

**Purpose**  
Prevent hardcoded design values from entering codebases.

**Checks** — Detect raw colors, spacing, font sizes, radii; compare against token whitelist.

### 5. visual-regression *(roadmap, optional)*

**Purpose**  
Ensure token refactors do not unintentionally change visuals.

### 6. audit-log *(roadmap)*

**Purpose**  
Ensure traceability (token generation, refactors, AI-assisted changes).

## Example CI (works today)

```yaml
name: Tokens CI

on:
  pull_request:
    paths:
      - 'src/tokens/**'
      - 'scripts/**'
      - 'package.json'
      - 'substrata.config.js'

jobs:
  build-tokens:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build:tokens
```

## Example CI (roadmap — full pipeline)

```yaml
# Future: when lint:tokens, detect:breaking, lint:tokens-check exist
jobs:
  build-tokens:
    # ... as above ...
    - run: npm run lint:tokens

  breaking-changes:
    needs: build-tokens
    run: npm run detect:breaking

  validate-code:
    needs: build-tokens
    run: npm run lint:tokens-check

  visual-regression:
    needs: [build-tokens, breaking-changes]
    run: npm run visual-regression
```

## AI-assisted workflows

Substrata is designed to be safely consumed by AI and automation systems.

Tokens are:

- explicit
- semantic
- framework-agnostic
- machine-readable

This allows AI to operate within a bounded design space.

AI does not decide design.
AI executes within constraints.

---

## Example automation use cases (implementation patterns)

These are patterns you can implement using `tokens.json` as input. Substrata does not ship these tools; see [docs/automation](./docs/automation.html) for details.

- Generate UI components constrained by tokens
- Validate CSS for design consistency
- Refactor UI across frameworks without visual drift
- Build design-to-code pipelines driven by intent, not pixels
- Generate controlled variations (themes, brands, A/B tests)


## Token-driven AI prompts (examples)

### Component generation

```
Generate a Card component using only the following design tokens:

- Colors: neutral-0, neutral-200, neutral-900
- Spacing: space-3, space-4, space-5
- Radius: radius-md
- Typography: font-size-md, font-weight-medium

Do not introduce new values.
Output plain HTML and CSS.
```

### Token validation / linting

```
Analyze the following CSS and report any values not mapped to tokens.

Allowed:
- Spacing: space-1 to space-6
- Colors: neutral and brand scales
- Font sizes: font-size-sm, font-size-md, font-size-lg
```

### Cross-framework refactor

```
Refactor this React component to plain HTML and CSS.

Replace all hardcoded values with design tokens.
Preserve visual output.
Do not introduce framework-specific patterns.
```

## Why this works

- Tokens reduce ambiguity
- Design intent becomes explicit
- Automation becomes predictable
- CI remains authoritative
- Human review is preserved

## How CI, AI and Governance connect

- Governance defines the rules
- CI enforces them
- AI operates within them

```
Design intent → Tokens → CI constraints → Automation / AI → Validated output
```

AI is a constrained executor, not a decision-maker.

## Final note

This file is canonical.

- The website may present a summarized version
- The repository uses this document as the source of truth
- Any automation or AI integration must comply with the rules defined here and in [GOVERNANCE.md](./GOVERNANCE.md)