## 2025-05-15 - [SlideDeck Keyboard Navigation]
**Learning:** Global keyboard listeners for navigation (like ArrowLeft/ArrowRight) must explicitly exclude input elements (INPUT, TEXTAREA, isContentEditable) to avoid interfering with user text entry.
**Action:** Always check `event.target` in global keydown handlers before executing navigation logic.

## 2025-05-15 - [Accessibility for Icon-only Buttons]
**Learning:** Material UI's `IconButton` requires a descriptive `aria-label` when it contains only an icon to be accessible to screen readers. In a multi-language app, these labels must be internationalized.
**Action:** Ensure all `IconButton` components have `aria-label` attributes using appropriate i18n keys.
