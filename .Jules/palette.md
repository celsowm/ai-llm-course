## 2025-03-01 - Global Keydown Slide Navigation Interference
**Learning:** Global keydown listeners for slide deck navigation (like ArrowLeft and ArrowRight) can intercept arrow keys, breaking text cursor navigation and editing inside text input/textarea fields placed within slides.
**Action:** Always inspect the event target in global keyboard event handlers. If the event originates from an `INPUT`, `TEXTAREA`, element with `isContentEditable`, or class `.MuiInputBase-root`, ignore the slide navigation command.

## 2025-03-01 - Material UI Tooltips on Disabled Icon Buttons
**Learning:** In Material UI, disabled buttons and icon buttons do not emit pointer/hover events, which completely blocks the associated `<Tooltip>` from appearing on hover or focus.
**Action:** Wrap any potentially disabled interactive element inside a `<span>` tag within the `<Tooltip>` to ensure tooltips reliably display to provide context or explanations for disabled states.
