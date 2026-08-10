## 2025-05-14 - [Accessibility] Tooltips for Disabled Buttons
**Learning:** MUI Tooltips do not trigger on disabled elements because they don't fire pointer events.
**Action:** Wrap disabled interactive elements in a `<span>` to allow the Tooltip to capture hover and focus events, ensuring the user receives feedback/explanation even when the action is unavailable.
