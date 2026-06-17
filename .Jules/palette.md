## 2024-05-23 - [Keyboard Shortcut Interference]
**Learning:** Global keyboard listeners for navigation (like SlideDeck arrow keys) often interfere with text input fields (Inputs, Textareas, MuiInputBase). Simply checking 'event.target' isn't enough; checking for 'closest(".MuiInputBase-root")' ensures compatibility with complex component libraries like Material UI.
**Action:** Always include a 'isEditableElement' check in global keydown listeners that excludes Inputs, Textareas, contentEditable, and library-specific input wrappers.

## 2024-05-23 - [Disabled Button Tooltips]
**Learning:** Material UI Tooltips do not trigger on disabled elements because they don't fire pointer events.
**Action:** Wrap disabled buttons in a '<span>' when using a Tooltip to ensure the user still receives feedback on why the action is unavailable or what the button does.
