## 2025-05-11 - Localized ARIA labels and Tooltips for navigation
**Learning:** Icon-only buttons in a multilingual app require both localized `aria-label` and `Tooltip`. When buttons can be disabled, they must be wrapped in a `<span>` for the Tooltip to trigger. Missing translation keys can cause broken labels.
**Action:** Always verify all new i18n keys are added to all supported locales. Use `<span>` wrappers for Tooltips on potentially disabled buttons. Use Playwright to verify localized tooltips by switching languages in the test script.
