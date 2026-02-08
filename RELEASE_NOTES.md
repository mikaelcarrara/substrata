# Release Notes v1.1.0

## Summary

- Architecture docs updated; diagrams and consumption sections now reflect src/substrata.css, docs/css/*.css, and real adapters.
- Token build improved: file-based type inference + deep merge to prevent key collisions.
- Token validation and schema added; CI workflow for tokens created.
- Documentation updated across consumption, getting-started, governance, W3C alignment, and README with naming conventions.
- QA checklist added to CONTRIBUTING; governance and contributing now reference Release notes instead of CHANGELOG.md.

## Changes

- docs(architecture): update diagram, consumption examples, and tools section
- build(tokens): infer type by filename and deep-merge token graph
- test(tokens): add programmatic validation and tokens.schema.json
- ci(tokens): add Tokens CI workflow (build/validate/lint)
- chore(lint): add hardcoded hex color check in src/components and src/consumption
- docs(consumption): enrich mapping for Tailwind and add source links
- docs(getting-started): correct imports and Tailwind guide
- docs(governance): fix published artifacts and use “Release notes”
- docs(w3c-alignment): adjust typical structure and examples
- docs(readme): add naming conventions and planned artifacts
- docs(contributing): include QA checklist and use “Release notes”

## Impact

- More accurate docs; easier onboarding and consumption across approaches.
- Safer token generation via validated JSON and types.
- CI guardrails for token build and basic linting.
- Clear QA path for future doc and token changes.

## Migration Notes

- Consumers can import src/substrata.css or selective token files under src/tokens/*.css.
- Tailwind theme mapping should use var(--brand-xxx), var(--neutral-xxx), spacing, and borderRadius tokens as shown in docs.
