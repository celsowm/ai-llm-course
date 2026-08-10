## 2025-05-15 - [I18n Object Retrieval vs. Common Keys]
**Learning:** The `tm` hook (retrieve messages) for feature-specific label objects does not automatically include or merge global 'common' keys. If a component uses a Record-based labeling system (like `TrainingControls`), common UI strings (Step, Next, Previous) must be explicitly merged or accessed via `t`.
**Action:** When initializing localized label objects for complex components, explicitly spread common keys if they are needed alongside domain-specific strings to ensure consistent accessibility labels across the app.
