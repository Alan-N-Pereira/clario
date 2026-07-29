# Security policy

## Reporting a security problem

Do not open a public issue containing credentials, personal data or a reproducible access-control bypass.

Until a private reporting address is added, contact the repository owner through an agreed private channel and include:

- the affected route or database object
- the minimum steps needed to reproduce the issue
- the expected and observed access
- whether real data may have been exposed

A dedicated security contact is still pending.

## Current security status

Phase 1 contains interface and tooling foundations only. It does not yet implement authentication, tenant data or production deployment.

The current repository must not be described as secure for real client data until Phase 2 RLS policies and later security verification are complete.

## Secret handling

- Real values belong in `.env.local` or the deployment platform.
- `.env.local` and other `.env*` files are ignored.
- `.env.example` and `.env.test.example` contain names only.
- `NEXT_PUBLIC_*` variables are visible to browser code and must never contain secrets.
- Supabase service-role keys must never be included in the browser bundle or committed.

## Planned authorization model

Workspace access will be derived from the authenticated user and `workspace_members`.

- Owners can manage owner-only workspace settings.
- Members can manage operational workspace records.
- Client users are linked through `client_users`.
- Client users cannot read leads, internal notes, internal project updates, analytics or workspace settings.

Authorization must be enforced in PostgreSQL RLS and repeated at server mutation boundaries where helpful error handling is required.

## RLS overview

Every application table will enable RLS.

Policies will verify:

- workspace membership
- workspace ownership
- client linkage
- project linkage
- update visibility
- proposal and invoice ownership

Negative tests will prove that records from another workspace or client are not returned.

## Safe application behavior

- Validate mutation input with Zod on the server.
- Derive ownership and workspace context server-side.
- Recalculate financial totals server-side.
- Reject unsafe return URLs.
- Escape user-generated content through normal React rendering.
- Do not expose raw database errors or stack traces to users.
- Keep structured diagnostic details in server logs.

## Dependency review

Dependencies should be installed from their maintained packages, committed in the lockfile and reviewed during each phase. Security findings must not be hidden by disabling checks.

## Known demonstration limitations

- Rate limiting is not implemented in Phase 1.
- Authentication and RLS are not implemented in Phase 1.
- No file uploads, billing webhooks or email delivery exist.
- Production monitoring and a formal incident process are not configured.
