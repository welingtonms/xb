# Cursor rule template for XB consumers

Copy into your app repo:

```bash
mkdir -p .cursor/rules
cp node_modules/@welingtonms/xb/examples/cursor-rule/xb-components.mdc .cursor/rules/
```

Or copy from this path in the xb monorepo before the package is installed:

```bash
cp examples/cursor-rule/xb-components.mdc /path/to/your-app/.cursor/rules/
```

Customize `alwaysApply` or add app-specific register imports in a comment if needed.
