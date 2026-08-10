## 2025-05-14 - [Navigation accessibility and localization]
**Learning:** Icon-only buttons without ARIA labels are invisible to screen readers, and literal symbols like '<' or '>' in buttons are cryptic for both accessibility and general UX. Centralizing navigation keys (previous, next, expand, collapse) in i18n messages ensures consistency across components like steppers and layout controls.
**Action:** Always provide `aria-label` for icon buttons and replace literal navigation symbols with localized text or descriptive labels. Use common i18n keys for shared UI actions.
