---
id: rfc-process
title: RFC Process
sidebar_position: 2
---

# RFC Process

An **RFC** (Request for Comments) is how ETHDS makes significant decisions
in the open. It formalizes the process referenced from
[CONTRIBUTING.md](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/CONTRIBUTING.md#proposing-significant-changes)
and the [governance model](governance-model.md). RFCs are archived in
[`packages/ethds-rfcs/`](https://github.com/yidnekachewkibru/ethgov-design-system/tree/main/packages/ethds-rfcs).

This process embodies
[Open by Default](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/docs/design-principles/10-open-by-default.md):
decisions are recorded with their reasoning so the community can
understand and shape them.

## When an RFC is required

Open an RFC before implementing anything that:

- Adds a new component, pattern, or template
- Changes a public API or design token in a **breaking** way
- Changes the accessibility or localization **standards** themselves
- Changes governance, licensing, or the release process
- Otherwise affects how contributors or downstream government teams use
  ETHDS

Small, self-contained changes (bug fixes, docs, non-breaking additions
within an existing pattern) do **not** need an RFC — a normal pull request
is enough.

## Lifecycle

```
Draft ──▶ Proposed ──▶ Under Review ──▶ Accepted ──▶ Implemented
                            │
                            └────────▶ Rejected  (or  Withdrawn)
```

1. **Draft.** Copy
   [`template.md`](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/packages/ethds-rfcs/template.md),
   fill it in, and open a pull request adding it to
   `packages/ethds-rfcs/proposals/`. Number it with the next free
   `NNNN`.
2. **Proposed.** The PR is open; a discussion issue may accompany it
   (label `rfc`).
3. **Under Review.** A public comment period (minimum **one week** for
   substantive RFCs). Required reviewers weigh in:
   accessibility/localization/security reviewers where relevant (see the
   [governance model](governance-model.md)).
4. **Accepted.** Maintainers reach consensus (ties broken by the lead
   maintainer). The RFC is merged with status **Accepted**; implementation
   can begin (by the author or anyone).
5. **Rejected / Withdrawn.** Recorded with the reasoning, and merged (or
   closed) so the decision and its rationale are preserved — a rejected
   RFC is still a valuable record.
6. **Implemented.** When the work ships, the RFC's status is updated to
   **Implemented** with a link to the change.

## Roles

- **Author** — writes and shepherds the RFC, incorporates feedback.
- **Reviewers** — anyone may comment; domain reviewers (a11y, l10n,
  security) have **required sign-off** on RFCs in their area.
- **Maintainers** — decide, record the outcome, and keep the archive
  accurate.

## What makes a good RFC

- States the **problem** and **who it's for** (start with citizen needs).
- Considers **accessibility** and **localization** up front, not as an
  afterthought.
- Lists **alternatives** and why they were not chosen.
- Notes the **migration/compat** impact for existing consumers.

See the
[RFC template](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/packages/ethds-rfcs/template.md)
and the
[worked example](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/packages/ethds-rfcs/proposals/0000-example.md).
