## 2026-04-17 - Keyboard Shortcuts vs Input Focus
**Learning:** Global keyboard listeners for navigation (like SlideDeck's ArrowLeft/ArrowRight) can interfere with user input in forms or interactive components. Always check if the event target is an input-like element before triggering global actions.
**Action:** Implement target checks (`INPUT`, `TEXTAREA`, or `isContentEditable`) in all global keydown listeners.

## 2026-04-17 - Tooltips on Disabled MUI Buttons
**Learning:** Material UI (MUI) Tooltips do not trigger on disabled elements because they don't emit pointer events.
**Action:** Wrap disabled interactive elements (like buttons) in a `<span>` or `<div>` to ensure tooltips remain functional and accessible.
