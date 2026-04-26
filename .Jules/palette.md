## 2025-05-15 - [Scoped Keyboard Navigation]
**Learning:** Global keyboard listeners (like arrow keys for slide navigation) can interfere with user input in interactive components (Playground/Inputs).
**Action:** Always check `e.target` in global keyboard listeners to ensure the user isn't currently typing in an `input`, `textarea`, or `contentEditable` element.

## 2025-05-15 - [Accessible Icon Buttons]
**Learning:** Icon-only buttons in the navigation header are invisible to screen readers and lack visual context for some users.
**Action:** Always wrap icon-only buttons in a `Tooltip` and provide a descriptive `aria-label`.

## 2025-05-15 - [Localization of Navigation Symbols]
**Learning:** Using literal symbols like `<` and `>` for "Previous" and "Next" buttons is poor for accessibility and doesn't adapt to different languages.
**Action:** Use localized text labels from the i18n system even for simple directional buttons.
