# Clario

Clario is a multi-tenant client-management SaaS portfolio project for freelancers, consultants and small agencies. The intended product connects leads, clients, projects, project updates, proposals, invoices and a restricted client portal in one application.

## Repository status

The repository has completed **Phase 2: authentication and multi-tenant security foundation**.

Phase 3 will introduce real workspace onboarding and dashboard data.

Completed foundations currently include:

- Next.js App Router
- strict TypeScript
- Tailwind CSS design tokens
- light, dark and system themes
- responsive marketing and workspace shells
- accessible shared interface primitives
- Vitest and React Testing Library
- hosted Supabase connectivity
- Supabase Auth
- PostgreSQL migrations
- Row Level Security
- typed Supabase clients
- protected authenticated workspace routes

Not implemented yet:

- workspace onboarding UI
- real dashboard queries
- lead, client or project CRUD
- proposal and invoice workflows
- client-portal data and authorization
- Playwright configuration
- Vercel production deployment

No completed feature, test run or deployment is claimed unless it has been verified and recorded in `BUILD_LOG.md`.

## Live demo

Not deployed yet.

## Screenshots

Screenshots will be added after the related screens exist, are deployed and have been manually checked.

No placeholder image is presented as a completed interface.

## Problem being solved

Independent professionals often keep lead details, delivery notes and financial documents across unrelated tools.

Clario is intended to provide a clearer record of the relationship from enquiry through delivery and billing while keeping internal workspace information separate from client-visible information.

## Why this project was selected

Personal reflection pending.

This section will be updated from the project owner's confirmed notes rather than invented experience.

## Target users

- Workspace owners who control workspace-level settings and data
- Workspace members who collaborate on operational records
- Client users who will access only records explicitly linked to their client identity

Client-user functionality belongs to a later phase and is not implemented yet.

## Implemented features

### Phase 1 â€” tooling and design foundation

- Product-specific metadata and landing-page foundation
- Responsive internal application shell
- Reusable page container
- Accessible buttons and native form primitives
- Semantic status badges
- Empty, error and loading states
- Light, dark and system themes through `next-themes`
- Sonner toast host
- Route-level loading and error boundaries for `/app`
- Custom not-found page
- Component and utility tests
- Responsive fixes verified at a 320-pixel viewport

### Phase 2 â€” authentication and tenancy

- Dedicated hosted Supabase development environment
- Runtime validation of browser-safe environment variables with Zod
- Supabase browser client
- Supabase server client
- Supabase Proxy client for SSR session refresh
- Generated Supabase TypeScript database definitions
- Versioned PostgreSQL migrations
- `profiles` application-user table
- `workspaces` tenancy table
- `workspace_members` internal membership table
- Auth-user profile provisioning
- Controlled workspace creation through an RPC
- Row Level Security on all current application tables
- Privileged authorization helpers in a non-exposed PostgreSQL schema
- Email/password sign-up
- Email confirmation
- Email/password sign-in
- Sign out
- Password recovery
- Cookie-backed SSR sessions
- Next.js Proxy session refresh
- Protected `/app` routes
- Real two-user tenant-isolation verification
- Anonymous workspace-access verification

## Planned Release 1 features

Remaining Release 1 work includes:

- workspace onboarding
- optional controlled demonstration data
- dashboard analytics scoped to the authenticated workspace
- lead pipeline and table view
- client management
- project management
- internal and client-visible project updates
- proposal workflow
- invoice workflow
- restricted client portal
- search and filtering where useful
- responsive application navigation
- additional unit and component tests
- essential Playwright end-to-end tests
- Vercel deployment
- portfolio screenshots and walkthrough evidence

## Planned Release 2 features

Release 2 remains separate from the portfolio MVP:

- team invitations
- file uploads
- realtime updates
- Stripe subscriptions
- generated PDFs
- email notifications
- command palette
- advanced analytics
- recurring invoices
- custom branding
- multiple currencies
- CSV exports
- automated reminders

## Technology stack

Current stack:

