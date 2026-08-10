## 2025-05-15 - [A11y/UX] Prevent keyboard navigation conflicts in text inputs
**Learning:** Global keyboard event listeners (e.g., for slide navigation) can interfere with native browser behaviors in form elements like `TextField`. Users expect arrow keys to move the text cursor, not navigate the app.
**Action:** Always include a target check in global `keydown` listeners to ignore events originating from `INPUT`, `TEXTAREA`, `isContentEditable`, or specific design system input wrappers (like `.MuiInputBase-root`).

## 2025-05-15 - [A11y] Tooltips on disabled buttons
**Learning:** MUI `IconButton` components do not fire pointer events when disabled, which prevents `Tooltip` from showing.
**Action:** Wrap disabled buttons in a `<span>` to allow the `Tooltip` to capture hover events even when the underlying button is inactive.
