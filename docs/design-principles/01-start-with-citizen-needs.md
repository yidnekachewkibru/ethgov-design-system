# 1. Start with Citizen Needs

> Design decisions begin with what citizens need to accomplish, not with
> how government is organized.

## Description

Every ETHDS service is built around a real task a citizen is trying to
complete — renew a licence, pay a fee, check an application's status,
register a birth. The starting point is the citizen's goal and the words
they use for it, not the ministry's internal structure, its org chart, or
the legal name of a form. Government complexity is the government's
problem to absorb, not the citizen's problem to navigate.

This principle comes first because it governs all the others: a service
can be accessible, fast, and multilingual and still fail if it forces a
citizen to understand bureaucracy before they can act.

## Rationale

Citizens do not think in ministries. A person who needs to prove they
paid their taxes does not care whether that record lives with the Revenue
authority, a regional bureau, or a municipal office — they care about
getting the proof. When services are organised around government
structure, citizens are forced to learn that structure first, which
excludes exactly the people who most need straightforward access: those
with limited time, limited digital literacy, or limited prior contact
with government systems.

For many Ethiopians a government website is a high-stakes interaction
(immigration, revenue, education credentials) attempted on a borrowed or
low-end phone, possibly with help from a relative. The service has one
chance to be understood. Designing from the citizen's need — not the
institution's convenience — is what makes that one chance succeed.

## Examples

- A citizen lands on a regional portal and sees **"Renew your driving
  licence"** as a clear task, not **"Transport Bureau — Licensing
  Directorate — Form TB-04"**. The institutional detail is recorded
  behind the scenes; it is never a precondition for starting.
- A status-tracking page answers the question the citizen actually has —
  *"Is my permit ready?"* — in plain language (e.g. "Approved — ready for
  pickup at your kebele office") rather than echoing an internal workflow
  state code.
- Service entry points are named with the words citizens use ("pay my
  property tax"), validated against how people actually search, rather
  than the legal title of the levy.

## Anti-patterns

- **Org-chart navigation:** a homepage whose primary menu is the list of
  departments, requiring citizens to already know which department owns
  their task.
- **Jargon as the front door:** labelling a service only by its statutory
  or internal name ("Form 6B submission") with no plain-language
  equivalent.
- **Exposing internal process:** surfacing back-office workflow stages,
  case numbers, or system states that mean nothing to the citizen and
  imply they should track the bureaucracy themselves.
- **Designing for the edge case first:** building the flow around the rare
  complicated scenario, making the common simple case harder for everyone.

## Implementation Guidance

- Name every service and entry point after the citizen's task, in the
  citizen's words. Keep institutional names as secondary metadata, not
  primary labels.
- Write all citizen-facing text — including status messages, errors, and
  confirmations — in terms of what the citizen can now do or must do next,
  not what the system did internally. This connects directly to the
  content guidance in the
  [government service patterns](../phases/phase-8-government-service-patterns.md).
- Map the real user journey before choosing components. The
  [service patterns](../phases/phase-8-government-service-patterns.md)
  package documents journeys (Application Submission, Status Tracking,
  Payment, etc.) starting from citizen intent — reuse those rather than
  modelling your back-office process.
- Validate naming and flow with how citizens actually search and speak,
  across the [supported languages](02-multilingual-by-default.md) — the
  citizen's words differ by language, not just by translation.
- When organisational structure and citizen need conflict, the citizen
  need wins. Absorb the complexity in the implementation.
