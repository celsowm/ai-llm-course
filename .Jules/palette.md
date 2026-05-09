## 2025-05-14 - [A11y: Avoid Symbols in Navigation]
**Learning:** Using literal symbols like `<` and `>` as button content is detrimental to accessibility as screen readers may misinterpret them or fail to provide context. It also hinders localization efforts.
**Action:** Always use descriptive, localized strings for navigation controls and provide icon-only buttons with clear `aria-label` and `Tooltip` components.

## 2025-05-14 - [Testing: Ambiguous Selectors in Layout]
**Learning:** Shared layout components (like Sidebar) may render the same sub-components multiple times for different breakpoints (mobile/desktop), leading to 'strict mode' violations in Playwright when using text-based locators.
**Action:** Use specific container locators or `.filter(visible=True).first()` to target the intended interactive element in complex layouts.
