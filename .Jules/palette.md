# Palette's Journal

## 2025-03-05 - Global keyboard listeners interfering with input controls in slide-deck structures
**Learning:** Interactive slides often listen to global keyboard events (like ArrowLeft and ArrowRight) to facilitate navigation. However, when those slides contain interactive text fields (like text areas or input controls), these global listeners intercept the arrow keys, disrupting the user's ability to navigate text cursors and severely degrading the typing experience.
**Action:** Always intercept keydown events in global slide deck listeners, check if `e.target` is an `INPUT`, `TEXTAREA`, or contains `isContentEditable` or a Material UI class like `.MuiInputBase-root`, and if so, return early to let native typing behavior function uninterrupted.
