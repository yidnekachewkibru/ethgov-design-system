---
id: maintainer-responsibilities
title: Maintainer Responsibilities
sidebar_position: 6
---

# Maintainer Responsibilities

What it means to be an ETHDS maintainer. Maintainers are stewards of a
public good, not gatekeepers — the job is to keep ETHDS healthy, coherent,
and welcoming.

## Roles

- **Lead Maintainer** — overall direction, final tie-breaking authority,
  release sign-off for cross-cutting/1.0-track releases, and steward of
  the [sustainability plan](sustainability-plan.md).
- **Package Maintainers** — merge rights on one or more `packages/*`
  workspaces; own their package's quality, roadmap, and releases.
- **Reviewers** — accessibility, localization, or security specialists
  with **required sign-off** in their domain, without general merge rights.

(See the [contributor ladder](contributor-ladder.md) for how people reach
these roles.)

## Responsibilities

Maintainers are expected to:

- **Review fairly and promptly** — aim to give PRs a first response within
  a few working days; be clear and kind in feedback
  ([Code of Conduct](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/CODE_OF_CONDUCT.md)).
- **Uphold the bar** — enforce the
  [component](component-review-process.md),
  [accessibility](accessibility-review-process.md), and
  [localization](localization-review-process.md) review processes; never
  merge a change that regresses accessibility or localization or breaks the
  token discipline.
- **Shepherd decisions** — run the [RFC process](rfc-process.md) openly;
  record decisions and their reasoning.
- **Manage releases** — per [release management](release-management.md),
  with correct versioning and changelogs.
- **Handle security** — respond to reports per
  [SECURITY.md](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/SECURITY.md).
- **Grow the community** — mentor contributors, recognize good work, and
  propose people for the next rung of the ladder.
- **Keep docs true** — update the roadmap, statuses, and governance docs as
  reality changes.

## Conduct & accountability

- Maintainers are held to the
  [Code of Conduct](https://github.com/yidnekachewkibru/ethgov-design-system/blob/main/CODE_OF_CONDUCT.md)
  to the same standard they enforce.
- Decisions are made in the open; disagreements go to maintainer
  discussion and, if needed, a vote (lead breaks ties) per the
  [governance model](governance-model.md).

## Stepping back

Maintaining is voluntary. A maintainer may step back at any time; they
should hand off their areas and, ideally, help identify a successor. An
inactive maintainer's merge rights may be moved to emeritus status to keep
the active set accurate — this is a normal, no-fault part of a healthy
project.
