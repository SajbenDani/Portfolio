# Lessons

Format: `[date] | what went wrong | rule to prevent it`

- [2026-06-10] | Initial upgrade plan didn't reference the project CLAUDE.md / code-review-graph workflow (file was added mid-planning) | Re-check the repo root for CLAUDE.md / workflow files immediately before finalizing any plan, and honor the graph-first workflow explicitly.
- [2026-06-10] | Drafted stats strip with stale resume claims ("4+ years", "Top 50 WiDS" — no longer true) inferred from repo data | Never infer factual career claims from repo content alone; confirm numbers with the owner before displaying them.
- [2026-06-10] | `code-review-graph` crashed decoding a UTF-8 git diff under Windows cp1250, corrupting graph.db mid-transaction ("cannot start a transaction within a transaction" on every later run) | Always run code-review-graph with `$env:PYTHONUTF8='1'` on this machine; if the nested-transaction error appears, delete `.code-review-graph/graph.db` and run `code-review-graph build`.