- Next.js App Router
- React
- strict TypeScript
- Tailwind CSS
- shadcn/ui-compatible component structure
- Lucide icons
- `next-themes`
- Sonner
- Supabase Auth
- Supabase PostgreSQL
- `@supabase/ssr`
- `@supabase/supabase-js`
- Zod
- Vitest
- React Testing Library

React Hook Form, TanStack Query, dnd-kit, Recharts and Playwright remain candidates for later phases where the related workflows justify them.

## Architecture summary

Server Components are the default for pages and authenticated data access.

Client Components are reserved for interactions that require browser state, effects, event handlers or browser-only APIs.

Feature code lives under `src/features`. Shared interface and layout components live under `src/components`, while cross-feature utilities and infrastructure live under `src/lib`.

Supabase Row Level Security remains the final database authorization boundary. Route redirects and hidden interface controls are not treated as sufficient authorization.

Authentication session refresh is handled through Next.js Proxy, while protected workspace layouts independently verify authenticated identity before rendering.

## Route overview

Implemented:

- `/` â€” public marketing page
- `/app` â€” authenticated workspace shell
- `/auth/sign-up` â€” account creation
- `/auth/sign-in` â€” sign in
- `/auth/check-email` â€” confirmation-email instruction
- `/auth/confirm` â€” signup PKCE callback
- `/auth/forgot-password` â€” password-reset request
- `/auth/recovery` â€” password-recovery PKCE callback
- `/auth/reset-password` â€” authenticated password update

Later application routes will cover leads, clients, projects, proposals, invoices and settings.

Client-facing routes will live under `/portal`.

## Database summary

Phase 2 introduced the core multi-tenant PostgreSQL model.

Current application tables:

- `profiles`
- `workspaces`
- `workspace_members`

`auth.users` remains Supabase Auth's source of identity.

When an Auth user is created, Clario provisions the related application profile.

Workspace membership is represented separately through `workspace_members`.

Privileged authorization helpers and privileged workspace-creation logic live in the non-exposed `private` PostgreSQL schema.

The browser-facing `public.create_workspace` RPC is a narrow wrapper around the private implementation.

Generated TypeScript database definitions live in:

```text
src/lib/supabase/database.types.ts
```

## Row Level Security summary

RLS is enabled on every current application table.

Current policies protect profiles, workspaces and workspace memberships.

Phase 2 verified the policies using two real authenticated users:

- each user could read their own profile
- each user could read their own workspace and owner membership
- User A could not read User B's workspace, memberships or profile
- User B could not read User A's workspace, memberships or profile
- anonymous workspace access was denied

The integration verification runs through:

```bash
npm run test:rls
```

Future application tables must receive their own appropriate RLS policies before being treated as complete.

## Local setup

Requirements:

- Node.js 22 or newer
- npm
- Git

For a clean checkout:

```bash
npm ci
```

Copy the environment example to `.env.local`.

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Then fill in the local browser-safe Supabase values without committing them.

Run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run dev
```

Open:

```text
http://localhost:3000
```

Use `npm install` rather than `npm ci` when intentionally changing dependencies.

## Environment variables

The application expects:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL
```

These names are documented in `.env.example`.

Real development values belong in `.env.local`.

`NEXT_PUBLIC_*` variables are browser-visible and must never contain privileged secrets.

A Supabase `service_role` key must never be exposed through browser code or committed to the repository.

## Supabase setup

Development uses a dedicated hosted Supabase project rather than a local Docker-based Supabase stack.

The application uses:

- a browser Supabase client
- a server Supabase client
- a Next.js Proxy Supabase client for session refresh
- generated TypeScript database definitions
- versioned SQL migrations
- Supabase email/password Auth
- PostgreSQL Row Level Security

The hosted development project is linked through the Supabase CLI for migration and type-generation workflows.

Real project values, account credentials and authentication tokens must not be committed.

## Migrations

Versioned PostgreSQL migrations are stored in:

```text
supabase/migrations
```

Phase 2 migrations introduced:

- the core profile, workspace and workspace-membership schema
- core tenancy RLS policies
- Auth-user provisioning
- controlled workspace creation
- hardening that moved privileged security-definer helpers into the non-exposed `private` schema

Migrations are applied through the Supabase CLI.

