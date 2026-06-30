# Logo & Emblem Usage

A consistent, correctly-used government identity is what lets a citizen
trust that a service is genuinely official — a key defence against
impersonation, and a direct expression of
[Consistent Government Experience](../design-principles/09-consistent-government-experience.md).
This page defines how government logos and the national emblem are used in
ETHDS services.

> **Note on assets.** ETHDS defines *usage rules*. The official Government
> of Ethiopia emblem and ministry/agency logos are controlled by the
> respective bodies and are not redistributed in this open-source
> repository. Teams obtain approved logo assets through official channels
> and apply them per these rules.

## Placement

- The government identity (emblem + service/organisation name) sits in the
  **header**, top-left in left-to-right layouts, and is the first thing a
  citizen sees. It is provided by the standard
  [Header component](../phases/phase-7-core-components.md).
- The header logo links to the service home (or the relevant government
  home), a consistent, expected behaviour.
- A footer may carry a secondary, smaller identity and links to the wider
  government estate.

## Clear Space & Minimum Size

- Maintain **clear space** around the logo of at least the height of the
  emblem's primary element on all sides; keep other content and edges out
  of this zone.
- Respect a **minimum size** that keeps the emblem legible — on
  [mobile](../design-principles/03-mobile-first.md), the header identity
  must remain recognisable and its details not collapse into noise. Use a
  simplified mark at small sizes if an official simplified variant exists.

## Colour Use

- Use the official emblem colours on a clear background. When placing on a
  coloured surface, use an approved single-colour (reversed/mono) variant
  rather than recolouring the emblem arbitrarily.
- Ensure the logo and any accompanying wordmark meet contrast against
  their background (see [accessibility-analysis.md](accessibility-analysis.md));
  a logo that is also a link/control follows non-text contrast (3:1).
- Provide an accessible name for the logo link (e.g. "Government of
  Ethiopia — home") in the citizen's
  [active language](../design-principles/02-multilingual-by-default.md).

## Misuse — Do Not

- Do **not** stretch, distort, rotate, or recolour the emblem.
- Do **not** add effects (shadows, gradients, outlines) to the emblem.
- Do **not** place the emblem on a busy background or one with
  insufficient contrast.
- Do **not** recreate, approximate, or substitute the emblem with a
  look-alike.
- Do **not** crowd the emblem — respect its clear space.
- Do **not** use the national emblem to imply official endorsement of a
  service that is not official.

## Co-branding

When a service is delivered by a specific ministry, agency, regional, or
municipal body, that body is identified **within** the shared government
identity — not by replacing it. The hierarchy is: national government
identity first, delivering body second. See
[government-branding-standards.md](government-branding-standards.md) for
how this works across the different levels of government.
