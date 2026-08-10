## 2025-05-14 - [MUI Tooltips and Keyboard Navigation Isolation]
**Learning:** MUI Tooltips do not trigger on disabled elements because they don't emit mouse events. Additionally, global keyboard listeners for navigation (e.g., arrow keys) can interfere with user input in forms if not properly isolated.
**Action:** Always wrap disabled buttons in a `<span>` when using Tooltips. In global key listeners, check if `event.target` is an input, textarea, contentEditable, or has the `.MuiInputBase-root` class before executing navigation logic.
