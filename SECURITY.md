# Security policy

## Reporting a security problem

Do not open a public issue containing credentials, personal data or a reproducible access-control bypass.

Until a dedicated private reporting address is added, contact the repository owner through an agreed private channel and include:

- the affected route or database object
- the minimum steps needed to reproduce the issue
- the expected and observed access
- whether real data may have been exposed

A dedicated security contact is still pending.

## Current security status

Phase 2 implements Clario's authentication and core multi-tenant security foundation.

Implemented and manually or programmatically verified:

- Supabase email/password authentication
- email confirmation
- sign out
- password recovery
- cookie-backed SSR authentication sessions
- session refresh through Next.js Proxy
- protected `/app` routes
- `profiles`, `workspaces` and `workspace_members`
- Row Level Security on all current application tables
- private privileged authorization helpers
- controlled workspace creation
- two-user cross-workspace isolation testing
- anonymous workspace-access denial

This does not mean Clario is ready for real client production data.

Business-domain authorization, client-portal isolation, end-to-end security tests, deployment hardening and production monitoring remain later work.

## Secret handling

- Real development values belong in `.env.local`.
- Deployment values belong in the deployment platform.
- `.env.local` remains ignored by Git.
- Example environment files contain variable names and safe placeholders only.
- `NEXT_PUBLIC_*` variables are visible to browser code and must never contain privileged secrets.
- Supabase `service_role` keys must never be included in browser code.
- Authentication passwords must never be committed.
- Authentication tokens must never be committed.
- RLS integration-test credentials are supplied temporarily through the local shell rather than repository files.
- Raw confirmation and recovery URLs must not be copied into documentation because they may contain temporary authentication codes.

## Authentication model

Authentication uses Supabase Auth with email/password credentials.

Implemented flows include:

- sign up
- email confirmation
- sign in
- sign out
- password recovery

Signup confirmation and password recovery use Supabase's supported email verification flow and PKCE callbacks.

Authentication forms validate submitted data at the server boundary with Zod before Supabase operations are attempted.

Raw Supabase authentication errors are kept in server-side diagnostics rather than displayed directly to users.

## Session security

Server-side authentication uses `@supabase/ssr`.

Cookie-backed sessions are refreshed through Next.js Proxy for relevant authentication and workspace routes.

Protected workspace layouts independently verify authentication before rendering `/app`.

Proxy routing is therefore not treated as the sole authorization boundary.

## Authorization model

Workspace access is derived from the authenticated Supabase identity and `workspace_members`.

Current rules include:

- users can read their own profile
- users can update their own profile
- workspace members can read workspaces they belong to
- workspace owners can update their workspace
- membership records are visible only for workspaces the authenticated user belongs to
- authenticated users cannot directly create arbitrary workspace memberships
- anonymous users cannot access workspace data

Client-user authorization remains planned.

Client users will be separate from internal workspace members and must not receive internal workspace privileges.

## Database privilege model

Current application tables:

- `profiles`
- `workspaces`
- `workspace_members`

Privileged authorization helpers live in a non-exposed `private` PostgreSQL schema.

The privileged workspace-creation implementation also lives in `private`.

The exposed `public.create_workspace` RPC is intentionally narrow and delegates to the private implementation.

Authenticated application users do not receive unrestricted direct insert/delete privileges across the tenancy tables.

## Row Level Security

Every current application table has Row Level Security enabled.

Phase 2 includes an integration verification that signs in two confirmed Auth users and checks:

- User A can read User A's own profile
- User A can read User A's own workspace and owner membership
- User B can read User B's own profile
- User B can read User B's own workspace and owner membership
- User A receives no protected User B records
- User B receives no protected User A records
- anonymous workspace access is denied

The integration verification runs through:

```bash
npm run test:rls
```

The RLS test requires controlled development identities and temporary credentials.

Those credentials must not be stored in the repository.

Future lead, client, project, update, proposal, invoice and portal tables must receive their own RLS policies before being treated as complete.

## Server mutation rules

Current and future server mutations should follow these rules:

- validate untrusted input before database mutation
- derive authenticated user identity from the validated session rather than user-supplied IDs
- derive workspace ownership or membership from trusted database relationships
- do not accept arbitrary owner IDs from browser form input
- keep privileged database functions narrowly scoped
- avoid exposing raw database errors or stack traces to users
- use ordinary React rendering for user-generated text rather than injecting raw HTML
- recalculate financial totals on trusted server/database boundaries when financial workflows are introduced
- validate redirect destinations if user-controlled redirects are introduced

## Client-user boundary

Client users are intentionally separate from internal workspace members.

When the client portal is implemented, client users must not be able to read:

- unrelated clients
- leads
- internal notes
- internal-only project updates
- workspace analytics
- workspace settings
- other internal operational data

Client-portal implementation is not complete until negative access cases are verified.

## Dependency review

Dependencies should be installed from maintained packages, committed in the lockfile and reviewed during each phase.

Security findings must not be hidden by:

- disabling TypeScript checks
- suppressing ESLint rules without justification
- replacing security behavior with fake implementations
- exposing elevated database credentials
- applying destructive dependency upgrades only to silence audit output

## Continuous integration

The standard CI workflow runs:

- lint
- TypeScript type-checking
- unit/component tests
- production build

The hosted RLS integration test is not part of ordinary CI because it requires controlled real Auth identities and credentials.

Its exclusion from CI does not replace the requirement to run it when tenancy policies materially change.

## Supabase development limitations

Clario currently uses the Supabase Free plan.

The built-in authentication email provider is suitable for development testing but has low delivery limits.

Authentication testing should therefore avoid unnecessary repeated email requests.

The hosted project may also become inactive after periods without use.

No fake keep-alive traffic should be used to defeat hosting limits.

## Known demonstration limitations

- application-level rate limiting has not been implemented
- lead authorization is not implemented because lead tables do not exist yet
- client authorization is not implemented because client tables do not exist yet
- project authorization is not implemented because project tables do not exist yet
- proposal and invoice authorization are not implemented because those tables do not exist yet
- client-user and portal authorization are not implemented yet
- Playwright end-to-end security testing is not configured yet
- production monitoring is not configured
- a formal incident-response process is not configured
- production deployment has not been completed