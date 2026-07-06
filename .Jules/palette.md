## 2025-05-15 - Improving navigation accessibility and keyboard safety
**Learning:** Global keyboard listeners for navigation (like Arrow keys in a SlideDeck) can interfere with user input in forms or text fields if they don't explicitly check the event target.
**Action:** Always verify if `event.target` is an `INPUT`, `TEXTAREA`, or has `isContentEditable` before intercepting common keys like Arrows, Space, or Enter in global listeners.
