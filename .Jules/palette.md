## 2025-05-14 - Global Keyboard Navigation vs Form Inputs
**Learning:** Global keyboard listeners (e.g., for slide navigation) interfere with user input in `TextField` or `textarea` if they don't explicitly check the event target. Focus on `input`, `textarea`, or `isContentEditable` elements should suspend navigation shortcuts.
**Action:** Always check `event.target` in global keydown listeners. Use `target instanceof HTMLElement` and check for input-like tags or the `.MuiInputBase-root` class to ensure compatibility with component libraries like MUI.

## 2025-05-14 - Tooltips on Disabled Elements
**Learning:** Material UI Tooltips (and many other library tooltips) do not trigger on disabled elements because disabled elements do not fire pointer events.
**Action:** Wrap disabled buttons in a `<span>` and apply the Tooltip to the wrapper to ensure accessibility information (like why a button is disabled) is still reachable by mouse and screen readers.
