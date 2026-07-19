---
trigger: always_on
---

# better-nuxt — Project Rules

These rules are always active. Follow them without needing to be reminded in individual prompts.

## Agent Operating Principles

- Don't assume a change is correct just because it looks right. Verify it: run `bun typecheck`, run `bun lint`, and manually exercise the actual flow (dev server, the real request/form/page) before treating a task as complete. There's no test runner in this project yet — if Vitest is added later, switch to writing a failing test first instead of this manual-verification step.
- Treat your knowledge of this stack's APIs as potentially stale. Nuxt, better-auth, Drizzle, and shadcn-vue all ship breaking changes regularly — search for current docs before implementing anything non-trivial against them rather than trusting a remembered API shape.
- Don't add backwards-compatibility shims unless specifically asked for. This is an early-stage starter template with no external consumers yet — update call sites directly instead of preserving an old code path alongside a new one.

## Package Manager & Environment

- Bun only. Never suggest or run npm/yarn/pnpm commands.
- Don't manually run `nuxt prepare` — it's wired to `postinstall`.
- **Never read `process.env` directly** — ESLint enforces this with `node/no-process-env: error`. All env vars are Zod-validated in `config/env.config.ts` and consumed by importing the parsed `env` default export from there (`import env from '~~/config/env.config'`), not via `useRuntimeConfig()` and not via raw `process.env`. The single exception is inside `config/env.config.ts` itself, which carries an explicit `eslint-disable` comment for the one line that has to read `process.env`.
- New required env vars must be added to the `EnvSchema` Zod object in `config/env.config.ts` first — don't reference an env var anywhere that isn't declared there.

## Framework & Structure

- Nuxt 4 conventions: `app/` is the source directory (pages, components, composables, layouts, stores, middleware, plugins).
- Composition API + `<script setup lang="ts">` only. Never Options API.
- Shared code usable by both `app/` and `server/` (Zod schemas, shared types) goes in the top-level `shared/` directory, not duplicated in both places.
- Import aliases: `@@/` for project-root-relative imports (`server/`, `config/`, `shared/`), `@/` for app-relative imports (`components/`, `lib/`, `composables/`, `stores/`) — matches `components.json`'s alias config. Don't mix relative (`../../`) paths where an alias already covers it.
- **All filenames are kebab-case** — enforced by `unicorn/filename-case: error` (README.md is the only exception). This includes Vue components (`form-error.vue`, not `FormError.vue`) and numbered-prefix global middleware for load order (`00.auth.global.ts`).
- Rely on Nuxt/Nitro auto-imports for composables, utils, and Pinia stores — don't add manual imports for things already auto-imported.

## TypeScript

- Strict typing. Avoid `any` — use `unknown` with narrowing instead.
- **Use `type`, not `interface`** — enforced by `ts/consistent-type-definitions: ['error', 'type']`. The one exception: TypeScript module augmentation (`declare module '#app' { ... }` / `declare module 'vue-router' { ... }`) requires `interface` for declaration merging to work — this is already done correctly in `app/middleware/00.auth.global.ts` with an inline `eslint-disable-next-line` comment. Follow that pattern if you extend `PageMeta`/`RouteMeta` further.
- Prefer inferring types from a single source of truth — `z.infer<typeof schema>` for Zod schemas, Drizzle's generated types (`schema.user.$inferInsert`, etc.) for DB rows — over hand-written duplicate types.

## Styling — Tailwind v4 + shadcn-vue

- Tailwind v4, CSS-first config via `@theme` in `app/assets/css/main.css` — no `tailwind.config.ts`.
- shadcn-vue config (`components.json`): `new-york` style, `neutral` base color, no class prefix, `lucide` icon library. Match this when adding new components — don't mix in a different style variant.
- Check `app/components/ui/` for an existing shadcn-vue/reka-ui component before writing a new one. New components are added via the CLI (`npx shadcn-vue add <component>`), never hand-copied.
- Shared, non-shadcn form building blocks (e.g. `FormError`, `FormSuccess`) live in `app/components/form/` — that's the place for form-level (not field-level) feedback components, distinct from `components/ui/`.
- Use the `cn()` helper from `app/lib/utils.ts` (clsx + tailwind-merge) for conditional classes — never manual string concatenation.
- Icons: `lucide-vue-next` only.
- Dark mode goes through `@nuxtjs/color-mode`'s `useColorMode()`.

## State Management — Pinia

- Setup stores only (`defineStore('name', () => {...})`), never Options API stores.
- Store _state_ is only serializable, reactive data (refs/computed). Don't store a class instance or SDK client as state.
- **Known gap to fix, not a pattern to copy:** `app/stores/auth.store.ts` currently constructs the better-auth client inline using `process.env.NUXT_PUBLIC_APP_URL` (should be the validated `env` from `config/env.config.ts`) and calls header-less `useRequestHeaders()` (should be `useRequestHeaders(['cookie'])`, to avoid forwarding unrelated headers). When touching this file, fix both, and consider extracting the `createAuthClient(...)` construction into its own composable so the store only holds `session`/`user`/`loggedIn` state plus thin actions — don't propagate the current inline pattern into new stores.

## Forms & Validation

