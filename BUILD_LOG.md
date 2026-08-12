# Clario build log

## Repository

- Repository: `Alan-N-Pereira/clario`
- Default branch: `main`
- Development method: numbered phases with user verification between phases

## Current phase

### Phase 2 â€” Supabase schema, RLS and authentication

Status: **Complete**

### Confirmed implementation

Phase 2 introduced:

- hosted Supabase development connectivity
- validated browser-safe environment configuration
- browser, server and Proxy Supabase clients
- generated Supabase TypeScript database definitions
- core profile, workspace and workspace-membership schema
- Row Level Security
- private authorization helper functions
- automatic Auth-user profile provisioning
- controlled workspace creation
- email/password sign-up and sign-in
- email confirmation
- sign out
- password recovery
- cookie-backed SSR sessions
- Next.js Proxy session refresh
- protected `/app` routes
- real authenticated tenant-isolation verification

### Phase 2 migrations

Confirmed migrations:

- `20260804225733_core_tenancy.sql`
- `20260804235001_core_tenancy_rls.sql`
- `20260805143251_user_provisioning.sql`
- `20260805152846_harden_security_definer_functions.sql`

The migrations were applied to the linked hosted development project.

### Confirmed database model

Current application tables:

- `profiles`
- `workspaces`
- `workspace_members`

Confirmed architectural boundaries:

- `auth.users` is the authentication identity source.
- `profiles` stores application-user data.
- `workspaces` represents the tenant/business boundary.
- `workspace_members` links internal users to workspaces.
- client-user authorization remains separate and is not implemented yet.
- privileged authorization helpers live in the non-exposed `private` schema.
- `public.create_workspace` is the narrow browser-facing workspace-creation RPC.

### Confirmed tenant-isolation verification

The project owner ran the dedicated RLS integration verification with two real confirmed Auth users.

Confirmed results:

- User A sign-in: passed
- User B sign-in: passed
- own profile access: passed
- own workspace access: passed
- User A blocked from User B's protected records: passed
- User B blocked from User A's protected records: passed
- anonymous workspace access blocked: passed
- `npm run test:rls`: passed

### Confirmed authentication verification

The project owner manually confirmed:

- sign-up page loaded
- sign-up reached the check-email page
- confirmation email was received
- confirmation returned to `/app`
- the confirmed Auth user existed
- the corresponding profile row existed
- sign-in reached `/app`
- sign out worked on desktop
- sign out worked at a 320-pixel viewport
- password recovery email was received
- recovery reached the reset-password page
- a new password was accepted
- the previous password was rejected
- the new password successfully signed in
- signed-out access to `/app` redirected to sign-in
- authenticated `/app` access worked
- authenticated refreshes remained signed in
- no workspace flash was observed while signed out
- protected routing worked at a 320-pixel viewport
- no mobile horizontal overflow was observed during the protected-route check

### Generated database types

The project owner confirmed that generated Supabase TypeScript definitions include:

- `profiles`
- `workspaces`
- `workspace_members`
- `create_workspace`

The generated definitions are used by:

- the browser Supabase client
- the server Supabase client
- the Proxy Supabase client

### Latest confirmed automated verification before final Phase 2 documentation cleanup

Confirmed results:

- lint: passed
- type-check: passed
- test files: 6 passed
- tests: 21 passed
- production build: passed

### Remaining Phase 2 work

- synchronize documentation with the implemented state
- remove the stale Phase 1 CI branch filter
- run the final complete verification
- manually confirm the final user-facing status copy
- record the final Phase 2 result
- commit and push the Phase 2 wrap-up

## Phase history

### Phase 0 â€” Repository audit and implementation plan

Status: **Complete**

Confirmed from the repository audit:

- The repository began as a Create Next App scaffold.
- Strict TypeScript was already enabled.
- No Clario feature implementation existed.
- Next.js App Router, React, Tailwind CSS and ESLint were already configured.

Command results from the project owner were not supplied for Phase 0.

Browser verification from the project owner was not supplied for Phase 0.

### Phase 1 â€” Tooling and design foundation

Status: **Complete**

Completed work:

- Added the Clario marketing page.
- Added an application-shell preview.
- Added responsive layout foundations.
- Added light, dark and system theme support.
- Added reusable interface components.
- Added accessibility foundations, including visible focus and skip navigation.
- Added loading, empty and error state components.
- Added Vitest and React Testing Library configuration.
- Added initial project, security and architectural documentation.
- Added required lint, type-check, test and build scripts.
- Reworked the homepage copy around a concrete freelance web designer and bakery example.
- Added mobile navigation from `/app` back to the homepage.

## Phase 1 ownership checkpoint

### What was built

Phase 1 added the Clario marketing page, application-shell preview, responsive design foundation, light and dark themes, reusable interface components, accessibility foundations, automated test configuration and initial documentation.

### Technical decision confirmed by the project owner

