## 2025-05-15 - [Keyboard Navigation Interference]
**Learning:** Global keyboard event listeners (like for slide navigation) must check the event target. If the user is focused on an input, textarea, or a contentEditable element, navigation keys should be ignored to allow natural text entry.
**Action:** Always include a target check in `keydown` listeners: `if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;`

## 2025-05-15 - [Accessible Navigation Buttons]
**Learning:** Icon-only navigation buttons are more accessible and user-friendly when paired with tooltips that include keyboard shortcut hints (e.g., "Next (→)").
**Action:** Use `Tooltip` with a descriptive title including the shortcut, and ensure the button has a matching `aria-label`. Wrap `IconButton` in a `<span>` when used inside a `Tooltip` to ensure the tooltip works even when the button is disabled.
