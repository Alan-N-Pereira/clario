-- Internal security-definer functions should not live in an exposed
-- Data API schema. Keep privileged implementations in a private schema.

create schema if not exists private;

revoke all
on schema private
from public, anon, authenticated;

-- Authenticated users need schema usage so RLS expressions and the
-- public workspace wrapper can execute explicitly granted functions.
-- The schema itself remains outside Supabase's exposed API schemas.
grant usage
on schema private
to authenticated;


-- Remove objects that currently depend on the public helper functions
-- so the policies can be recreated with explicit private references.

drop policy if exists "workspaces_select_member"
on public.workspaces;

drop policy if exists "workspaces_update_owner"
on public.workspaces;

drop policy if exists "workspace_members_select_same_workspace"
on public.workspace_members;

drop trigger if exists on_auth_user_created
on auth.users;


-- Move privileged functions into the private schema.

alter function public.is_workspace_member(uuid)
set schema private;

alter function public.is_workspace_owner(uuid)
set schema private;

alter function public.handle_new_user()
set schema private;

alter function public.create_workspace(text)
set schema private;


-- Remove inherited/default execution rights after the move.

revoke all
on function private.is_workspace_member(uuid)
from public, anon, authenticated;

revoke all
on function private.is_workspace_owner(uuid)
from public, anon, authenticated;

revoke all
on function private.handle_new_user()
from public, anon, authenticated;

revoke all
on function private.create_workspace(text)
from public, anon, authenticated;


-- RLS policies execute these helpers as authenticated users.

grant execute
on function private.is_workspace_member(uuid)
to authenticated;

grant execute
on function private.is_workspace_owner(uuid)
to authenticated;


-- The public workspace RPC wrapper executes this implementation.

grant execute
on function private.create_workspace(text)
to authenticated;


-- Recreate the Auth trigger using the private function.

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function private.handle_new_user();


-- Recreate workspace policies using private authorization helpers.

create policy "workspaces_select_member"
on public.workspaces
for select
to authenticated
using (
  private.is_workspace_member(id)
);

create policy "workspaces_update_owner"
on public.workspaces
for update
to authenticated
using (
  private.is_workspace_owner(id)
)
with check (
  private.is_workspace_owner(id)
);

create policy "workspace_members_select_same_workspace"
on public.workspace_members
for select
to authenticated
using (
  private.is_workspace_member(workspace_id)
);


-- Keep only a narrow, non-security-definer function exposed as the
-- application RPC. The privileged work happens in private.create_workspace.

create function public.create_workspace(workspace_name text)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.create_workspace(workspace_name);
$$;

revoke all
on function public.create_workspace(text)
from public, anon;

grant execute
on function public.create_workspace(text)
to authenticated;