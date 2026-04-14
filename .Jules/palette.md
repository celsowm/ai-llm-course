## 2026-04-14 - MUI Tooltips on Disabled Buttons
**Learning:** MUI Tooltips do not display on disabled components because they don't trigger mouse events. To show a tooltip for a disabled button, the button must be wrapped in a non-disabled element like a `<span>`.
**Action:** Always wrap disabled `IconButton` or `Button` components in a `<span>` when using them inside a `Tooltip` to ensure accessibility feedback is provided even in a disabled state.
