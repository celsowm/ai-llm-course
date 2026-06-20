## 2025-01-24 - Accessible Layout Navigation
**Learning:** Icon-only buttons in the main layout (like sidebar toggles and slide navigation) are common accessibility pitfalls. Providing localized tooltips AND matching ARIA labels is essential for screen reader users and provides better visual affordance.
**Action:** When working with icon-only buttons, always ensure they have a localized `aria-label` and a `Tooltip`. Centralize these labels in the `common` i18n block for reuse across the application.
