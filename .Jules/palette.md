## 2025-05-15 - [Accessible Tooltips for Disabled Controls]
**Learning:** MUI Tooltips do not display when their child element (like a Button) is disabled because the button stops emitting mouse events. Wrapping the disabled button in a `<span>` allows the Tooltip to capture those events and still show.
**Action:** Always wrap disabled interactive elements in a `<span>` or `<div>` when using MUI Tooltips to ensure consistent feedback (e.g., explaining why a 'Next' button is disabled at the end of a sequence).
