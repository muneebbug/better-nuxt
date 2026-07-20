# better-nuxt

A production-ready **Nuxt 4** starter template with batteries included: authentication, database, email, i18n, dark mode, and a complete UI system — all built on a modern, type-safe stack.

## ✨ Features

- **⚡ Nuxt 4** — Latest Nuxt with the `app/` source directory convention
- **🔐 Better Auth** — Full authentication system: email/password, email verification, password reset, and admin plugin
- **🗄️ Drizzle ORM + Turso** — Type-safe SQL ORM with libsql/Turso for edge-ready SQLite (local `file:local.db` in development)
- **🎨 shadcn-vue + Tailwind v4** — New York style component library with CSS-first Tailwind config
- **📋 VeeValidate + Zod** — Type-safe form validation shared between client and server
- **📦 Pinia** — Setup-store-based state management with a pre-built auth store
- **🌍 i18n** — `@nuxtjs/i18n` wired up and ready for locale expansion
- **🌙 Dark Mode** — `@nuxtjs/color-mode` with class-based switching
- **📧 Email** — Nodemailer + MJML transactional email templates (Mailgun for production, Ethereal for development)
- **🔍 TanStack Vue Query** — Server state management with caching and invalidation
- **📊 TanStack Vue Table + Unovis** — Data tables and charts out of the box
- **🛡️ Type-safe Environment** — Zod-validated env vars via `config/env.config.ts`
- **🧹 ESLint + Husky** — `@antfu/eslint-config` with lint-staged pre-commit hooks

## 🏗️ Project Structure

```
better-nuxt/
├── app/                        # Nuxt source directory (Nuxt 4 convention)
│   ├── assets/css/main.css     # Tailwind v4 @theme config + global styles
│   ├── components/
│   │   ├── ui/                 # shadcn-vue components (auto-managed by CLI)
│   │   └── form/               # Shared form feedback components (FormError, FormSuccess)
│   ├── composables/            # Auto-imported composables
│   ├── i18n/                   # i18n configuration and locale files
│   ├── layouts/                # Nuxt layouts
│   ├── lib/utils.ts            # cn() helper (clsx + tailwind-merge)
│   ├── middleware/
│   │   └── 00.auth.global.ts   # Global auth guard (user/guest route protection)
│   ├── pages/                  # File-based routing
│   │   ├── index.vue           # Home / landing page
│   │   ├── login.vue           # Login form
│   │   ├── signup.vue          # Registration form
│   │   ├── forgot-password.vue # Password reset request
│   │   ├── reset-password.vue  # Password reset confirmation
│   │   └── protected.vue       # Example authenticated page
│   ├── plugins/                # Nuxt plugins
│   └── stores/
│       └── auth.store.ts       # Pinia auth store (session, user, loggedIn)
├── config/
│   ├── env.config.ts           # Zod-validated environment variables
│   └── turso.config.ts         # Turso/libsql connection config
├── server/
│   ├── api/                    # Nitro API routes
│   ├── auth/index.ts           # Better Auth server instance
│   ├── database/
│   │   ├── drizzle.ts          # useDrizzle() singleton
│   │   ├── schema/             # Drizzle table definitions
│   │   └── migrations/         # Auto-generated Drizzle migrations
│   └── email/
│       ├── index.ts            # Email sending functions
│       └── templates/          # MJML email templates
├── shared/
│   └── schemas/                # Zod schemas shared by client + server
├── drizzle.config.ts           # Drizzle Kit config
├── nuxt.config.ts              # Nuxt configuration
└── components.json             # shadcn-vue CLI config
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (package manager — **required**)
- A [Turso](https://turso.tech) account (or use the local SQLite file for development)
- SMTP credentials (Ethereal for testing, Mailgun for production)

### 1. Clone and Install

```bash
git clone https://github.com/muneebbug/better-nuxt.git
cd better-nuxt
bun install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable                        | Description                                           |
| ------------------------------- | ----------------------------------------------------- |
| `NUXT_PUBLIC_APP_URL`           | Public URL of your app (e.g. `http://127.0.0.1:3000`) |
| `NUXT_PUBLIC_APP_NAME`          | Display name of your app                              |
| `NUXT_SESSION_PASSWORD`         | 32-char random secret for session encryption          |
| `NUXT_TURSO_DATABASE_URL`       | Turso DB URL (use `file:local.db` for local dev)      |
| `NUXT_TURSO_AUTH_TOKEN`         | Turso auth token (leave empty for local dev)          |
| `NUXT_BETTER_AUTH_SECRET`       | 32-char random secret for Better Auth                 |
| `NUXT_BETTER_AUTH_URL`          | Same as `NUXT_PUBLIC_APP_URL`                         |
| `NUXT_MAILGUN_API_KEY`          | Mailgun API key (production email)                    |
| `NUXT_MAILGUN_DOMAIN`           | Mailgun sending domain                                |
| `NUXT_MAIL_FROM_EMAIL`          | From address for outgoing emails                      |
| `NUXT_TEST_EMAIL_AUTH_USER`     | Ethereal SMTP user (dev email testing)                |
| `NUXT_TEST_EMAIL_AUTH_PASSWORD` | Ethereal SMTP password                                |

Generate random secrets with:

```bash
openssl rand -hex 16
```

### 3. Set Up the Database

```bash
bun setup
```

This runs `bun db:generate` and `bun db:migrate` in sequence to create and apply the initial schema.

### 4. Start the Dev Server

```bash
bun dev
```

The app runs at `http://127.0.0.1:3000`.

