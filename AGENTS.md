# Preferences (personal)

_More recent preferences take precedence. Repo-specific conventions (AGENTS.md, CLAUDE.md) override these._

## Programming

- **colocate-single-use-helpers**: Helper files used in only one place should be colocated with their consumer in the same directory, not left in a shared lib/ folder. Shared folders should only contain code used by multiple consumers. [●○○○○] (critical, 2026-03-15)
- **bun-over-node**: Always uses Bun as the JavaScript runtime; Node.js and npx are explicitly banned [●○○○○] (critical, 2026-03-13)
- **vite-only-bundler**: Always uses Vite as the build tool; webpack, turbopack, and other bundlers are rejected [●○○○○] (critical, 2026-03-13)
- **biome-formatting-style**: Uses Biome exclusively for linting/formatting with tabs, double quotes, semicolons, trailing commas, 120 char width; no ESLint or Prettier [●○○○○] (critical, 2026-03-13)
- **maximum-typescript-strictness**: Enforces maximum TypeScript strictness with no `as` casts, no `any`, and no non-null assertions [●○○○○] (critical, 2026-03-13)
- **prove-code-works**: Believes the job of a software engineer is to deliver code proven to work, not just write code — values demonstrations and artifacts over just passing tests. [●○○○○] (critical, 2026-03-13)
- **strict-typescript**: Maximum TypeScript strictness: strict true plus all extra flags, no as casts, no any, no non-null assertions [●○○○○] (critical, 2026-03-13)
- **no-overengineering**: Strongly avoids over-engineering: no premature abstractions, no feature flags for simple changes, no error handling for impossible scenarios — three similar lines is better than a premature abstraction [●○○○○] (critical, 2026-03-13)
- **ai-bias-is-bugs**: Strongly believes AI bias should be treated as software bugs to be fixed, not inherent features to be rationalized away [●○○○○] (critical, 2026-03-13)
- **parsimony-of-concepts**: Strongly values parsimony of concepts in language/system design — reusing the same patterns across subsystems rather than introducing new mechanisms [●○○○○] (critical, 2026-03-13)
- **predictable-cost-model**: Wants runtime costs (like refcount operations) to be easily understandable from just looking at the code, even if it means less optimal schemes [●○○○○] (critical, 2026-03-13)
- **biome-over-eslint-prettier**: Uses Biome exclusively for linting and formatting with tabs, double quotes, semicolons, trailing commas, 120 char width [●○○○○] (critical, 2026-03-13)
- **ban-t3-env**: Explicitly bans @t3-oss/env-* packages, uses custom @ulnd/env wrapper with Zod instead [●○○○○] (critical, 2026-03-13)
- **constraints-over-vibes**: Believes explicit constraints, oracles (tests/benchmarks), and curated context are essential for effective coding agent use — vague prompts produce 'vibe-shaped completions' [●○○○○] (critical, 2026-03-13)
- **anti-premature-optimization**: Considers premature optimization instinct completely killed — wants to accomplish the immediate task pragmatically without over-engineering [●○○○○] (critical, 2026-03-12)

## Tooling

- **biome-over-eslint**: Uses Biome exclusively for linting and formatting with tabs, double quotes, semicolons, trailing commas, 120 char width — no ESLint or Prettier [●○○○○] (critical, 2026-03-13)
- **custom-cli-j**: Built and heavily uses a personal CLI tool called 'j' for project switching, dotfiles management, repo knowledge, and automation [●○○○○] (critical, 2026-03-13)
- **claude-code-primary-ai**: Uses Claude Code as primary AI coding assistant and has built extensive skills and workflows around it [●○○○○] (critical, 2026-03-13)
- **indent-two-spaces**: Always use 2 spaces for indentation, never tabs. Applies to all file types and all projects. [●○○○○] (critical, 2026-03-12)
- **no-t3-env**: Never use @t3-oss/env-nextjs or @t3-oss/env-core — uses custom @ulnd/env wrapper with Zod instead [●○○○○] (critical, 2026-03-12)
- **vite-over-webpack**: Always uses Vite as the build system — for plain apps and when a framework (Next.js etc.) is needed. Never webpack or turbopack. [●○○○○] (critical, 2026-03-12)
- **bun-exclusively**: Use Bun as the exclusive JavaScript runtime — never Node.js or npx [●○○○○] (critical, 2026-03-11)
- **bun-runtime-only**: Uses Bun exclusively as the JavaScript runtime, never Node.js or npx — all scripts, spawns, and package commands go through bun/bunx [●○○○○] (critical, 2026-03-11)
- **bun-over-node**: Exclusively uses Bun as the JavaScript/TypeScript runtime, never Node.js or npx [●○○○○] (critical, 2026-03-11)
- **bun-runtime**: Uses Bun exclusively as the JavaScript runtime — never Node.js or npx. [●○○○○] (critical, 2026-03-11)
- **bun-runtime-exclusive**: Uses Bun exclusively as the JavaScript/TypeScript runtime — never Node.js or npx [●○○○○] (critical, 2026-03-10)
- **sqlite-primary-database**: SQLite is the primary data store for all application state, accessed via Kysely query builder [●○○○○] (critical, 2026-03-10)
- **sqlite-kysely-stack**: Uses SQLite for all persistent state with Kysely as the query builder — no ORMs, no JSON storage for structured data [●○○○○] (critical, 2026-03-10)
- **biome-not-eslint**: Uses Biome exclusively for linting and formatting — tabs, double quotes, semicolons, trailing commas, 120 char width; no ESLint or Prettier [●○○○○] (critical, 2026-03-10)
- **bun-runtime-exclusively**: Uses Bun as the exclusive JavaScript runtime — never Node.js or npx [●○○○○] (critical, 2026-03-10)

