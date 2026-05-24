## 2025-05-15 - Improving Stepper Accessibility with Localized Labels

**Learning:** Using literal symbols like `<` and `>` for navigation buttons is detrimental to accessibility as they provide no semantic meaning to screen readers and cannot be localized. Replacing them with descriptive text labels ("Previous", "Next") alongside icons significantly improves both the user experience and internationalization support.

**Action:** Always use descriptive, localized text labels for navigation controls instead of raw characters. Ensure all icon-only buttons have localized tooltips and appropriate ARIA labels when text is not visible.
