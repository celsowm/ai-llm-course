## 2025-06-19 - [Global Keyboard Listeners vs Form Inputs]
**Learning:** Global keyboard event listeners (like those used for slide navigation) can unintentionally intercept keystrokes when a user is interacting with form elements (INPUT, TEXTAREA) or contentEditable areas. This breaks standard text editing behaviors (like using arrow keys to move the cursor).
**Action:** Always include a target check in global `keydown` listeners to ignore events originating from interactive text elements or components with the `.MuiInputBase-root` class.

## 2025-06-19 - [Tooltip accessibility for disabled elements]
**Learning:** MUI Tooltips do not trigger on disabled elements because they do not fire pointer events.
**Action:** Wrap disabled interactive elements in a `<span>` to ensure the Tooltip remains functional and accessible.
