## 2025-05-14 - [Enhance Slide Navigation Accessibility & Reliability]
**Learning:** Global keyboard event listeners (e.g., in `SlideDeck.tsx`) must include a target check for INPUT, TEXTAREA, isContentEditable, or the `.MuiInputBase-root` class to prevent intercepting navigation keys during text entry.
**Action:** Always verify if global listeners are leaking into interactive components like text fields.

**Learning:** MUI Tooltips on disabled buttons require a `<span>` wrapper because disabled elements do not fire pointer events.
**Action:** Wrap disabled buttons in a `<span>` when using Tooltips.

**Learning:** Navigation buttons ('<' and '>') must have localized `aria-label` and `Tooltip` to ensure accessibility and clear interaction feedback.
**Action:** Avoid literal symbols as labels and use localized strings.
