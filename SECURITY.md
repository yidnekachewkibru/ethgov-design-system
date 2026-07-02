# Security Policy

ETHDS is used to build services that handle citizens' sensitive data, so
security is taken seriously — see
[Security and Privacy by Design](docs/design-principles/08-security-and-privacy-by-design.md).

## Scope

This policy covers the ETHDS packages themselves (`@ethds/tokens`,
`@ethds/react`, `@ethds/icons`, and the pattern/template/example
guidance). Vulnerabilities in a **specific government service** built with
ETHDS should be reported to that service's operator, not here.

## Reporting a vulnerability

**Do not open a public issue for a security vulnerability.**

Report it privately via GitHub's **[Security Advisories](https://github.com/yidnekachewkibru/ethgov-design-system/security/advisories/new)**
("Report a vulnerability"), or by emailing the maintainers at the security
contact published in
[`docs/governance/community-model.md`](docs/governance/community-model.md).

Please include:

- A description of the issue and its impact.
- Steps to reproduce (a minimal proof of concept helps).
- Affected package/version.

## What to expect

- **Acknowledgement** within **3 working days**.
- An initial **assessment** (severity, affected versions) within **10
  working days**.
- Coordinated disclosure: we agree a timeline with you, fix the issue,
  release a patched version, and publish an advisory crediting you (unless
  you prefer to remain anonymous).

## Response & releases

- Security fixes are released as **patch versions** outside the normal
  cadence — see
  [release management](docs/governance/release-management.md).
- Severe issues may warrant a coordinated advisory across affected
  packages.

## Recognition

We credit reporters who follow this coordinated process (with their
consent). Thank you for helping keep citizens' services safe.
