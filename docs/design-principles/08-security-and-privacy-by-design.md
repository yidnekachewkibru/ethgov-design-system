# 8. Security and Privacy by Design

> Citizen data protection is considered at every layer, not bolted on
> afterward.

## Description

Security and privacy are designed into ETHDS services from the start.
Services collect only the data a task genuinely requires, are clear with
citizens about what is collected and why, protect that data in transit and
at rest, and follow secure defaults in every interaction pattern —
authentication, verification, payment, document upload. Privacy is treated
as the citizen's right and the government's duty, not as a compliance
afterthought.

## Rationale

Citizens have little choice about using government services — they cannot
shop elsewhere for a national ID or a tax filing. That lack of choice
creates a heightened duty of care: the government holds sensitive personal
data (identity, financial, immigration, health, education) that citizens
are effectively required to hand over. A breach or misuse is not just a
technical failure; it erodes the public trust that government services
depend on, and can put real people at risk.

Security and privacy bolted on at the end leave gaps that attackers and
accidents find. Designing for them from the first decision — what to
collect, how to authenticate, how to show data back — produces services
that are safe by default and that respect citizens by default. Minimising
data collection is the simplest privacy protection of all: data never
collected cannot be breached, misused, or leaked.

## Examples

- A registration flow asks only for the information actually needed to
  provide the service, and explains in plain language, in the citizen's
  [chosen language](02-multilingual-by-default.md), why each sensitive
  item is required.
- Authentication and [OTP verification](../../packages/ethds-patterns/)
  follow secure-by-default patterns: clear session handling, sensible
  expiry, no leaking of whether an account exists through error messages.
- Sensitive data shown back to the citizen is minimised and masked where
  appropriate (e.g. showing only the last digits of an identifier), so a
  shoulder-surfer or a shared-device viewer can't harvest it.
- A payment flow communicates clearly what is being charged and keeps the
  citizen oriented, never obscuring the transaction.

## Anti-patterns

- **Over-collection:** gathering personal data "in case it's useful"
  rather than because the task requires it — also a violation of
  [Simple Before Powerful](05-simple-before-powerful.md).
- **Security as a final gate:** treating it as a pre-launch review instead
  of a design input, leaving structural gaps.
- **Leaky errors:** messages that reveal whether an account, ID, or record
  exists, helping attackers enumerate citizens.
- **Exposing sensitive data needlessly:** displaying full identifiers or
  personal details where a masked or partial value would do, especially
  on shared or public-area devices.
- **Opaque data use:** collecting information without telling the citizen
  what it is for.

## Implementation Guidance

- Apply **data minimisation**: collect only what the task requires, retain
  it only as long as needed, and show back only what the citizen needs to
  see. Fewer fields is more private *and*
  [simpler](05-simple-before-powerful.md).
- Tell citizens, in plain language and in their
  [own language](02-multilingual-by-default.md), what is collected and
  why, at the point of collection.
- Use the secure-default authentication, verification, and payment
  [patterns](../../packages/ethds-patterns/) rather than
  inventing bespoke security flows; the detailed **Security Policy** is
  formalised in
  [the governance docs](../governance/).
- Write error messages that don't leak the existence of accounts or
  records.
- Mask or partially reveal sensitive identifiers in the UI, mindful that
  many citizens use shared or public-area devices.
- Treat security and privacy review as part of building a service, not a
  final checkpoint — surface privacy-affecting changes through
  [RFC](../../CONTRIBUTING.md#proposing-significant-changes).
