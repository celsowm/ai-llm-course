## 2026-08-12 - MUI Tooltips with Disabled Components
**Learning:** MUI Tooltips wrapper requires pointer events to trigger on hover, but HTML/MUI disabled elements do not fire pointer/mouse events. Wrapping the disabled elements inside a `<span>` element allows the pointer events to bubble up correctly to trigger the tooltip.
**Action:** Always wrap disabled interactive components in a `<span>` element when placing them inside an MUI Tooltip.
