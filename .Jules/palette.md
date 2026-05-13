## 2025-05-15 - [MUI Tooltip Accessibility]
**Learning:** MUI Tooltips do not trigger on disabled buttons because disabled elements don't emit mouse events. Wrapping the button in a `<span>` or `<div>` allows the tooltip to capture these events and display correctly.
**Action:** Always wrap disabled MUI buttons with a `<span>` when using Tooltips.

## 2025-05-15 - [Descriptive Navigation Labels]
**Learning:** Using raw symbols like `<` and `>` for navigation is poor for accessibility and clarity. Localized, descriptive text (e.g., "Previous", "Next") provides a better user experience for both screen reader users and sighted users.
**Action:** Replace navigational symbols with localized descriptive text strings.
