# Clario

Clario is a multi-tenant client-management SaaS portfolio project for freelancers, consultants and small agencies. The intended product connects leads, clients, projects, project updates, proposals, invoices and a restricted client portal in one application.

## Repository status

The repository is currently at **Phase 1: tooling and design foundation**.

Implemented in this phase:

- Next.js App Router foundation
- Tailwind CSS design tokens
- Light, dark and system themes
- Shared buttons, fields, status badges and feedback states
- Responsive marketing and workspace shells
- Skip-to-content navigation and reduced-motion handling
- Vitest and React Testing Library configuration
- Core project documentation

Not implemented yet:

- Supabase authentication or database access
- Workspace onboarding
- Dashboard queries
- Lead, client or project CRUD
- Proposal and invoice workflows
- Client portal data
- Playwright configuration
- Vercel deployment

No completed feature, test run or deployment is claimed unless it has been verified and recorded in `BUILD_LOG.md`.

## Live demo

Not deployed yet.

## Screenshots

Screenshots will be added after the related screens exist and have been manually checked. No placeholder image is presented as a completed interface.

## Problem being solved

Independent professionals often keep lead details, delivery notes and financial documents across unrelated tools. Clario is intended to provide a clearer record of the relationship from enquiry through delivery and billing while keeping internal workspace information separate from client-visible information.

## Why this project was selected

Personal reflection pending. This section will be updated from the project owner’s confirmed notes rather than invented experience.

## Target users

- Workspace owners who control settings and all workspace data
- Workspace members who manage operational records without owner-only controls
- Client users who can access only records linked to their client account

## Implemented features

### Phase 1 foundation

- Product-specific metadata and landing-page foundation
- Responsive internal application shell
- Reusable page container
- Accessible buttons and native form primitives
- Semantic status badges
- Empty, error and loading states
- Theme selection stored with `next-themes`
- Sonner toast host
- Route-level loading and error boundaries for `/app`
- Custom not-found page
- Component and utility tests

## Planned Release 1 features

- Supabase email-and-password authentication
- Workspace onboarding and optional demonstration data
- Dashboard analytics scoped to the active workspace
- Lead pipeline and table view
- Client and project management
- Internal and client-visible project updates
- Proposal and invoice builders
- Restricted client portal
- Search, filtering and responsive navigation
- Unit, component and essential Playwright tests
- Vercel deployment documentation

## Planned Release 2 features

Release 2 remains separate from the portfolio MVP:

- Team invitations
- File uploads
- Realtime updates
- Stripe subscriptions
- Generated PDFs
- Email notifications
- Command palette
- Advanced analytics
- Recurring invoices
- Custom branding
- Multiple currencies
- CSV exports
- Automated reminders

## Technology stack

- Next.js App Router
- React and strict TypeScript
- Tailwind CSS
- shadcn/ui-compatible component structure
- Lucide icons
- next-themes
- Sonner
- Vitest
- React Testing Library
- Supabase, Zod, React Hook Form, TanStack Query, dnd-kit, Recharts and Playwright in later phases

## Architecture summary

Server Components are the default for pages and initial data loading. Client Components are limited to interactions that need browser state, such as theme selection, forms, drag-and-drop and optimistic updates.

Feature code will live under `src/features`. Shared visual primitives live under `src/components`, and cross-feature utilities live under `src/lib`.

Supabase Row Level Security will remain the final authorization boundary. Route redirects and hidden controls will not be treated as sufficient security.

## Route overview

Implemented:

- `/` — marketing foundation
- `/app` — workspace shell foundation

Planned public routes include `/pricing`, authentication and password recovery. Planned authenticated routes cover leads, clients, projects, proposals, invoices and settings. Client-facing routes will live under `/portal`.

## Database summary

No application database migration exists yet. Phase 2 will introduce versioned SQL migrations, UUID primary keys, tenant-scoped relationships, indexes and Row Level Security.

The current recommendation is to store monetary values in integer minor units and tax rates in basis points. This will be confirmed before the financial schema is implemented.

## Row Level Security summary

RLS is not implemented yet because the database schema belongs to Phase 2. Planned policies will isolate workspaces and restrict client users to linked client records and client-visible updates.

## Local setup

Requirements:

- Node.js 22 or newer
- npm
- Git

Install and verify:

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
npm run dev
```

Open `http://localhost:3000`.

`npm install` is required after Phase 1 because new dependencies were added. Once the lockfile is regenerated and committed, clean environments should use `npm ci`.

## Environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

The example currently lists the public Supabase URL, publishable key and site URL. Do not place service-role keys or secrets in `NEXT_PUBLIC_*` variables.

## Supabase setup

Supabase is not connected in Phase 1. Setup, migrations, generated types, authentication redirects and RLS instructions will be added in Phase 2.

## Migrations

No migrations exist yet. Future migrations will be stored in `supabase/migrations` and applied in order through the Supabase CLI.

## Demonstration data

Not implemented. The eventual generator will use authenticated server-side operations protected by RLS and will be idempotent.

## Testing

Current scripts:

```bash
npm run test
npm run test:watch
npm run test:coverage
```

The current tests cover shared class merging, button behavior, field semantics and the empty-state region. Passing results must be confirmed locally or in CI before being recorded.

Playwright scripts are reserved in `package.json`, but Playwright is not installed or configured until Phase 8. Running them now is expected to fail.

## Deployment

The application is not yet prepared for production deployment. Vercel and Supabase redirect configuration will be documented after authentication and all Release 1 checks pass.

## Accessibility approach

The foundation includes:

- Semantic landmarks
- A skip-to-content link
- Visible labels for form controls
- Visible keyboard focus
- Native buttons and inputs
- Error messages with alert semantics
- Loading text for screen readers
- Reduced-motion handling
- Dark and light tokens designed for readable contrast

Automated accessibility testing and documented keyboard workflows are planned for Phase 8.

## Performance approach

Server Components remain the default, and the theme and toast providers are the only global Client Components introduced in this phase. Performance claims will be added only after measurement.

## Security approach

- No secret values are committed
- `.env.local` remains ignored
- Browser-safe environment names are documented separately
- Authorization will be implemented in server code and RLS
- Raw database errors will not be shown to users
- Service-role keys will never be exposed to browser code

See `SECURITY.md` for the current security model and limitations.

## Technical decisions

See `DECISIONS.md`. Decisions are written neutrally until the project owner confirms personal reasoning.

## Trade-offs

- A hosted Supabase development project avoids adding Docker but makes local database resets less convenient.
- Native form primitives are established before React Hook Form integration to keep Phase 1 focused.
- The `/app` route is a clearly labelled shell, not a static replacement for authenticated dashboard data.
- The package lock must be regenerated after dependency installation before `npm ci` can be treated as authoritative.

## Known limitations

- Authentication and tenant isolation do not exist yet.
- The marketing page is only a foundation, not the complete Release 1 site.
- The workspace navigation labels future phases instead of linking to missing routes.
- Browser and accessibility verification still require manual confirmation.
- No production deployment exists.

## Development reflections

The following case-study sections require the project owner’s real experience:

- What I personally learned: pending
- Most difficult implementation problem: pending
- A bug I diagnosed: pending
- A design decision I changed: pending
- What I would improve in a future release: pending

## Roadmap

Development follows the numbered phases in `BUILD_LOG.md`. Release 2 does not start until Release 1 meets its acceptance criteria.

## Author

Project owner details pending confirmation.

## License

No open-source license has been selected yet. Until a license is added, normal copyright restrictions apply.
