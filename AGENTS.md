<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Guardrails

Primary product context source: `context/execute_context.md`

Non-negotiable implementation rules:

- Use shadcn-style components from `src/components/ui` for interactive UI controls.
- Do not introduce native `<button>`, `<input>`, `<select>`, or `<textarea>` in feature code.
- Native form elements are only allowed inside `src/components/ui` wrappers.
- Keep comments in code in English.
- Preserve MVP scope discipline: prioritize adherence/consistency flows and avoid out-of-scope features.
