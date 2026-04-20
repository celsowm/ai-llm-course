## 2025-05-15 - [Accessibility: Tooltips on Disabled Buttons]
**Learning:** MUI Tooltips do not trigger on disabled elements because they do not emit pointer events.
**Action:** Always wrap disabled buttons in a `<span>` or `<div>` when using a Tooltip to ensure the tooltip is still accessible to the user.
