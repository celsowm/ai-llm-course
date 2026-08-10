## 2025-05-15 - [MUI Tooltips and Keyboard Accessibility]
**Learning:** MUI Tooltips do not trigger on disabled elements because they don't fire pointer events. Also, global keyboard listeners for navigation can conflict with text input if target checks are missing.
**Action:** Wrap disabled interactive elements in a `<span>` to enable tooltips. Always check `event.target` in global keyboard listeners to exclude inputs, textareas, and content-editable elements.
