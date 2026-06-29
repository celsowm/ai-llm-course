## 2025-05-14 - Keyboard navigation interference with input fields
**Learning:** Global event listeners for navigation (like ArrowRight/ArrowLeft for slides) can break standard input behavior (moving the text cursor) if they don't explicitly exclude input targets.
**Action:** Always check `event.target` in global keyboard listeners to ensure they don't intercept keys when the user is interacting with form elements or contentEditable areas.

## 2025-05-14 - Tooltips on disabled elements
**Learning:** MUI Tooltips rely on pointer events which are disabled on `disabled` elements, making the tooltip inaccessible.
**Action:** Wrap disabled buttons in a `<span>` when adding tooltips to ensure the tooltip remains accessible even when the action is unavailable.
