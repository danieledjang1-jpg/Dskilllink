-- DskillLink starter schema for Supabase PostgreSQL
-- Run in Supabase SQL Editor only after reviewing. Uses Row Level Security.
create extension if not exists pgcrypto;
create type public.app_role as enum ('customer','professional','admin');
create type public.job_status as enum ('open','quote_sent','accepted','scheduled','work_started','completed','customer_confirmed','cancelled','disputed');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text,
  avatar_url text,
  role public.app_role not null default 'customer',
  city text,
  neighborhood text,
  bio text,
  is_phone_verified boolean not null default false,
  is_email_verified boolean not null default false,
  is_identity_verified boolean not null default false,
  is_skill_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.professional_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  profession text not null,
  skills text[] not null default '{}',
  services text[] not null default '{}',
  years_experience integer not null default 0 check (years_experience >= 0),
  starting_price numeric(12,2),
  service_area text[] not null default '{}',
  is_available boolean not null default true,
  portfolio jsonb not null default '[]'::jsonb,
  response_rate numeric(5,2) not null default 0,
  updated_at timestamptz not null default now()
);
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id) on delete cascade,
  professional_id uuid references public.profiles(id) on delete set null,
  title text not null,
  category text,
  description text not null,
  location text not null,
  preferred_at timestamptz,
  budget_min numeric(12,2),
  budget_max numeric(12,2),
  urgency text not null default 'normal' check (urgency in ('normal','today','urgent','emergency')),
  status public.job_status not null default 'open',
  attachments jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  professional_id uuid not null references public.profiles(id) on delete cascade,
  labour numeric(12,2) not null check (labour >= 0),
  parts numeric(12,2) not null default 0 check (parts >= 0),
  duration text,
  notes text,
  status text not null default 'pending' check (status in ('pending','accepted','declined','withdrawn')),
  created_at timestamptz not null default now()
);
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete set null,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  professional_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(customer_id, professional_id, job_id)
);
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text,
  attachment_url text,
  attachment_type text,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  check (body is not null or attachment_url is not null)
);
create table if not exists public.saved_professionals (
  customer_id uuid not null references public.profiles(id) on delete cascade,
  professional_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(customer_id, professional_id)
);
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null unique references public.jobs(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  professional_id uuid not null references public.profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  quality integer check (quality between 1 and 5),
  communication integer check (communication between 1 and 5),
  professionalism integer check (professionalism between 1 and 5),
  value_rating integer check (value_rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  read_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists jobs_status_created_idx on public.jobs(status, created_at desc);
create index if not exists jobs_customer_idx on public.jobs(customer_id, created_at desc);
create index if not exists messages_conversation_created_idx on public.messages(conversation_id, created_at);
create index if not exists notifications_user_created_idx on public.notifications(user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.professional_profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.quotes enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.saved_professionals enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;

-- Profiles: public professional discovery; users can only edit their own profile.
create policy "Profiles are viewable by signed-in users" on public.profiles for select to authenticated using (true);
create policy "Users insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "Professional profiles are viewable" on public.professional_profiles for select to authenticated using (true);
create policy "Professionals manage own professional profile" on public.professional_profiles for all to authenticated using (auth.uid() = id) with check (auth.uid() = id);
-- A customer owns their job; assigned professional may view and update job status.
create policy "Customer and assigned professional can view jobs" on public.jobs for select to authenticated using (auth.uid() = customer_id or auth.uid() = professional_id);
create policy "Customers create own jobs" on public.jobs for insert to authenticated with check (auth.uid() = customer_id);
create policy "Job participants update jobs" on public.jobs for update to authenticated using (auth.uid() = customer_id or auth.uid() = professional_id) with check (auth.uid() = customer_id or auth.uid() = professional_id);
create policy "Job participants view quotes" on public.quotes for select to authenticated using (auth.uid() = professional_id or exists(select 1 from public.jobs j where j.id = job_id and j.customer_id = auth.uid()));
create policy "Professionals create own quotes" on public.quotes for insert to authenticated with check (auth.uid() = professional_id);
create policy "Quote participants update quotes" on public.quotes for update to authenticated using (auth.uid() = professional_id or exists(select 1 from public.jobs j where j.id = job_id and j.customer_id = auth.uid()));
create policy "Participants view conversations" on public.conversations for select to authenticated using (auth.uid() = customer_id or auth.uid() = professional_id);
create policy "Customers create conversations" on public.conversations for insert to authenticated with check (auth.uid() = customer_id);
create policy "Participants view messages" on public.messages for select to authenticated using (exists(select 1 from public.conversations c where c.id = conversation_id and auth.uid() in (c.customer_id,c.professional_id)));
create policy "Participants send messages as themselves" on public.messages for insert to authenticated with check (auth.uid() = sender_id and exists(select 1 from public.conversations c where c.id = conversation_id and auth.uid() in (c.customer_id,c.professional_id)));
create policy "Users manage own saved professionals" on public.saved_professionals for all to authenticated using (auth.uid() = customer_id) with check (auth.uid() = customer_id);
create policy "Reviews viewable by signed-in users" on public.reviews for select to authenticated using (true);
create policy "Customers review own completed jobs" on public.reviews for insert to authenticated with check (auth.uid() = customer_id and exists(select 1 from public.jobs j where j.id = job_id and j.customer_id = auth.uid() and j.status in ('completed','customer_confirmed')));
create policy "Users view own notifications" on public.notifications for select to authenticated using (auth.uid() = user_id);
create policy "Users update own notifications" on public.notifications for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Create profile row after signup. Add this trigger only once.
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = '' as $$
begin
 insert into public.profiles(id, full_name, phone, is_email_verified, is_phone_verified)
 values(new.id, coalesce(new.raw_user_meta_data->>'full_name',''), new.phone, new.email_confirmed_at is not null, new.phone_confirmed_at is not null)
 on conflict (id) do nothing;
 return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
