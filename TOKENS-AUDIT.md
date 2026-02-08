# Tokens audit

**Date:** 2025-02  
**Scope:** All design tokens in `src/tokens/` for consistency and completeness; documentation alignment.

## Summary

- **Consistency:** Naming is mostly consistent within each file. A few doc/code mismatches were fixed.
- **Completeness:** Core domains are covered (colors, typography, spacing, radius, elevation/shadows, motion, opacity, breakpoints, semantic aliases). Optional gaps are listed below for future consideration.

## Findings and fixes

### 1. Documentation vs code (fixed)

- **docs/tokens.html** referenced token names that do not exist or differed from the source:
  - Colors: doc said `--color-neutral-*` / `--color-brand-*`; actual tokens are `--neutral-*`, `--brand-*`, and `--color-success|warning|danger`.
  - Radius/borders: doc had `--border-width-hairline`; actual token is `--border-width` (and `--border-color`).
  - Elevation: doc had `--elevation-1|2|3`; actual tokens in `elevation.css` are `--shadow-sm`, `--shadow-md`, `--shadow-lg`.
  - Motion: doc had `--motion-duration-fast`, `--motion-easing-standard`; actual tokens are `--motion-fast`, `--motion-normal`, `--motion-slow` (durations only; no easing tokens).
  - Semantic aliases: doc had `--color-background-surface`, `--color-border-subtle`; actual tokens are `--color-bg`, `--color-surface`, `--color-border`, etc.

All examples in `docs/tokens.html` were updated to match the current token set.

### 2. Naming consistency

- **Colors:** Raw palette uses `--neutral-*`, `--brand-*`; feedback uses `--color-success`, `--color-warning`, `--color-danger`. Semantic aliases use `--color-*`. This split (scale vs semantic) is intentional and consistent.
- **Other files:** Typography, spacing, motion, opacity, breakpoints, radius/borders use a single pattern per file. No changes required.

### 3. tokens.json type metadata

- `scripts/generate-tokens.js` currently sets `type: 'color'` for every token. Breakpoints, spacing, motion, etc. should have correct types (e.g. `dimension`, `duration`) for tooling. Marked as known limitation; improvement is in the script, not in the token definitions.

### 4. Optional completeness (roadmap)

- **Motion:** No easing tokens (e.g. `--motion-easing-standard`). Only duration scale exists.
- **Breakpoints:** Only `sm`, `md`, `lg`. Add `xl`/`2xl` if the system needs them.
- **Typography:** No `letter-spacing` tokens. Add if needed for the design system.
- **Elevation:** File is named `elevation.css` but variables are `--shadow-*`. Consider aligning name (e.g. `shadow.css`) or adding semantic elevation aliases that reference shadows.

## Token inventory (current)

| File | Tokens |
|------|--------|
| colors.css | neutral-0..900, brand-300/500/700, color-success/warning/danger |
| typography.css | font-family-base, font-size-*, font-weight-*, line-height-* |
| spacing.css | space-1..6 |
| radius-and-borders.css | radius-sm/md/lg, border-width, border-color |
| elevation.css | shadow-sm, shadow-md, shadow-lg |
| motion.css | motion-fast, motion-normal, motion-slow |
| opacity.css | opacity-disabled, opacity-muted, opacity-overlay |
| breakpoints.css | breakpoint-sm, breakpoint-md, breakpoint-lg |
| semantic-aliases.css | color-bg, color-surface, color-text-*, color-border, color-brand-*, color-text-inverse |

## Conclusion

Tokens are consistent and complete for the current scope. Documentation now matches the code. The TODO “Review Tokens” can be marked done; optional improvements above can be tracked in ROADMAP or future TODOs.
