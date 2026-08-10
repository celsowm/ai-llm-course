## 2026-05-29 - [Keyboard shortcut safety in interactive components]
**Learning:** Global keyboard listeners for navigation (like slide changes) can interfere with user input in forms if not properly scoped or filtered.
**Action:** Always check `event.target` in global keydown listeners to ensure the user isn't currently focused on an `input`, `textarea`, or `contentEditable` element.

## 2026-05-29 - [MUI Tooltips on disabled buttons]
**Learning:** Material UI Tooltips do not show up when their child element is a disabled `Button` or `IconButton` because these elements don't trigger mouse events.
**Action:** Wrap disabled interactive elements with a `<span>` to allow the Tooltip to capture the hover event and display correctly.
