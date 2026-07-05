# @ethds/templates

## 0.2.0

### Minor Changes

- 02873a3: First publishable release of `@ethds/templates`: tested React compositions for all 12 documented page templates (National Portal, Ministry, and Agency homepages; Service Landing, Service Application, Search Results, News listing + article, and Contact pages; Citizen Dashboard; 404, 403, and 500 error pages). The Service Application Page hosts the `@ethds/patterns` Application Submission flow, which becomes a real dependency of this package.

### Patch Changes

- fd3c30d: Fix `SearchResultsPage` rendering zero `<h1>` elements, violating the template's own documented "one `<h1>` per page" accessibility requirement. Adds a translatable `heading` label (default `"Search results"`) rendered as the page's `<h1>`, independent of the result count.
- Updated dependencies [fd3c30d]
- Updated dependencies [0eea372]
  - @ethds/patterns@0.2.0
