## 2026-04-21 - [Accessibility and Localization of Navigation Controls]
**Learning:** Icon-only buttons and buttons with cryptic symbols (e.g., `<` and `>`) create barriers for screen reader users and can be confusing. Centralizing these labels in the i18n system ensures consistency and accessibility across components.
**Action:** Always use localized strings for button text and provide `aria-label` for icon-only buttons using the `useI18n` hook.
