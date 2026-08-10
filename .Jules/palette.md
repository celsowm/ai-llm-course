## 2025-05-15 - [MUI Tooltips & Accessible Stepper Labels]
**Learning:** MUI Tooltips do not trigger on disabled buttons because they don't emit pointer events. Additionally, using literal characters like '<' or '>' for navigation buttons provides a poor experience for screen readers and lacks visual clarity.
**Action:** Always wrap disabled buttons in a `<span>` or `<div>` when using a `Tooltip` to ensure the tooltip remains functional. Replace literal symbols with localized text labels (e.g., "Previous", "Next") and provide matching `aria-label` attributes for icon-only buttons.
