## 2026-04-23 - [Accessibility: Localized tooltips and ARIA labels]
**Learning:** Icon-only buttons in a multi-language app must not only have ARIA labels but those labels must be localized. Additionally, MUI Tooltips on disabled buttons require a <span> wrapper to be interactive and accessible.
**Action:** Always destructure t from useI18n() and use it for aria-label and Tooltip titles. Ensure all layout-level interactive elements have localized labels.
