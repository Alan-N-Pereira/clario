-- Keep a public application profile in sync when a Supabase Auth user
-- is created. The auth schema itself is not exposed through the normal
-- Supabase Data API.

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    full_name
  )
  values (
    new.id,
    nullif(
      trim(
        coalesce(
          new.raw_user_meta_data ->> 'full_name',
          ''
        )
      ),
      ''
    )
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

revoke execute
on function public.handle_new_user()
from public, anon, authenticated;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();


-- Backfill profiles if a development Auth user already existed before
-- this trigger was introduced.

insert into public.profiles (
  id,
  full_name
)
select
  users.id,
  nullif(
    trim(
      coalesce(
        users.raw_user_meta_data ->> 'full_name',
        ''
      )
    ),
    ''
  )
from auth.users as users
on conflict (id) do nothing;


-- Create a workspace and its first owner atomically.
--
-- Normal authenticated users do not receive direct INSERT privileges on
-- workspaces or workspace_members. They use this narrow database function
-- during onboarding instead.

create function public.create_workspace(workspace_name text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  normalized_name text := trim(workspace_name);
  new_workspace_id uuid;
begin
  if current_user_id is null then
    raise exception 'Authentication required'
      using errcode = '28000';
  end if;

  if normalized_name is null
    or char_length(normalized_name) < 1
    or char_length(normalized_name) > 120
  then
    raise exception 'Workspace name must contain between 1 and 120 characters'
      using errcode = '22023';
  end if;

  insert into public.profiles (id)
  values (current_user_id)
  on conflict (id) do nothing;

  insert into public.workspaces (name)
  values (normalized_name)
  returning id into new_workspace_id;

  insert into public.workspace_members (
    workspace_id,
    user_id,
    role
  )
  values (
    new_workspace_id,
    current_user_id,
    'owner'
  );

  return new_workspace_id;
end;
$$;

revoke execute
on function public.create_workspace(text)
from public, anon;

grant execute
on function public.create_workspace(text)
to authenticated;


-- Be explicit about which Data API operations each role may perform.
--
-- RLS still determines which individual rows an authenticated user may
-- access.

revoke all
on table
  public.profiles,
  public.workspaces,
  public.workspace_members
from anon;

revoke all
on table
  public.profiles,
  public.workspaces,
  public.workspace_members
from authenticated;

grant select, update
on table public.profiles
to authenticated;

grant select, update
on table public.workspaces
to authenticated;

grant select
on table public.workspace_members
to authenticated;