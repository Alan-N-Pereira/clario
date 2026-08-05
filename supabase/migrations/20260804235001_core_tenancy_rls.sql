create function public.is_workspace_member(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.workspace_members
    where workspace_members.workspace_id = target_workspace_id
      and workspace_members.user_id = (select auth.uid())
  );
$$;

create function public.is_workspace_owner(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.workspace_members
    where workspace_members.workspace_id = target_workspace_id
      and workspace_members.user_id = (select auth.uid())
      and workspace_members.role = 'owner'
  );
$$;

revoke all
on function public.is_workspace_member(uuid)
from public;

revoke all
on function public.is_workspace_owner(uuid)
from public;

grant execute
on function public.is_workspace_member(uuid)
to authenticated;

grant execute
on function public.is_workspace_owner(uuid)
to authenticated;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (
  (select auth.uid()) = id
);

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (
  (select auth.uid()) = id
)
with check (
  (select auth.uid()) = id
);

create policy "workspaces_select_member"
on public.workspaces
for select
to authenticated
using (
  public.is_workspace_member(id)
);

create policy "workspaces_update_owner"
on public.workspaces
for update
to authenticated
using (
  public.is_workspace_owner(id)
)
with check (
  public.is_workspace_owner(id)
);

create policy "workspace_members_select_same_workspace"
on public.workspace_members
for select
to authenticated
using (
  public.is_workspace_member(workspace_id)
);