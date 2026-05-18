## 2025-05-15 - [MUI Tooltips and Disabled Buttons]
**Learning:** MUI Tooltips do not trigger on disabled elements because they don't emit pointer events.
**Action:** Wrap disabled buttons in a `<span>` or `<div>` to ensure the Tooltip can capture events and display correctly.

## 2025-05-15 - [ARIA labels for Icon Buttons]
**Learning:** Icon-only buttons are invisible to screen readers without descriptive labels.
**Action:** Always provide an `aria-label` to `IconButton` components, even if they have a `Tooltip`, as screen readers rely on the label for context.
