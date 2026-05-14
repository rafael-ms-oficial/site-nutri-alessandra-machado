-- Run this in your Supabase SQL editor to set up the schema

-- Posts table
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_url text,
  category text,
  published boolean default false,
  author text default 'Dra. Alessandra Machado'
);

-- Enable RLS
alter table posts enable row level security;

-- Public can read published posts
create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- Authenticated admin can do everything
create policy "Admins can manage posts"
  on posts for all
  using (auth.role() = 'authenticated');

-- Leads table (quiz submissions)
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  phone text not null,
  email text,
  answers jsonb,
  source text default 'quiz'
);

alter table leads enable row level security;

-- Only admins can read leads
create policy "Admins can read leads"
  on leads for select
  using (auth.role() = 'authenticated');

-- Anyone can insert (quiz submission)
create policy "Anyone can submit lead"
  on leads for insert
  with check (true);

-- Storage bucket for post images
insert into storage.buckets (id, name, public) values ('posts', 'posts', true)
  on conflict do nothing;

create policy "Public read posts bucket"
  on storage.objects for select
  using (bucket_id = 'posts');

create policy "Authenticated upload posts bucket"
  on storage.objects for insert
  with check (bucket_id = 'posts' and auth.role() = 'authenticated');
