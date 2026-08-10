## 2025-05-15 - [Keyboard Navigation & Accessibility Polish]
**Learning:** Global arrow key listeners in `SlideDeck.tsx` interfere with cursor movement in text inputs (like Prompt Playground). Always check `e.target` for input types or `.MuiInputBase-root` before triggering navigation.
**Action:** Use a guard clause in keydown listeners to ignore events originating from inputs, textareas, or content-editable elements.

**Learning:** MUI Tooltips on disabled buttons require a `<span>` wrapper to correctly capture mouse events and display.
**Action:** Always wrap `<IconButton disabled>` in a `<span>` when using it inside a `<Tooltip>`.
