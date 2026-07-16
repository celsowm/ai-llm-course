## 2025-05-15 - Global keyboard listener vs Input focus
**Learning:** Global keyboard event listeners (e.g., for slide navigation) interfere with text entry in inputs and textareas if not properly scoped to ignore focused interactive elements.
**Action:** Always check the event target in global key listeners and return early if it's an INPUT, TEXTAREA, isContentEditable, or part of a component like MUI's TextField (using '.MuiInputBase-root').

## 2025-05-15 - Tooltips on disabled MUI Buttons
**Learning:** MUI Tooltips do not trigger on disabled buttons because they do not fire pointer events.
**Action:** Wrap disabled interactive elements in a '<span>' when using them as Tooltip triggers to ensure the tooltip is still accessible to users.
