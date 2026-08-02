## 2025-05-18 - Global Keyboard Listeners and Text Fields Interruption
**Learning:** Global keydown event listeners used for slide deck pagination (e.g., using ArrowLeft or ArrowRight) can intercept native cursor movements inside multiline inputs like text areas. This causes unexpected screen changes when users attempt to navigate text they are writing.
**Action:** Always inspect the event's target element inside global keydown listeners to bypass navigation triggers when the active element is an input, textarea, isContentEditable, or styled input component (like MUI's InputBase).
