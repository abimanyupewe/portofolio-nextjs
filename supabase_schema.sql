-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: Profile (Singleton, usually just 1 row)
create table public.profile (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  taglines text[] default '{}',
  bio text,
  avatar_url text,
  social_links jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: Projects
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  content text, -- Rich text or MD
  category text[] default '{}',
  status text[] default '{}',
  language text[] default '{}',
  preview_link text,
  repo_link text,
  thumbnail_url text, -- Main cover
  gallery_urls text[] default '{}', -- Sidebar gallery
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: Blogs
create table public.blogs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  thumbnail_url text,
  tags text[] default '{}',
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: Experiences
create table public.experiences (
  id uuid default uuid_generate_v4() primary key,
  company text not null,
  position text not null,
  duration text, -- e.g. "2023 - Present"
  description text,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: Certificates
create table public.certificates (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  issuer text,
  date date,
  credential_url text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: Skills
create table public.skills (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text, -- "Framework", "Language", "Tool"
  percentage integer default 0,
  icon_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Row Level Security)
-- Allow Public Read Access
alter table public.profile enable row level security;
create policy "Public Usage" on public.profile for select using (true);
create policy "Admin Update" on public.profile for all using (true); -- Simplified for now (ideally check auth)

alter table public.projects enable row level security;
create policy "Public Usage" on public.projects for select using (true);
create policy "Admin Update" on public.projects for all using (true); 

alter table public.blogs enable row level security;
create policy "Public Usage" on public.blogs for select using (true);
create policy "Admin Update" on public.blogs for all using (true);

alter table public.experiences enable row level security;
create policy "Public Usage" on public.experiences for select using (true);
create policy "Admin Update" on public.experiences for all using (true);

alter table public.certificates enable row level security;
create policy "Public Usage" on public.certificates for select using (true);
create policy "Admin Update" on public.certificates for all using (true);

alter table public.skills enable row level security;
create policy "Public Usage" on public.skills for select using (true);
create policy "Admin Update" on public.skills for all using (true);

-- STORAGE BUCKET SETUP (Run this in the SQL Editor too if it supports it, or use UI)
-- insert into storage.buckets (id, name, public) values ('portfolio-assets', 'portfolio-assets', true);
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'portfolio-assets' );
-- create policy "Admin Insert" on storage.objects for insert with check ( bucket_id = 'portfolio-assets' );
