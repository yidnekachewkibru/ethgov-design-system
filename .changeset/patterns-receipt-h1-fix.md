---
"@ethds/patterns": patch
---

Fix `Receipt` rendering zero `<h1>` elements — its success confirmation used an `Alert`, whose `title` renders as a styled `<p>`, not a heading, despite the pattern's own doc describing it as "the page's primary heading". Adds a translatable `heading` label (default `"Payment receipt"`) rendered as a real `<h1>`, independent of the `Alert`'s `role="status"` announcement.
