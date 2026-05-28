## 2025-05-15 - [Keyboard Navigation Conflict & Disabled Tooltips]
**Learning:** Global keyboard listeners for navigation (like Arrow keys) can interfere with user input in forms. Additionally, MUI icon-only buttons need explicit ARIA labels and their Tooltips require a wrapper when the button is disabled to remain accessible.
**Action:** Always check `event.target` in global key listeners to ignore editable elements. Wrap disabled buttons in a `<span>` when using Tooltips.
