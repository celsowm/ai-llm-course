## 2025-05-14 - Scoping Global Keyboard Listeners
**Learning:** Global keyboard listeners for navigation (e.g., arrow keys for slides) can break micro-interactions in components like "Prompt Playgrounds" or search bars by intercepting text cursor movement.
**Action:** Always include a target check in window-level keydown listeners to ignore events originating from INPUT, TEXTAREA, isContentEditable, or design-system-specific input classes (like MUI's .MuiInputBase-root).

## 2025-05-14 - Accessible Icon-Only Navigation
**Learning:** Icon-only navigation buttons lack context for screen readers and miss an opportunity to teach power users keyboard shortcuts.
**Action:** Always add an aria-label to icon-only buttons and wrap them in a Tooltip that includes both the localized action name and the keyboard shortcut hint in parentheses, e.g., "Previous (←)".