## 📜 Available Scripts

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `bun dev`         | Start the development server                         |
| `bun build`       | Build for production                                 |
| `bun preview`     | Preview the production build                         |
| `bun generate`    | Generate a static site                               |
| `bun clean`       | Clean Nuxt build artifacts                           |
| `bun setup`       | Generate and run DB migrations (first-time setup)    |
| `bun db:generate` | Generate a new Drizzle migration from schema changes |
| `bun db:migrate`  | Apply pending migrations to the database             |
| `bun db:studio`   | Open Drizzle Studio (visual DB browser)              |
| `bun lint`        | Run ESLint                                           |
| `bun lint:fix`    | Run ESLint and auto-fix issues                       |
| `bun typecheck`   | Run TypeScript type checking via `nuxi typecheck`    |

## 🔐 Authentication

Authentication is powered by **Better Auth** with the following features enabled:

- **Email & Password** sign-up / sign-in with required email verification
- **Password Reset** via email
- **Session revocation** on password reset
- **Admin plugin** — role management, user banning, and impersonation
- **Custom user fields** — `firstName` and `lastName` on the user model
- **Account deletion** — enabled by default

### Route Protection

Routes are protected by the global middleware `app/middleware/00.auth.global.ts`. Configure access per-page using `definePageMeta`:

```ts
// Redirect logged-in users away (login/signup pages)
definePageMeta({ auth: { only: 'guest', redirectUserTo: '/' } })

// Require authentication
definePageMeta({ auth: { only: 'user', redirectGuestTo: '/login' } })

// Opt out of auth middleware entirely
definePageMeta({ auth: false })
```

### Auth Store

The Pinia auth store (`app/stores/auth.store.ts`) is the single source of truth for session state. Access it in components:

```ts
const authStore = useAuthStore()

authStore.session // Current session object
authStore.user // Current user object
authStore.loggedIn // Boolean
```

## 🗄️ Database

The project uses **Drizzle ORM** with **Turso** (libsql) as the database driver.

- **Local dev**: points to `file:local.db` automatically
- **Production**: uses `NUXT_TURSO_DATABASE_URL` + `NUXT_TURSO_AUTH_TOKEN`
- Schema files live in `server/database/schema/` and are re-exported from `server/database/schema/index.ts`

### Adding a Table

1. Create `server/database/schema/my-table.ts`
2. Export it from `server/database/schema/index.ts`
3. Run `bun db:generate` then `bun db:migrate`

## 🎨 UI Components

The UI is built with **shadcn-vue** (New York style, neutral base color) on top of **Tailwind CSS v4**.

Add new shadcn-vue components via the CLI:

```bash
npx shadcn-vue add <component-name>
```

Components are installed to `app/components/ui/`. Use the `cn()` helper from `app/lib/utils.ts` for conditional class merging:

```ts
import { cn } from '@/lib/utils'

cn('base-class', isActive && 'active-class')
```

## 📋 Forms & Validation

Forms use **VeeValidate** + **`@vee-validate/zod`**. Schemas live in `shared/schemas/` so the same schema validates both the client form and the server API route.

```ts
// shared/schemas/auth/signup.schema.ts
import { z } from 'zod'

import { EmailSchema, PasswordSchema } from '../common'

export const SignupSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  // ...
})

// In a component
const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(SignupSchema),
})
```

## 📧 Email

Email is sent via **Nodemailer** using **MJML** templates.

- **Development**: Ethereal Email (preview in browser, no real sending)
- **Production**: Mailgun API

Email sending functions are in `server/email/index.ts`. Templates live in `server/email/templates/`.

## 🌍 Internationalization

i18n is configured via `@nuxtjs/i18n`. The i18n config lives at `app/i18n/i18n.config.ts`. Currently ships with English (`en`). Add more locales in `nuxt.config.ts`:

```typescript
i18n: {
  locales: [
    { code: 'en', language: 'en-US', name: 'English' },
    { code: 'fr', language: 'fr-FR', name: 'Français' },
  ],
}
```

> **Note:** All navigation within auth flows uses `useLocalePath()` for i18n-correct redirects.

## 🧹 Code Quality

- **ESLint**: `@antfu/eslint-config` with Nuxt config layered on top
- **Husky + lint-staged**: ESLint runs on every commit
- **TypeScript**: Strict mode; run `bun typecheck` before merging

Key enforced rules:

- No `process.env` outside `config/env.config.ts`
- `type` over `interface`
- kebab-case filenames
- Sorted imports (`perfectionist/sort-imports`)

## 🛠️ Tech Stack

| Category        | Technology                                                                |
| --------------- | ------------------------------------------------------------------------- |
| Framework       | [Nuxt 4](https://nuxt.com)                                                |
| Language        | TypeScript (strict)                                                       |
| Auth            | [Better Auth](https://www.better-auth.com)                                |
| Database        | [Drizzle ORM](https://orm.drizzle.team) + [Turso](https://turso.tech)     |
| UI Components   | [shadcn-vue](https://www.shadcn-vue.com) + [reka-ui](https://reka-ui.com) |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com)                                |
| Icons           | [Lucide Vue Next](https://lucide.dev)                                     |
| State           | [Pinia](https://pinia.vuejs.org)                                          |
| Forms           | [VeeValidate](https://vee-validate.logaretm.com) + [Zod](https://zod.dev) |
| Server State    | [TanStack Vue Query](https://tanstack.com/query)                          |
| Tables          | [TanStack Vue Table](https://tanstack.com/table)                          |
| Charts          | [Unovis](https://unovis.dev)                                              |
| Email           | Nodemailer + MJML                                                         |
| i18n            | [@nuxtjs/i18n](https://i18n.nuxtjs.org)                                   |
| Package Manager | [Bun](https://bun.sh)                                                     |
| Linting         | ESLint (`@antfu/eslint-config`) + Husky                                   |

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.