The project owner agreed with explaining Clario through the example of a freelance web designer working with a bakery because it makes the product easier for a first-time visitor to understand.

### Topic requiring further explanation

The project owner requested more explanation of how Next.js decides which components run on the server and which run in the browser.

This was explained after the checkpoint:

- App Router components are Server Components by default.
- A file becomes a Client Component boundary when it begins with `"use client"`.
- Client Components are used for state, event handlers, browser APIs and interactive hooks.
- Server Components are preferred for secure data access and initial rendering.

### Manual review completed by the project owner

The project owner reviewed the application at a 320-pixel viewport and identified:

- horizontal overflow in the marketing header
- homepage copy that did not explain Clario clearly enough
- a missing mobile route from `/app` back to the homepage

These issues were corrected and reviewed again.

### Limitation understood by the project owner

At the end of Phase 1, the `/app` page was an application-layout preview only.

Authentication and real client data were intentionally deferred to later phases.

## Phase 1 verification

The following commands were run by the project owner after the final Phase 1 changes.

### Lint

Command:

```bash
npm run lint
```

Result: **Passed**

ESLint completed with no reported errors.

### Type-check

Command:

```bash
npm run typecheck
```

Result: **Passed**

TypeScript completed with no reported errors.

### Tests

Command:

```bash
npm run test
```

Result: **Passed**

Confirmed results:

- Test files: 4 passed
- Tests: 8 passed
- Vitest version: 4.1.10

Test files included:

- `src/lib/utils.test.ts`
- `src/components/ui/field.test.tsx`
- `src/components/shared/empty-state.test.tsx`
- `src/components/ui/button.test.tsx`

### Production build

Command:

```bash
npm run build
```

Result: **Passed**

Confirmed results:

- Next.js version: 16.2.11
- Production compilation completed successfully.
- TypeScript validation completed successfully.
- Static page generation completed successfully.

Generated routes included:

- `/`
- `/_not-found`
- `/app`

### Browser verification

The project owner confirmed that `/` and `/app` were checked in Chrome at:

- desktop width
- 320-pixel mobile width

The project owner confirmed that the application looked correct after the final responsive and navigation fixes.

## Known limitations at the end of Phase 1

At the Phase 1 checkpoint:

- `/app` contained layout demonstration content rather than authenticated workspace data.
- Authentication had not yet been implemented.
- Supabase had not yet been connected.
- Row Level Security policies did not yet exist.
- Lead, client, project, proposal and invoice workflows had not yet been implemented.
- Playwright end-to-end testing had not yet been configured.
- Marketing content described planned Release 1 behaviour and could not imply that those workflows already functioned.

## Diagnosed issues during Phase 1

The following issues were found and corrected:

- The theme toggle synchronously changed state inside an effect and failed the React hooks lint rule.
- Deleted route information remained in `.next` generated types until the build cache was cleared.
- The application navigation accessed a property that was not present on every inferred union member.
- The mobile marketing header overflowed at 320 pixels.
- Homepage copy relied too heavily on product terminology.
- The mobile application shell did not provide a route back to `/`.
- VS Code temporarily displayed a stale TypeScript diagnostic until the TypeScript server was restarted.

## Diagnosed issues during Phase 2

The following issues were encountered and resolved:

- Privileged `SECURITY DEFINER` authorization helpers were initially placed in the exposed `public` schema. They were moved into a non-exposed `private` schema, with only a narrow public workspace-creation wrapper remaining exposed.
- Supabase Free projects using the built-in email provider did not allow custom authentication email templates, so signup confirmation and password recovery used the supported default-email PKCE flow instead.
- Authentication-account cleanup demonstrated the distinction between Supabase Auth identities and application `profiles`; deleting only an application profile is not equivalent to deleting the Auth identity.
- Supabase's built-in authentication email provider imposed low testing-oriented delivery limits, so manual email verification was kept deliberate rather than repeatedly retried.
- Windows PowerShell initially wrote generated Supabase TypeScript definitions using an encoding ESLint interpreted as binary. The generated file was rewritten explicitly as UTF-8 and then passed linting.
- Core tenancy policies were not treated as verified merely because they existed; a dedicated two-user authenticated integration test was added to prove negative cross-tenant access.

## Phase 2 verification philosophy

Phase 2 security behavior is considered verified only where the project owner supplied a passing command or manual result.

In particular:

- successful RLS policy creation alone was not treated as proof of tenant isolation
- successful authentication UI rendering alone was not treated as proof of authentication
- password recovery was verified by proving the old password failed and the new password succeeded
- route protection was verified by manually revisiting `/app` after sign out
- generated database types were verified by checking for the current tables and public workspace RPC

## Next phase

Phase 3 begins only after the final Phase 2 documentation, automated verification, manual verification, commit and push are complete.

Phase 3 will introduce:

- real workspace onboarding
- authenticated workspace context
- real dashboard data
- workspace-level settings needed by later workflows
