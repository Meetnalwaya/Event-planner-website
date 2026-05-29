-- Royal Events Udaipur — run in Supabase SQL Editor

create extension if not exists "uuid-ossp";

-- Events (portfolio celebrations)
create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text default '',
  location text default '',
  event_date date,
  category text default 'wedding',
  cover_image text default '',
  gallery jsonb default '[]'::jsonb,
  featured boolean default false,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Blog / The Diary
create table if not exists public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  content text default '',
  excerpt text default '',
  featured_image text default '',
  category text default 'inspiration',
  author text default 'Royal Events Udaipur',
  published boolean default false,
  views int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Gallery images
create table if not exists public.gallery_images (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  subtitle text default '',
  image_url text not null,
  category text default 'all',
  aspect_ratio text default '3/4',
  sort_order int default 0,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Testimonials
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  event_type text default '',
  rating int default 5 check (rating >= 1 and rating <= 5),
  content text not null,
  featured boolean default false,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Contact inquiries
create table if not exists public.inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text default '',
  service text default '',
  message text default '',
  status text default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Venues (static content, optional CMS)
create table if not exists public.venues (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text default '',
  location text default '',
  images jsonb default '[]'::jsonb,
  capacity int default 0,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Services
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text default '',
  image text default '',
  features jsonb default '[]'::jsonb,
  sort_order int default 0,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger events_updated before update on public.events
  for each row execute function public.set_updated_at();
create trigger blog_posts_updated before update on public.blog_posts
  for each row execute function public.set_updated_at();
create trigger gallery_images_updated before update on public.gallery_images
  for each row execute function public.set_updated_at();
create trigger testimonials_updated before update on public.testimonials
  for each row execute function public.set_updated_at();
create trigger inquiries_updated before update on public.inquiries
  for each row execute function public.set_updated_at();

-- RLS
alter table public.events enable row level security;
alter table public.blog_posts enable row level security;
alter table public.gallery_images enable row level security;
alter table public.testimonials enable row level security;
alter table public.inquiries enable row level security;
alter table public.venues enable row level security;
alter table public.services enable row level security;

-- Public read published
create policy "Public read published events" on public.events for select using (published = true);
create policy "Public read published blog" on public.blog_posts for select using (published = true);
create policy "Public read published gallery" on public.gallery_images for select using (published = true);
create policy "Public read published testimonials" on public.testimonials for select using (published = true);
create policy "Public read venues" on public.venues for select using (published = true);
create policy "Public read services" on public.services for select using (published = true);

-- Anyone can submit inquiry
create policy "Public insert inquiries" on public.inquiries for insert with check (true);

-- Storage bucket (create in dashboard: media, public)
-- insert policy: authenticated service role only via API
