## 2025-05-14 - [Accessibility & I18n]
**Learning:** Icon-only buttons (common in toolbars and sidebars) are invisible to screen readers without `aria-label`. MUI Tooltips on disabled buttons require a `<span>` wrapper to capture mouse events. Using abstract symbols like `<` and `>` for primary navigation is less intuitive than localized text.
**Action:** Always include `aria-label` for icon-only components, use `span` wrappers for tooltips on disabled elements, and prioritize localized text labels for key navigation actions.
