## 2025-05-14 - [Accessibility & Internationalization in Navigation]
**Learning:** Icon-only buttons (like sidebar toggles and slide navigators) often lack both `aria-label` for screen readers and localized tooltips, especially when hardcoded in a primary language. Using a central i18n hook (`useI18n`) to provide both ensures a consistent, accessible experience across all supported languages.
**Action:** Always check icon-only `IconButton` components for missing `aria-label` and ensure tooltips are pulled from the i18n system instead of being hardcoded.
