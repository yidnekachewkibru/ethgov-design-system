# Phase 0 — Foundation

**Status:** ✅ Complete

## Goal

Establish the vision, governance, repository strategy, and contribution
process for ETHDS — the groundwork every later phase builds on.

## Deliverables

- Vision and Mission — [`docs/foundation/vision-and-mission.md`](../foundation/vision-and-mission.md)
- Project Charter — [`docs/foundation/project-charter.md`](../foundation/project-charter.md)
- Design Philosophy — [`docs/foundation/design-philosophy.md`](../foundation/design-philosophy.md)
- Success Metrics — [`docs/foundation/success-metrics.md`](../foundation/success-metrics.md)
- Governance Model — [`docs/governance/governance-model.md`](../governance/governance-model.md)
- Repository Strategy — [`docs/governance/repository-strategy.md`](../governance/repository-strategy.md)
- Roadmap — [`docs/foundation/roadmap.md`](../foundation/roadmap.md)
- README — [`README.md`](../../README.md)
- CONTRIBUTING — [`CONTRIBUTING.md`](../../CONTRIBUTING.md)
- CODE_OF_CONDUCT — [`CODE_OF_CONDUCT.md`](../../CODE_OF_CONDUCT.md)
- LICENSE (MIT) — [`LICENSE`](../../LICENSE)
- Community Model — [`docs/governance/community-model.md`](../governance/community-model.md)
- Release Strategy — [`docs/governance/release-strategy.md`](../governance/release-strategy.md)
- Monorepo workspace skeleton — [`packages/`](../../packages/) (8 workspaces,
  see [`repository-strategy.md`](../governance/repository-strategy.md) for
  the rationale behind monorepo-over-multi-repo)
- This phase-file backlog — [`docs/phases/`](.)

## Output Location

Repo root, `docs/foundation/`, `docs/governance/`, `.github/`.

## Dependencies

None — this is the first phase.

## Note on Scope

The original guide specified eight separate GitHub repositories
(`ethds-docs`, `ethds-tokens`, `ethds-react`, `ethds-icons`,
`ethds-patterns`, `ethds-templates`, `ethds-examples`, `ethds-rfcs`).
This implementation uses a single monorepo with `packages/*` npm
workspaces instead — see
[`docs/governance/repository-strategy.md`](../governance/repository-strategy.md)
for why, and the criteria for splitting a package out later.
