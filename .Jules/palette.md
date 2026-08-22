## 2025-05-20 - Global Keydown Event Isolation for Form Inputs
**Learning:** Global keydown listeners (such as arrow key handlers for slide navigation) intercept keypresses even when user focus is inside form input fields (`<input>`, `<textarea>`, `.MuiInputBase-root`), disrupting text editing and cursor navigation.
**Action:** Always check `event.target` in global window/document keyboard handlers and return early if focus is on editable text controls or input containers.
