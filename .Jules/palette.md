## 2025-05-15 - [Global Keyboard Listeners]
**Learning:** When adding global keyboard listeners (e.g., for slide navigation), it's crucial to check `event.target` to avoid intercepting keys when the user is interacting with form elements like `INPUT` or `TEXTAREA`.
**Action:** Always include a check for `target.tagName` and `target.isContentEditable` in global `keydown` handlers.

## 2025-05-15 - [MUI Tooltip with Disabled Elements]
**Learning:** MUI `Tooltip` does not show on disabled elements because they don't trigger mouse events.
**Action:** Wrap disabled interactive elements (like `IconButton`) in a `<span>` or `<div>` to ensure the tooltip remains functional even when the element is disabled.
