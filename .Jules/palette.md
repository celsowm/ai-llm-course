## 2026-06-04 - Fix Keyboard Navigation Interference & Improve Navigation Accessibility

**Learning:** Global keyboard event listeners (like those for slide navigation) can interfere with user input in forms or text fields if they don't check the event target. This is especially problematic in interactive slides like playgrounds. Additionally, icon-only buttons need explicit ARIA labels and tooltips for better accessibility and UX.

**Action:** Always include a target check in global `keydown` listeners to ignore events originating from inputs, textareas, or contentEditable elements. Use `aria-label` and `Tooltip` (with `<span>` wrapper for disabled states in MUI) for all icon-only navigation controls.
