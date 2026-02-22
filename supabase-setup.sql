-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

create table if not exists gifts (
  id         uuid default gen_random_uuid() primary key,
  gift_id    text not null,
  gift_emoji text not null,
  gift_name  text not null,
  message    text default '',
  sender     text not null default 'Anonymer Held',
  created_at timestamptz default now()
);

-- Allow anyone to INSERT (people sending gifts)
-- Allow anyone to SELECT (Domi viewing gifts)
alter table gifts enable row level security;

create policy "Anyone can send gifts"
  on gifts for insert
  with check (true);

create policy "Anyone can view gifts"
  on gifts for select
  using (true);
