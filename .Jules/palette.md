# Palette's Journal - Critical UX/Accessibility Learnings

## 2025-07-18 - Localized Navigation Controls and Interactive Tooltips
**Learning:** MUI Tooltips applied directly to disabled components (such as disabled IconButton buttons) fail to render on hover because disabled elements do not trigger pointer events. Additionally, appending keyboard shortcut hints like `(←)` and `(→)` to a button's `aria-label` causes screen readers to read non-verbal symbols, reducing accessibility.
**Action:** Wrap disabled interactive components in a `<span>` element when inside a `Tooltip` to ensure the tooltip triggers on hover. Keep keyboard shortcut hints (like `(←)`) inside the Tooltip's visual `title` while maintaining clean, non-verbal-free text in the component's `aria-label` for screen readers.
