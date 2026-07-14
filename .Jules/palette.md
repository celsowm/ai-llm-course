## 2025-05-15 - Global keyboard listeners and input interference
**Learning:** Global keyboard event listeners (e.g., for slide navigation) can interfere with user input in text fields if they don't explicitly check the event target.
**Action:** Always include a target check for INPUT, TEXTAREA, isContentEditable, or the '.MuiInputBase-root' class when implementing global keyboard shortcuts to prevent intercepting intentional user typing.

## 2025-05-15 - MUI Tooltips on disabled elements
**Learning:** MUI Tooltips do not trigger on disabled elements because they don't fire pointer events.
**Action:** Wrap disabled interactive elements in a '<span>' tag when using them with a Tooltip to ensure the tooltip remains accessible even when the element is disabled.