## Workflow

- **questioning-status-quo**: Committed to making fashion move forward by questioning it, never being satisfied, and challenging established rules [●○○○○] (critical, 2026-03-13)
- **honesty-over-excuses**: Values straightforward communication and finishing tasks over making excuses; sees disingenuous behavior as corrosive to trust and harder than just being direct [●○○○○] (critical, 2026-03-13)
- **english-garden-approach**: Prefers working with existing systems and their natural contours rather than replacing them wholesale with clean-slate designs (the 'English garden' vs 'French garden' philosophy) [●○○○○] (critical, 2026-03-13)
- **study-before-replacing**: Strongly prefers studying existing systems deeply before building replacements — walking the land, understanding what's load-bearing, working with natural contours rather than flattening them [●○○○○] (critical, 2026-03-13)
- **persistent-knowledge-systems**: Maintains aggressive persistent knowledge systems (repo memories, project memories) to avoid re-learning the same things across sessions [●○○○○] (critical, 2026-03-13)
- **review-own-ai-code**: Believes strongly that developers must review AI-generated code before filing PRs, and should provide evidence of manual testing [●○○○○] (critical, 2026-03-13)
- **aggressive-knowledge-capture**: Believes in aggressively saving knowledge and repo memories the moment something non-obvious is learned, with the philosophy that storage is free but re-discovery is not [●○○○○] (critical, 2026-03-13)
- **judgment-over-speed**: Believes agents make code cheaper but not judgment — the scarce skill is expressing constraints, designing oracles, and curating context [●○○○○] (critical, 2026-03-13)
- **finish-things-fast**: Strongly prefers rapid execution and completion over deliberation — start, finish, move on, no premature optimization [●○○○○] (critical, 2026-03-12)
- **aggressive-knowledge-persistence**: Aggressively saves discovered knowledge to a repo memory system immediately when learned — prioritizes over-saving since re-discovery is expensive [●○○○○] (critical, 2026-03-11)
- **deterministic-over-llm**: When a task can be made deterministic, implement it as code (CLI command) rather than relying on LLM interpretation each time [●○○○○] (critical, 2026-03-11)
- **commit-and-push-immediately**: Commit changes after making an atomic isolated change, then push to GitHub immediately without waiting to be asked [●○○○○] (critical, 2026-03-11)
- **agent-self-hardening**: Believes AI agents should harden themselves by writing and updating their own task descriptions, eventually replacing themselves with deterministic CLI commands once the description stabilizes [●○○○○] (critical, 2026-03-09)
- **deterministic-over-llm**: Strongly prefers converting LLM-driven processes into deterministic CLI commands once the process is understood — AI should bootstrap, then get out of the way [●○○○○] (critical, 2026-03-09)
- **less-but-better**: Believes in doing less work but making it better — same time, fewer outputs, higher quality, aggressively cut the fat [●○○○○] (critical, 2026-02-26)


---

## Preference Awareness

You are operating in a **personal** context.
The preferences above are the highest-priority programming, tooling, and workflow preferences.
Run `u pref prompt --scope personal` to see all preferences (including lower-priority and other categories like communication, aesthetics).
Consult these preferences when making decisions about code style, tooling, or workflow.

---

## Repo Knowledge System — USE THIS CONSTANTLY

This is one of the most important systems we have. Every repo has a persistent knowledge bank managed by `u repo`. Memories survive across conversations and get auto-injected into future sessions (via `u claude` / `u gemini` / `u codex`). **This is how we avoid re-learning the same things every session.**

### How to save a memory — write file first, then ingest

**Do NOT pass the value as a shell argument.** Long values with parentheses, quotes, and special characters break shell escaping. Instead, follow this two-step process:

1. **Write the memory to a markdown file** using your Write tool:
   ```
   .memories/<category>/<key>.md
   ```
   The file content is the memory value — be specific and actionable.

2. **Ingest it into the knowledge system:**
   ```bash
   u repo add <category> <key> --from .memories/<category>/<key>.md --source agent
   ```

**Categories**: architecture, convention, gotcha, pattern, dependency, workflow, debug-tip, key-file, other
**Key**: short slug (e.g. `css-modules-setup`, `build-quirk-vite-plugin`)

### Examples

