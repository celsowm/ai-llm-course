## 2025-05-15 - Improving Slide Navigation Accessibility
**Learning:** MUI Tooltips on disabled buttons do not fire pointer events. Wrapping them in a `<span>` ensures the tooltip is displayed even when the button is inactive, which is crucial for communicating why a navigation action is unavailable.
**Action:** Always wrap disabled interactive elements in a `<span>` when using Tooltips.

## 2025-05-15 - Keyboard Navigation Interference
**Learning:** Global arrow key listeners for slide navigation can break text entry in multi-line inputs if they don't explicitly check the event target. Checking for `input`, `textarea`, or `isContentEditable` prevents this micro-UX regression.
**Action:** Include a target check in global keyboard listeners to ignore events originating from editable elements.
