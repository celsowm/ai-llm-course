# Palette's Journal - Critical UX & Accessibility Learnings

## 2026-07-30 - Global Keyboard Event Interception & Input Focusing
**Learning:** Global window-level key listeners (like SlideDeck's `ArrowLeft`/`ArrowRight` handlers) will intercept standard user interactions inside interactive text fields (e.g., trying to move the cursor with arrow keys inside text inputs, textareas, contenteditable elements, or MUI custom input elements). This breaks basic native input behaviors.
**Action:** Always filter keydown events by checking the event's target element. If the target is an `INPUT`, `TEXTAREA`, has `isContentEditable` enabled, or is nested within a container like `.MuiInputBase-root`, prevent any global page navigation.

## 2026-07-30 - MUI Tooltips on Disabled Elements & Accessibility Shortcut Hints
**Learning:** MUI Tooltips do not trigger on disabled child elements (such as disabled `IconButton`s) because disabled elements do not fire pointer events. Furthermore, screen readers will read aloud non-verbal characters/unicode arrow symbols (like `(←)` and `(→)`) when they are included inside the `aria-label`, adding unnecessary auditory noise.
**Action:** When adding tooltips to elements that can become disabled, always wrap the child element in a generic `<span>` to preserve pointer events and trigger the tooltip. Keep the shortcut hint (e.g., `(←)`) inside the Tooltip `title`, but exclude it from the `aria-label` used by screen readers.
