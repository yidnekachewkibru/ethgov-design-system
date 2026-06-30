# 10. Open by Default

> ETHDS, and the services built with it, favour openness in process and
> code unless a specific reason requires otherwise.

## Description

ETHDS is developed in the open: the code is open source under a permissive
licence, decisions are made through public discussion and RFCs, and the
roadmap, governance, and standards are all public. Services built on ETHDS
are encouraged to follow the same default — open code, open standards,
open process — closing things only when a concrete reason (security,
privacy, legal constraint) genuinely requires it. Openness is the default
position; secrecy is the exception that must be justified.

## Rationale

ETHDS is a public good built with public resources for public benefit,
which makes openness the natural default. Open code can be inspected,
trusted, reused, and improved by any government body or contributor —
multiplying the value of work done once. Open process means decisions are
accountable and the community can shape direction rather than receive it.
Open standards prevent lock-in to a single vendor or team.

Openness also strengthens the other principles: open source lets any team
[reuse](07-reuse-before-building.md) the building blocks; public review
surfaces accessibility, localization, and security issues that a closed
team would miss; and transparent governance builds the trust that
government services depend on. The exceptions — genuine security or
privacy concerns — are real and respected
([Security and Privacy by Design](08-security-and-privacy-by-design.md)),
but they are exceptions, not the rule.

## Examples

- ETHDS itself is [MIT licensed](../../LICENSE), developed on a public
  repository, with a public [roadmap](../foundation/roadmap.md) and
  [governance model](../governance/governance-model.md) any contributor
  can read and participate in.
- A significant design decision is proposed and debated as a public
  [RFC](../../CONTRIBUTING.md#proposing-significant-changes), so the
  reasoning is recorded and the community can weigh in, rather than being
  settled privately.
- A government team builds a service on ETHDS and opens its own source and
  reusable patterns, so another body can adopt them instead of rebuilding.

## Anti-patterns

- **Closed by default:** keeping code, decisions, or standards private
  without a specific reason, defaulting to secrecy.
- **Decisions behind closed doors:** making significant changes without
  public discussion or a recorded rationale, so the community can't
  understand or shape them.
- **Vendor or team lock-in:** building on proprietary, undocumented
  standards that tie a service to one supplier.
- **Open-washing:** publishing code with no licence, no documentation, and
  no real way to contribute — the appearance of openness without its
  substance.

## Implementation Guidance

- Default to open: open source, open standards, and public process unless
  a concrete security, privacy, or legal reason requires otherwise — and
  document that reason when it does.
- Make significant decisions through public
  [RFCs](../../CONTRIBUTING.md#proposing-significant-changes) and the
  public [governance process](../governance/governance-model.md), so
  reasoning is recorded and the community can participate.
- License contributions clearly (ETHDS uses [MIT](../../LICENSE)) and keep
  documentation public, so others can genuinely reuse the work — real
  openness, not [the appearance of it](#anti-patterns).
- Encourage government teams building on ETHDS to open their own reusable
  components and patterns, feeding improvements back so the whole
  ecosystem benefits ([Reuse Before Building](07-reuse-before-building.md)).
- Respect the genuine exceptions: protect what
  [security and privacy](08-security-and-privacy-by-design.md) require be
  protected — openness is the default, not an absolute.
