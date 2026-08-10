## 2025-05-15 - Global Keyboard Listener Interference
**Learning:** Global event listeners for navigation (e.g., Arrow keys) can interfere with user input in forms or interactive playgrounds if they don't explicitly check the event target. Material UI's `InputBase` components often use internal structures that might not be caught by a simple `tagName === 'INPUT'` check.
**Action:** Always guard global keyboard listeners by checking if the target is an input-like element (`INPUT`, `TEXTAREA`, `isContentEditable`) or belongs to a specific CSS class like `.MuiInputBase-root`.

## 2025-05-15 - Tooltips on Disabled Elements
**Learning:** MUI Tooltips (and many other UI libraries) rely on pointer events to trigger. Disabled elements do not fire these events, making tooltips invisible when a button is disabled.
**Action:** Wrap disabled interactive elements in a `<span>` or `<div>` so the Tooltip can capture hover/focus events on the wrapper even when the inner element is disabled.
