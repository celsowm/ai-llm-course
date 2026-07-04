## 2025-05-14 - Global Keyboard Navigation Conflicts
**Learning:** Global keyboard listeners for navigation (e.g., Left/Right arrows for slides) can break user experience in form elements like textareas if they don't explicitly check the event target. This is especially critical in "playground" features where users expect standard text editing behavior.
**Action:** Implement a target check (INPUT, TEXTAREA, isContentEditable) in all global keyboard event handlers to ensure they only trigger when the user is not actively typing.
