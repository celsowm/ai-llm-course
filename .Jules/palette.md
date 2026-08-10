## 2025-05-05 - Accessible Icon Buttons and Translation Consistency
**Learning:** Icon-only buttons must always have an `aria-label` even if they have a `Tooltip`, as screen readers might not always associate the two correctly. Also, always verify that every `t()` call has a corresponding key in all locale files to prevent UI regressions.
**Action:** Use the `aria-label` attribute on all `IconButton` components and cross-reference with `src/i18n/messages.ts` during development.
