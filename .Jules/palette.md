## 2025-05-14 - [A11y/UX] Global keyboard navigation vs input focus
**Learning:** Global keyboard listeners for slide navigation (ArrowLeft/ArrowRight) interfere with text entry in multiline TextFields (Prompt Playground), preventing users from moving the text cursor.
**Action:** Always check `event.target` in global key listeners and ignore navigation keys if the focus is on `INPUT`, `TEXTAREA`, or elements with `isContentEditable`.

## 2025-05-14 - [A11y] Tooltips on disabled buttons
**Learning:** MUI Tooltips do not trigger on disabled elements because they do not fire pointer events.
**Action:** Wrap disabled buttons in a `<span>` to ensure tooltips still appear, providing necessary context for why an action is unavailable.
