# 6. Design for Low Bandwidth

> Services work on slow, metered, and unreliable connections, because that
> is the reality across Ethiopia.

## Description

ETHDS services are built to load quickly and work usably on slow,
intermittent, and expensive connections — 2G/3G, congested mobile data,
and links that drop mid-task. Pages are light, assets are minimal and
optimised, and the core task degrades gracefully rather than failing when
the network is poor. Low bandwidth is treated as the expected condition,
not an edge case.

## Rationale

Connectivity across much of Ethiopia is slow, intermittent, and paid for
by the megabyte. A heavy government page doesn't just load slowly — it
costs the citizen real money in data, drains a limited prepaid balance,
and may never finish loading at all on a congested 2G link. For a citizen
on a tight budget, a bloated service is effectively a closed door.

Designing for low bandwidth is an equity issue: the citizens least able
to absorb a slow, expensive, heavy service are often those who most need
government services to work. It is also a resilience issue: a service that
assumes a fast, stable connection breaks in exactly the conditions where
people are relying on it. Keeping things light benefits everyone — fast
connections get instant pages, slow connections get usable ones.

## Examples

- A service's first meaningful screen loads within a few seconds on a 3G
  connection, because the page weight is small and the critical content
  is prioritised.
- A multi-step form preserves entered data if the connection drops
  between steps, so a citizen on an unreliable link doesn't lose their
  work and have to start over.
- Images are compressed and appropriately sized for a phone, decorative
  media is kept minimal, and essential information is delivered as light
  HTML text rather than as a heavy image or a large PDF.

## Anti-patterns

- **Heavy pages:** large JavaScript bundles, uncompressed images,
  autoplaying video, or web fonts loaded with no regard for weight.
- **Data-loss on drop:** flows that discard a citizen's input if the
  connection fails mid-task, forcing a costly restart.
- **Essential content as heavy media:** putting key information only in a
  large image of text or a multi-megabyte PDF the citizen must download.
- **Assuming the connection is fast and stable:** no loading states, no
  graceful handling of slow or failed requests.

## Implementation Guidance

- Keep pages light. Respect the bundle-size and page-weight budgets set
  for [design tokens](../../packages/ethds-tokens/) and
  [components](../../packages/ethds-react/); the lean, mobile
  baseline from [Mobile First](03-mobile-first.md) directly supports this.
- Optimise and right-size all assets; compress images, avoid heavy or
  autoplaying media, and deliver essential information as text, not as an
  image of text or an unnecessary PDF.
- Design flows to tolerate interruption — preserve in-progress input
  across steps so a dropped connection doesn't destroy the citizen's
  work. This is reflected in the
  [service patterns](../../packages/ethds-patterns/).
- Provide clear loading and error states so a slow or failed request is
  understandable, not a frozen blank screen.
- Test under realistic conditions — throttled 2G/3G on a low-end device —
  not just on a fast office connection. The
  [reference implementations](../../packages/ethds-examples/)
  are reviewed under simulated low-bandwidth conditions.
