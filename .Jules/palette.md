## 2026-04-19 - [Keyboard Navigation & Accessibility Polish]
**Learning:** Global keyboard listeners for navigation must explicitly ignore events from editable elements (INPUT, TEXTAREA, isContentEditable) to prevent disruptive UX during data entry. Icon-only buttons in MUI should be wrapped in a span/div when disabled to ensure Tooltips remain functional.
**Action:** Always include a target check in window-level keydown listeners and use the span-wrapper pattern for Tooltips on potentially disabled buttons.
