# Clario technical decisions

This file records current architectural choices.

First-person wording will be added only after the project owner confirms the reasoning.

## D001 — Next.js App Router

Status: active

Clario uses the Next.js App Router so layouts, Server Components, loading states and route-level error boundaries can be composed around the public site, authenticated workspace application and later client portal.

## D002 — Server Components by default

Status: active

Pages and initial authenticated data use Server Components by default.

Client Components are reserved for interactions that require browser state, effects, event handlers or browser-only APIs.

This keeps the client JavaScript surface smaller and keeps sensitive initial data access on the server where practical.

## D003 — Supabase for authentication and PostgreSQL

Status: active

Supabase provides PostgreSQL, authentication and Row Level Security for Clario.

The application uses `@supabase/ssr` and `@supabase/supabase-js` with:

- a browser client
- a server client
- a Next.js Proxy client for session refresh

Database TypeScript definitions are generated from the linked hosted development database and supplied to the Supabase clients.

## D004 — Row Level Security is mandatory

Status: active

Clario is multi-tenant.

Filtering by workspace only in application code is not sufficient because crafted requests could bypass the interface.

Every current application table has Row Level Security enabled.

Phase 2 added a dedicated integration verification using two real authenticated users. The verification confirmed that each user could access their own protected records while receiving no protected records from the other tenant.

Anonymous workspace access was also confirmed to be denied.

Future application tables must receive appropriate RLS policies before they are considered complete.

## D005 — Money in integer minor units

Status: proposed; confirmation required before Phase 6

Monetary values should use integer minor units and tax rates should use basis points.

This avoids floating-point rounding errors and gives server calculations a deterministic representation.

This decision must be confirmed when the proposal and invoice schema is implemented.

## D006 — Client users are separate from workspace members

Status: active design decision; implementation pending

Workspace members are internal collaborators.

Client users will have a separate trust boundary and must only see records linked to their client identity.

Client identities must not be implemented as ordinary internal `workspace_members`.

The client-user tables and portal RLS policies will be introduced with the client portal rather than being treated as part of the completed Phase 2 core tenancy schema.

## D007 — No real payment processing in Release 1

Status: active scope decision

Invoices in Release 1 demonstrate document and status workflows.

Real payment processing belongs to a later release because payment providers introduce webhook verification, financial-state synchronization, operational monitoring and additional security requirements that are not necessary for the portfolio MVP.

## D008 — Native form primitives before form orchestration

Status: active

Native form controls remain the visual and semantic foundation.

Authentication forms use Server Actions with Zod validation at the server boundary.

Additional form-orchestration libraries will only be introduced where later application workflows justify the extra abstraction.

## D009 — Hosted Supabase development project

Status: active

Clario uses a dedicated hosted Supabase development project rather than a local Docker-based Supabase stack.

This keeps development compatible with the project's no-Docker constraint.

The trade-off is that:

- local database resets are less convenient
- development depends on the hosted service
- hosted development limits must be respected

## D010 — Privileged database helpers use a private schema

Status: active

Privileged `SECURITY DEFINER` authorization helpers and privileged workspace-creation logic live in the non-exposed `private` PostgreSQL schema.

The exposed `public.create_workspace` function is a narrow security-invoker wrapper around the private implementation.

This reduces the privileged function surface available through the exposed Data API schema.

## D011 — Supabase Free plan for the portfolio release

Status: active

Clario uses the Supabase Free plan for development and the initial portfolio release.

This accepts Free-plan operational limits, including testing-oriented built-in authentication-email limits and possible project pausing after inactivity.

The eventual portfolio presentation will include screenshots and a recorded walkthrough so the project can still be evaluated if the hosted backend is temporarily inactive.

No artificial keep-alive traffic will be used to work around hosting limits.

## D012 — SSR sessions use Next.js Proxy plus server verification

Status: active

Clario uses Next.js `proxy.ts` to keep Supabase cookie-backed authentication sessions refreshed for authentication and workspace routes.

Proxy is not treated as the sole authorization mechanism.

Protected workspace layouts independently verify the authenticated identity before rendering.

PostgreSQL Row Level Security remains the final authorization boundary for database records.

## D013 — Auth identity and application profile are separate concerns

Status: active

Supabase `auth.users` is the source of authentication identity.

`public.profiles` stores application-specific profile data.

A database trigger provisions a profile when a new Auth user is created.

Application code must not treat deleting a `profiles` row as equivalent to deleting an Auth identity.

## D014 — Generated database types are committed

Status: active

Supabase TypeScript database definitions are generated from the linked development schema and committed under:

`src/lib/supabase/database.types.ts`

Browser, server and Proxy Supabase clients use the generated `Database` type.

Generated definitions should be regenerated after relevant schema changes rather than manually edited.