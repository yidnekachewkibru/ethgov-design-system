---
"@ethds/templates": patch
---

Fix `SearchResultsPage` rendering zero `<h1>` elements, violating the template's own documented "one `<h1>` per page" accessibility requirement. Adds a translatable `heading` label (default `"Search results"`) rendered as the page's `<h1>`, independent of the result count.
