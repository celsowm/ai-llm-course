# Palette's Journal - UX & Accessibility Learnings

## 2025-05-15 - [Keyboard Navigation Interference]
**Learning:** Global keyboard event listeners (like those for slide navigation) can accidentally intercept keystrokes intended for form inputs (like the Prompt Playground), leading to a frustrating user experience where typing moves the slide instead of entering text.
**Action:** Always include a check for the event target (e.g., `INPUT`, `TEXTAREA`, or `isContentEditable`) in global keyboard event handlers to ensure they only fire when appropriate.
