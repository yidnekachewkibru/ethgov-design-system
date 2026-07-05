# 9. Consistent Government Experience

> A citizen recognises a government service and knows how to use it,
> regardless of which body built it.

## Description

Services built with ETHDS share a common visual identity, navigation
model, interaction language, and tone, so that a citizen who has used one
government service can use another without relearning. Consistency spans
ministries, agencies, regional governments, and municipalities: a person
should be able to tell at a glance that a service is an official
government service, and should find that buttons, forms, errors, and
navigation behave the way they expect.

## Rationale

When every government body designs its own look and behaviour, citizens
pay the cost: they must relearn how to navigate, where to find help, and
how to trust each new site. Inconsistency also undermines trust and
safety — if official services all look different, citizens cannot reliably
distinguish a genuine government service from a fraudulent imitation, a
serious risk for services handling identity, payments, and immigration.

A consistent experience is a force multiplier for every other principle:
familiarity reduces cognitive load (helping low-literacy and first-time
users), shared components mean shared accessibility and localization, and
a recognisable government identity builds the trust that public services
require. Consistency is what makes the separate services of many
government bodies feel like one coherent, trustworthy government.

## Examples

- A citizen who has renewed a licence on a regional portal later uses a
  federal revenue service and finds the same header, the same
  [language switcher](../../packages/ethds-react/), the same form
  and button behaviour, and the same way of showing errors — nothing has
  to be relearned.
- A common government [header and footer](../../packages/ethds-react/)
  and visual identity make it immediately clear that a service is
  official, helping citizens trust it and spot impersonation.
- Status, confirmation, and error messages across different ministries
  use the same tone and structure, so their meaning is predictable.

## Anti-patterns

- **Every site its own world:** each ministry or agency inventing its own
  layout, navigation, and component behaviour, forcing citizens to
  relearn each one.
- **Inconsistent interaction language:** the same action (submit, cancel,
  go back) looking and behaving differently from one service to the next.
- **Diluting the government identity:** heavy per-agency rebranding that
  obscures the shared, recognisable government identity citizens rely on
  to trust a service.
- **Tone whiplash:** formal and bureaucratic on one service, terse and
  cryptic on another, so citizens can't predict what messages mean.

## Implementation Guidance

- Use the shared [brand system](../brand/) and
  [design tokens](../../packages/ethds-tokens/) for visual identity
  rather than per-service styling, so government services look like
  government services.
- Compose services from the standard
  [components](../../packages/ethds-react/),
  [patterns](../../packages/ethds-patterns/), and
  [templates](../../packages/ethds-templates/) so navigation and
  interaction behave consistently everywhere — this is
  [Reuse Before Building](07-reuse-before-building.md) in service of
  consistency.
- Use the common government [header and footer](../../packages/ethds-react/)
  so a service is recognisably official and harder to impersonate.
- Keep content tone and message structure (status, confirmation, error)
  consistent across services, aligned with the citizen-centred content
  guidance in [Start with Citizen Needs](01-start-with-citizen-needs.md).
- Allow appropriate identification of the specific body delivering a
  service, but within the shared identity — not by replacing it.