Discovered a gotcha about auth:
1. Write `.memories/gotcha/cf-assets-bypass-auth.md` with the explanation
2. Run: `u repo add gotcha cf-assets-bypass-auth --from .memories/gotcha/cf-assets-bypass-auth.md --source agent`

Figured out how a subsystem works:
1. Write `.memories/architecture/cloud-sync-system.md` with the explanation
2. Run: `u repo add architecture cloud-sync-system --from .memories/architecture/cloud-sync-system.md --source agent`

### Reading memories
- `u repo` — overview of the repo including all stored memories
- `u repo list` — list all memories for the current repo
- `u repo show <id>` — show a specific memory
- `u repo prompt` — dump all memories as markdown

### When to save — be aggressive
Save a memory **the moment you learn something non-obvious**. Do NOT wait until the end of a session. Do NOT assume "this is too small to save." If you had to figure it out, save it.

### Rules
- **NEVER pass memory values as inline shell arguments** — always write to a file first, then use `--from`.
- **Save early, save often.** Err on the side of saving too much. Storage is free; re-discovery is not.
- **Be specific.** "Vite config is weird" is useless. "Vite config uses manual chunk splitting for Berkeley Mono font to avoid FOUT" is useful.
- **Always run `u repo` at session start** to load existing knowledge before doing anything else.
- **After any debugging session**, save at least one memory about what went wrong and how it was fixed.
- **When the user tells you something about the repo**, save it immediately — don't rely on conversation context surviving.

---

## Task Board — WORK FROM THIS

The `u` CLI has a full task management system. Tasks live in a SQLite database and are visible in both the CLI and the web management board. **You should actively use this system to track your work.**

### Checking the board
- `u task board` — see all tasks by status (backlog → in-progress → review → done)
- `u task show <id>` — see task details, dependencies, and progress log
- `u wish list` — see all wishes (ideas, bugs, improvements) for this repo

### Working a task
When the user asks you to work on a task, or you pick one up:
1. **Move it to in-progress:** `u task move <id> in-progress`
2. **Log progress as you go:** `u task log <id> "what you did"`
3. **When done, move to review:** `u task move <id> review`

### Logging progress — be aggressive
Log progress notes the moment you accomplish something meaningful. Don't wait until the end. Examples:
- `u task log <id> "extracted shared queries.ts, deduplicated 90 lines"`
- `u task log <id> "found root cause: stale cache in middleware"`
- `u task log <id> "added tests for edge case X"`

### Creating tasks
If you discover work that needs doing while working on something else:
- `u wish add "description" --kind bug|idea|improvement|chore` — create a wish
- The user can promote wishes to tasks via the management board or `u task create <wish-id>`

### Rules
- **Always check the board** when the user asks you to "pick up a task" or "work on the next thing"
- **Move tasks through statuses** — don't leave them in backlog when you start working
- **Log often** — progress logs are how the user (and future sessions) know what happened
- **Don't close tasks yourself** — move to review, let the user decide when it's done

---

## Skills & Memory System — BUILD ON EXPERIENCE

### Skills (Procedural Memory)
Skills capture *how to do a specific type of task* based on proven experience. They're different from repo memories (which are facts about a codebase) — skills are actionable procedures.

**When to create a skill:**
- After completing a complex task (5+ tool calls) successfully
- When you overcame errors through a non-obvious approach
- When the user corrected your approach and the correction worked
- When you discovered a non-trivial workflow
- When the user asks you to remember a procedure

**Creating a skill:**
```bash
u skill create <name> "<description>" --category <category> --trigger "<when to use>" --from <file>
```
Write the skill content to a file first (like repo memories), then ingest with `--from`.

**Categories**: software-development, debugging, devops, data-science, research, productivity, domain, other

**Good skills include:** trigger conditions, numbered steps with exact commands, pitfalls section, verification steps.

**Browsing skills:**
- `u skill list` — see all skills
- `u skill show <name>` — see a skill's content
- `u skill search <query>` — find relevant skills

### Agent Memory (Persistent Notes)
You have persistent memory that survives across sessions:
- **memory**: Your personal notes — things learned, solutions found, patterns noticed
- **user**: User profile — their preferences, expertise, communication style, project context

**Managing memory:**
- `u memory add "note content"` — save a memory note
- `u memory add "user preference" --target user` — save to user profile
- `u memory list` — see all memories
- `u memory replace "old text" "new text"` — update a memory

### Session Search
You can search your own past conversations:
- `u session search "query"` — find past sessions about a topic
- `u session list` — see recent sessions
- `u session insights` — see usage analytics

### Rules
- **Create skills after complex successes** — don't wait for the user to ask
- **Save memory notes proactively** — if you learned something, save it
- **Build the user profile** — when the user reveals preferences, expertise, or context, save it
- **Search past sessions** when the user references previous work

---

## Task Board Snapshot

### backlog (2)
- **t_f9baa4**: Add dark mode [LG]
- **t_5228cf**: Fix the build pipeline [MD]

### done (1)
- **t_92045a**: audit the code of the repo