Database TypeScript definitions are regenerated from the linked development project after relevant schema changes.

## Demonstration data

Application demonstration-data generation has not been implemented yet.

When added, demonstration data must respect authenticated workspace ownership, RLS and repeatable/idempotent setup requirements.

## Testing

The standard unit and component suite runs with:

```bash
npm run test
```

Additional local commands include:

```bash
npm run test:watch
npm run test:coverage
```

Phase 2 also includes a hosted Supabase tenancy integration check:

```bash
npm run test:rls
```

`test:rls` signs in two confirmed development Auth users and verifies:

- each user can access their own profile and workspace
- User A cannot read User B's protected records
- User B cannot read User A's protected records
- anonymous workspace access is denied

The RLS test requires temporary credentials supplied only to the local shell session.

Those credentials must never be committed or placed in example environment files.

The latest confirmed standard suite before final Phase 2 documentation cleanup contained:

- 6 test files
- 21 tests

Playwright scripts are reserved in `package.json`, but Playwright is not installed or configured yet.

## Continuous integration

GitHub Actions runs the standard quality checks for pull requests and pushes to `main`:

```text
lint
type-check
unit/component tests
production build
```

The hosted RLS integration test is intentionally not part of ordinary CI because it requires real controlled Auth identities and credentials.

## Deployment

Production deployment has not been completed.

Vercel deployment, production Supabase redirect configuration, deployment verification and portfolio evidence belong to the final release/deployment phase.

The Supabase Free plan is sufficient for the initial portfolio release, but the public portfolio presentation will not rely solely on the hosted development backend remaining continuously active.

## Accessibility approach

Implemented accessibility foundations include:

- semantic landmarks
- skip-to-content navigation
- visible labels for form controls
- visible keyboard focus
- native buttons and inputs
- error messages with appropriate semantics
- loading text for screen readers
- reduced-motion handling
- responsive mobile layouts
- light and dark design tokens

Automated accessibility testing and documented keyboard workflows remain planned for the later testing phase.

## Performance approach

Server Components remain the default for pages and authenticated data access.

Global client-side behavior remains limited to interactions that genuinely require browser state, such as theme selection and toast presentation.

Performance claims will be added only after measurement.

## Security approach

Current security practices include:

- no secret values committed to the repository
- `.env.local` remains ignored
- browser-safe environment names are documented separately
- authenticated workspace routes verify the user on the server
- current database authorization is enforced through PostgreSQL RLS
- privileged database helpers live outside the exposed API schema
- raw Supabase errors are not displayed directly to users
- service-role keys are not exposed to browser code
- cross-tenant negative access is tested with real Auth identities

See `SECURITY.md` for the current security model and remaining limitations.

## Technical decisions

See `DECISIONS.md`.

Decisions are written neutrally until the project owner confirms personal reasoning.

## Trade-offs

- A hosted Supabase development project avoids adding Docker but makes local database resets less convenient.
- Supabase's Free plan keeps the portfolio release cost-free but introduces testing-oriented email limits and possible inactive-project pausing.
- Native form primitives remain the base form layer, while Zod validates authentication input at the server boundary.
- Additional form libraries will only be introduced where later workflows justify them.
- `/app` is authenticated but still contains foundation/demo workspace content rather than real business data.

## Known limitations

- `/app` is authenticated but still contains foundation/demo workspace content rather than real dashboard queries.
- workspace onboarding UI is not implemented yet
- lead, client, project, proposal and invoice workflows are not implemented yet
- client-portal authorization is not implemented yet
- Playwright end-to-end testing is not configured yet
- production monitoring is not configured
- no production deployment exists yet

## Development reflections

The following case-study sections require the project owner's real experience:

- What I personally learned: pending
- Most difficult implementation problem: pending
- A bug I diagnosed: pending
- A design decision I changed: pending
- What I would improve in a future release: pending

## Roadmap

Development follows the numbered phases recorded in `BUILD_LOG.md`.

Release 2 does not start until Release 1 meets its acceptance criteria.

## Author

Project owner details pending confirmation.

## License

No open-source license has been selected yet.

Until a license is added, normal copyright restrictions apply.
