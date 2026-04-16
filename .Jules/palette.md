## 2025-05-15 - [Safe Global Keyboard Listeners]
**Learning:** When adding global keyboard listeners (e.g., for slide navigation), it's crucial to verify if the user is currently interacting with an input, textarea, or content-editable element to avoid intercepting intended text entry.
**Action:** Always check `document.activeElement` for `HTMLInputElement`, `HTMLTextAreaElement`, or `isContentEditable` before executing keyboard-driven actions.
