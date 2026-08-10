## 2025-05-15 - [Aria-labels for Icon-only buttons]
**Learning:** Icon-only buttons (like IconButton in MUI) are invisible to screen readers if they only contain a Tooltip. They must explicitly include an 'aria-label' even if a Tooltip is present, as Tooltips are often not properly linked as descriptions by default.
**Action:** Always add 'aria-label' to 'IconButton' components, ensuring the label matches the localized tooltip text.

## 2025-05-15 - [Clipboard API Security Context]
**Learning:** The 'navigator.clipboard' API is only available in secure contexts (HTTPS or localhost). In Playwright tests, using 'http://0.0.0.0' or 'http://127.0.0.1' may cause 'navigator.clipboard' to be undefined.
**Action:** Use 'http://localhost' as the base URL in Playwright tests when verifying clipboard functionality.
