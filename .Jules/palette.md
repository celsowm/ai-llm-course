## 2026-06-16 - Prevent Keyboard Hijacking in Slide Navigation
**Learning:** Global keyboard event listeners for navigation can interfere with user input in forms if they don't explicitly check the event target.
**Action:** Always include a target check for `INPUT`, `TEXTAREA`, `isContentEditable`, or framework-specific input classes (like MUI's `.MuiInputBase-root`) in global `keydown` listeners.

## 2026-06-16 - Redundant Tooltips and ARIA Labels
**Learning:** MUI Tooltips and ARIA labels on the same icon-only button ensure that both sighted keyboard users and screen reader users have a consistent experience.
**Action:** Wrap icon-only `IconButton` components in a `Tooltip` and provide a matching `aria-label` to the button.