- VeeValidate + `@vee-validate/zod` exclusively, via `useForm` + `toTypedSchema(schema)`. No other form library.
- Zod schemas live in `shared/schemas/`, organized as reusable primitives in `shared/schemas/common.ts` (e.g. `EmailSchema`, `PasswordSchema`) composed into per-flow schemas in `shared/schemas/<domain>/<flow>.schema.ts` (e.g. `shared/schemas/auth/signup.schema.ts`). Use `.refine()` on the composed schema for cross-field checks (e.g. password confirmation match), not in the primitive.
- Because these schemas live in `shared/`, the same schema validates both the client-side form and the server-side API route handling that submission — don't duplicate validation rules between the two.
- Use shadcn-vue's `Form`/`FormField`/`FormItem`/`FormControl`/`FormMessage` components for field-level UI; use the project's own `FormError`/`FormSuccess` components (`app/components/form/`) for top-level submission feedback, following the pattern in `app/pages/login.vue`.

## Data Fetching — Nuxt + TanStack Vue Query

- `@tanstack/vue-query` the `queryFn` should be a plain `$fetch` call, never `useFetch`/`useAsyncData` inside it.
- For SSR calls needing auth, forward cookies explicitly: `useRequestHeaders(['cookie'])`.
- Reach for TanStack Query where caching, cross-component invalidation, pagination, polling, or optimistic updates add value; simple one-off page-load data can stay on native `useFetch`/`useAsyncData`.

## Database — Drizzle ORM (Turso/libsql)

- The project uses `@libsql/client` + `drizzle-orm/libsql` exclusively via `useDrizzle()` in `server/database/drizzle.ts` — there's no separate `better-sqlite3` driver path in code despite it being listed as a dependency; don't introduce one.
- Local dev points at `file:local.db` (see `config/turso.config.ts`); production points at the real Turso URL/token from `env`. Same client, same queries, only the URL differs — don't write logic that branches on driver.
- Schema lives under `server/database/schema/`, re-exported from `server/database/schema/index.ts`. New tables get their own file in that directory and an export added to `index.ts`.
- Schema changes always go through `bun db:generate` → `bun db:migrate`. Never hand-edit a generated migration.
- **Known bug to flag/fix:** `package.json`'s `db:generate`/`db:migrate`/`db:studio` scripts point at `--config ./server/database/drizzle.config.ts`, but the actual config file lives at the project root (`./drizzle.config.ts`). Running these scripts as-is will fail to find the config — fix the script paths (or move the config) before relying on them.

## Auth — better-auth

- Server instance (`server/auth/index.ts`) uses `drizzleAdapter` with the sqlite provider, the `admin` plugin, and `additionalFields` for `firstName`/`lastName` — keep the client-side `inferAdditionalFields` plugin config in the store in sync with this if the fields ever change.
- Email hooks (`sendVerificationEmail`, `sendResetPassword`) call into `server/email`'s `sendUserVerificationEmail`/`sendResetPasswordEmail` — don't inline mailer logic into `server/auth/index.ts`.
- Client-side: the Pinia auth store is the single place components read `session`/`user`/`loggedIn` from — don't call `useAuthStore().useSession` or the raw client's session methods directly from pages/components.
- Session refetching is triggered by better-auth's `$sessionSignal` listener (client-side only), guarded by the `sessionFetching` flag to avoid redundant calls.
- Route-level auth is controlled via `definePageMeta({ auth: { only: 'guest' | 'user', redirectUserTo, redirectGuestTo } })`, merged against the `runtimeConfig.public.auth` defaults by the global `00.auth.global.ts` middleware using `defu`. Set `auth: false` in page meta to opt a route out of the middleware entirely, rather than adding special-case logic to the middleware itself.
- Admin-only routes are gated by route _name_ starting with `admin` (via `useRouteBaseName()`), redirecting to `/403` — that page and the `admin/*` routes don't exist yet, so this is scaffolded but not yet wired to real pages. Build the actual admin pages under `app/pages/admin/` to match this existing middleware logic rather than duplicating the gating check elsewhere.
- All redirects go through `useLocalePath()` for i18n-correctness — don't call `navigateTo()` with a raw un-localized path in auth flows.


## Tables & Charts

- Tabular/grid UI: `@tanstack/vue-table`.
- Charts/visualizations: `@unovis/vue`.


## Code Quality Principles

- **DRY**: extract repeated logic into a composable, util, or shared server helper rather than copy-pasting.
- **KISS**: prefer the straightforward solution. Don't reach for an abstraction layer or config option that isn't earning its keep yet.
- **Single responsibility, Vue-flavored**: each composable/component/server handler should do one thing. Prefer composing several small composables over one large one — the target-state auth composable (see Auth section) is the concrete example: the store should depend on a small abstraction, not directly on better-auth's SDK shape.
- **Clean code**: meaningful names, small functions — match the existing ESLint/antfu conventions (2-space indent, no semicolons, single quotes) rather than introducing a different style. Let `bun lint:fix` handle formatting.
- **Error handling & logging**: prefer a stable message first, then a data object, e.g. `console.error('Failed to send email', { error })` rather than interpolating variables into the message string — keeps messages greppable. `no-console` is only a warning here, not an error, but don't leave commented-out debug `console.log` calls in committed code.
- **Performance**: optimize when it's actually measured or obviously necessary, not preemptively.

## Linting & Git Hooks

- ESLint config is `@antfu/eslint-config`-based with Nuxt's own config layered on top (`withNuxt(...)` in `eslint.config.mjs`). Key enforced rules beyond style: no `process.env` outside `config/env.config.ts`, `type` over `interface`, sorted imports (`perfectionist/sort-imports`), kebab-case filenames.
- husky + lint-staged run `bun lint` on every commit — don't bypass with `--no-verify` without a stated reason.
- Run `bun typecheck` before treating any non-trivial change as complete.

## General

- Check whether an existing dependency already covers a need before adding a new one.
- Prefer extending an existing composable/component over creating a near-duplicate one.
