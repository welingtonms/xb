# Composite controls submit through Members, not the host

**Select**, **Radio group**, and **Toggle group** hosts are not form-associated. Each **Member** (`xb-option`, `xb-radio`, `xb-toggle`) calls `setFormValue` when selected, copying `name` from the host. We rejected making the host form-associated with a single `setFormValue` because it would fight **Disclosure** composition on **Select**, require careful migration of FormData semantics, and duplicate the pattern already proven by integration tests.

**Considered:** Host-associated composite with one FormData entry — cleaner model, higher risk to **Select** + combobox and existing `FormData` expectations.
