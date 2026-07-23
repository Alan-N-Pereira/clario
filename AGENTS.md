# Clario contributor instructions

## Project purpose

Clario is a portfolio SaaS application for managing leads, clients, projects, proposals, invoices and client-visible updates. The code should remain understandable enough for the project owner to explain in an interview.

## Current status

Phase 1 establishes tooling, design tokens, shared UI primitives and layout foundations. Do not describe authentication, database access or business workflows as implemented.

## Architecture conventions

- Use the Next.js App Router.
- Prefer Server Components for pages and initial data.
- Add `"use client"` only when browser state, effects or event handlers require it.
- Keep feature-specific code in `src/features/<feature>`.
- Keep reusable visual primitives in `src/components`.
- Keep cross-feature utilities in `src/lib`.
- Keep URL-shareable filters in search parameters.
- Use Server Actions for most mutations and Route Handlers for HTTP-specific flows.
- Validate every mutation on the server.
- Treat PostgreSQL RLS as the final authorization boundary.

## Current Next.js conventions

This repository uses Next.js 16. Consult the installed documentation under `node_modules/next/dist/docs` before relying on remembered framework behavior.

Use `proxy.ts`, not the deprecated `middleware.ts` convention, when Supabase session refresh is introduced.

## TypeScript standards

- Keep strict mode enabled.
- Prefer inferred Zod types at validation boundaries.
- Do not use widespread `any`.
- Avoid non-null assertions unless the invariant is documented.
- Avoid unsafe casts used only to silence errors.
- Keep domain types in one authoritative location.

## Component standards

- Start with native semantic HTML.
- Add ARIA only when native semantics are insufficient.
- Every input requires a visible label.
- Icon-only buttons require an accessible name.
- Dialogs must manage and restore focus.
- Do not communicate state using colour alone.
- Respect reduced-motion preferences.
- Error text should tell the user what happened and what they can do.

## Styling standards

- Use semantic CSS variables rather than hard-coded feature colours.
- Keep one restrained accent colour.
- Use the shared `cn` helper for conditional classes.
- Extend existing primitives before creating nearly identical components.
- Avoid gradients, glass effects and decorative animation without a product reason.

## Security rules

- Never commit secrets.
- Never use a service-role key in browser code.
- Never trust submitted workspace IDs, roles, user IDs, prices or totals.
- Never authorize an action only by hiding a control.
- Enable RLS on every application table.
- Client users must never receive internal notes or internal project updates.
- Return safe errors to users and preserve useful server-side diagnostics.

## Testing expectations

- Test user-visible behavior rather than component internals.
- Add unit tests for calculations, validation, permissions and redirects.
- Add component tests for important forms and interactions.
- Add Playwright tests only after the related workflow exists.
- Never remove a failing test to make the suite pass.
- Never record an unrun test as passing.

## Commands that must pass

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Before Release 1 completion, these must also pass:

```bash
npm run test:e2e
npm run check
```

## Prohibited shortcuts

Do not:

- disable strict TypeScript
- disable ESLint rules to hide errors
- add broad `any` types
- remove tests
- expose secrets
- disable RLS
- replace required business logic with static UI
- fabricate screenshots, test results or performance scores
- claim planned work is implemented

## Documentation rules

Documentation must describe the current repository rather than a generic finished product. Personal reflections remain placeholders until supplied by the project owner. Record command results in `BUILD_LOG.md` only when they were actually run.
