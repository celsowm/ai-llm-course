## 2025-03-12 - Localized and Accessible Navigation
**Learning:** Icon-only buttons for navigation (previous, next, collapse) lack accessibility and discoverability if they don't have tooltips and ARIA labels. Additionally, in multilingual apps, these labels must be localized to maintain a consistent experience. Using MUI Tooltips on disabled buttons requires wrapping them in a `<span>` to ensure pointer events are captured.
**Action:** Always add localized `aria-label` and `Tooltip` to icon-only buttons. Ensure disabled buttons with tooltips are wrapped in a container element.
