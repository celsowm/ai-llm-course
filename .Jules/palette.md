## 2026-04-18 - [Accessibility & Keyboard Hygiene]
**Learning:** Global keyboard event listeners (like for slide navigation) should always check if the user is currently focused on an input element (INPUT, TEXTAREA, or contenteditable) to avoid intercepting keys during text entry. Additionally, MUI Tooltips on disabled buttons require a `<span>` wrapper to correctly capture hover events.
**Action:** Always include a focus check in `keydown` listeners and use the `<span>` wrapper pattern for Tooltips on potentially disabled IconButton components.
