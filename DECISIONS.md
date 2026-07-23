# Clario technical decisions

This file records current architectural choices. First-person wording will be added only after the project owner confirms the reasoning.

## D001 — Next.js App Router

Status: active

Clario uses the Next.js App Router so layouts, Server Components, loading states and route-level error boundaries can be composed around the public site, workspace application and client portal.

## D002 — Server Components by default

Status: active

Pages and initial authenticated data should use Server Components. Client Components are reserved for interactions that require browser state, effects or event handlers. This keeps the client JavaScript surface smaller and places sensitive data loading on the server.

## D003 — Supabase for authentication and PostgreSQL

Status: planned for Phase 2

Supabase provides PostgreSQL, authentication and Row Level Security in one hosted platform. The application will use `@supabase/ssr` with separate browser and server clients.

## D004 — Row Level Security is mandatory

Status: planned for Phase 2

Clario is multi-tenant. Filtering by workspace in application code is not sufficient because crafted requests could bypass the interface. Every application table will enable RLS, and negative cross-tenant access cases will be tested.

## D005 — Money in integer minor units

Status: proposed; confirmation required before Phase 6

Monetary values should use integer minor units and tax rates should use basis points. This avoids floating-point rounding errors and gives server calculations a deterministic representation.

## D006 — Client users are separate from workspace members

Status: planned for Phase 2

Workspace members are internal collaborators. Client users have a different trust boundary and must only see records linked through `client_users`. Keeping the relationships separate reduces the risk of granting client users internal workspace privileges.

## D007 — No real payment processing in Release 1

Status: active scope decision

Invoices in Release 1 demonstrate document and status workflows. Payment processing belongs to Release 2 because it introduces subscription, webhook, security and operational requirements that are not necessary for the portfolio MVP.

## D008 — Native form primitives before form orchestration

Status: active in Phase 1

Phase 1 provides labels, inputs, textareas, descriptions and error text using native semantics. React Hook Form and Zod integration will be introduced with real authentication and application forms rather than adding an abstraction without a workflow.

## D009 — Hosted Supabase development project

Status: proposed; confirmation required in Phase 2

The project brief excludes Docker, while the local Supabase stack depends on a compatible container runtime. A dedicated hosted development project is the default alternative, with the trade-off that local resets are less convenient.
