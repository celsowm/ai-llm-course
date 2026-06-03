## 2025-05-14 - Localized tooltips for disabled buttons
**Learning:** MUI Tooltips do not trigger on disabled elements because they don't emit pointer events. Wrapping the disabled element in a `<span>` or `<div>` allows the tooltip to function correctly.
**Action:** Always use a `<span>` wrapper when adding a Tooltip to a Button that can be disabled.
