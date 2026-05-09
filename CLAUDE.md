# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. Plan with Codex, Verify with Sub-Agents

**Don't plan or self-verify alone.**

- **Planning:** for any non-trivial task, produce the plan via codex CLI. Do not plan inline.
  ```
  codex exec --sandbox read-only "Plan: <task>. Output a numbered, step-by-step plan with success criteria for each step."
  ```
  Then follow the plan codex returns. If you disagree with it, push back to the user before deviating.

- **Verification:** every piece of progress must be verified by a sub-agent (via the `Agent` tool) before being claimed done. Pick the agent type that matches the verification (e.g. `Explore` for "did this file/symbol get added?", `general-purpose` for end-to-end checks). Never rely on your own assessment of completion.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

## Project documentation

Read the relevant doc in `./docs/` before working in that area:

- `./docs/Business.md` — brand, products, audience, commerce policies
- `./docs/Project.md` — tech stack and project conventions
- `./docs/System_Design.md` — system architecture
- `./docs/Design.md` — visual design, UI, UX
- `./docs/deploy.md` — deployment
- `./docs/email.md` — email automations & lifecycle programs

Keep this index and the docs themselves current:
- When a change affects what's written in a doc, update the doc in the same change.
- When you add a new file under `./docs/`, add it to this list in the same change — docs not indexed here won't be loaded into future sessions.
