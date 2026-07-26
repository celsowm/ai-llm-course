## 2025-07-26 - SlideDeck Keydown Hijacking Prevention
**Learning:** Global keydown listeners for slide deck/carousel navigation (like left/right arrow keys) will hijack default cursor navigation in form inputs (like textareas or inputs) unless target checks are explicitly defined. This prevents screen readers and keyboard users from navigating text.
**Action:** Always check the event target's tag name (e.g., `INPUT`, `TEXTAREA`), the `isContentEditable` property, and component wrapper classes (such as `.MuiInputBase-root`) to bail out of global navigation events early.
