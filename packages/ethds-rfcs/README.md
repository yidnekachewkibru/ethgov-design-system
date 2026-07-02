# ethds-rfcs

The archive of **Requests for Comments (RFCs)** — proposals for
significant changes to ETHDS, along with the RFC template and the record
of decisions made.

The full process (when an RFC is required, its lifecycle, roles, and what
makes a good one) is documented in
[`docs/governance/rfc-process.md`](../../docs/governance/rfc-process.md).

## Structure

```
ethds-rfcs/
├── README.md            # this file
├── template.md          # copy this to start an RFC
└── proposals/
    └── 0000-example.md  # a worked example
```

## How to file an RFC

1. Copy [`template.md`](template.md) to
   `proposals/NNNN-short-title.md` (next free `NNNN`).
2. Fill it in — problem, proposal, alternatives, accessibility &
   localization impact, migration.
3. Open a pull request adding the file. Discussion happens on the PR
   (label `rfc`).
4. After the review period and maintainer decision, the RFC is merged with
   its status (**Accepted** / **Rejected**), and updated to
   **Implemented** when the work ships.

An RFC is required for new components/patterns/templates, breaking token
or API changes, changes to the accessibility/localization standards, and
governance changes. Small fixes don't need one — see
[CONTRIBUTING.md](../../CONTRIBUTING.md#proposing-significant-changes).
