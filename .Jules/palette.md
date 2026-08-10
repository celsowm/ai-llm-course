## 2025-05-15 - [Navigation & Accessibility Polish]
**Learning:** Global keyboard event listeners (like Arrow keys for slide navigation) can interfere with user input in forms or playgrounds if they don't explicitly check the event target. Additionally, MUI Tooltips do not trigger on disabled elements because they don't fire pointer events.
**Action:** Always wrap disabled interactive elements in a `<span>` when using Tooltips, and ensure global key listeners skip execution if the `activeElement` is an input, textarea, or has `contentEditable` enabled.
