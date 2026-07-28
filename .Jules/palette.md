# Palette's Journal - Critical Learnings Only

## 2025-03-08 - Preventing Navigation Conflict
**Learning:** Global key event listeners for slide navigation can hijack keys when a user is interacting with text controls like a multiline TextField. Any global arrow key or keyboard listener should verify if the target of the event is inside an input, textarea, or a component with MuiInputBase.
**Action:** Always check the event target's tagName (e.g., 'INPUT', 'TEXTAREA') or classes (e.g., '.MuiInputBase-root') before invoking general navigation/shortcut callbacks.
