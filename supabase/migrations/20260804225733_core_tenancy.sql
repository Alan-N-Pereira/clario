create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text
    check (
      full_name is null
      or char_length(trim(full_name)) between 1 and 100
    ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null
    check (char_length(trim(name)) between 1 and 120),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspace_members (
  workspace_id uuid not null
    references public.workspaces(id) on delete cascade,
  user_id uuid not null
    references public.profiles(id) on delete cascade,
  role text not null
    check (role in ('owner', 'member')),
  joined_at timestamptz not null default now(),

  primary key (workspace_id, user_id)
);

create index workspace_members_user_id_idx
  on public.workspace_members(user_id);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger workspaces_set_updated_at
before update on public.workspaces
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;