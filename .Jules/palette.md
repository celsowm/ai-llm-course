## 2025-07-29 - Global Keyboard Listener Input Interference
**Learning:** Global keyboard event listeners (like slide deck Arrow key listeners) will intercept navigation keypresses even when user focus is inside form fields, breaking native cursor controls and standard typing behaviors.
**Action:** Always check the event target against inputs, textareas, elements with contenteditable, or framework input classes (like MUI's `.MuiInputBase-root`) in global keyboard listeners and return early if matches are found.
