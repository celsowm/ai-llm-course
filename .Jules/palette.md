## 2026-05-23 - Prevent Keyboard Navigation Interference
**Learning:** Global keyboard event listeners for navigation (like ArrowRight/ArrowLeft for slides) must be guarded against interactive elements (INPUT, TEXTAREA, contentEditable) to prevent accidental navigation while typing.
**Action:** Always include a check for the event target's tag name or `isContentEditable` property in global keyboard listeners.
