## 2025-05-15 - Keyboard Shortcut Suppression for Inputs
**Learning:** Global keyboard listeners for navigation (e.g., arrow keys for slides) interfere with text entry in multiline inputs and complex MUI components. Standard checks for `INPUT` or `TEXTAREA` may fail if the focus is on a container like `.MuiInputBase-root`.
**Action:** Use `e.target.closest('input, textarea, [contenteditable="true"], .MuiInputBase-root')` to robustly suppress global shortcuts when the user is interacting with any text entry field.

## 2025-05-15 - Tooltips on Disabled MUI Buttons
**Learning:** Material UI Tooltips do not trigger on disabled elements because they don't emit pointer events. This leaves users confused about why a button is inactive.
**Action:** Wrap disabled `IconButton` or `Button` components in a `<span>` or `<div>`. The wrapper will capture the mouse events and allow the Tooltip to display correctly even when the underlying button is disabled.
