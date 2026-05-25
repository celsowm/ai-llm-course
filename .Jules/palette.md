## 2026-05-25 - [Tooltips on Disabled Buttons]
**Learning:** MUI `IconButton` components do not trigger mouse events when `disabled`, preventing `Tooltip` from showing.
**Action:** Wrap disabled `IconButton` in a `<span>` to capture hover events and ensure tooltips (providing context for the disabled state) are visible.
