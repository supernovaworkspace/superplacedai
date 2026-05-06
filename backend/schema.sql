-- Supabase schema for SuperPlaced AI

create table if not exists users (
  id uuid primary key,
  email text,
  full_name text,
  avatar_url text,
  auth_provider text,
  role text default 'user',
  created_at timestamp with time zone default now()
);

create table if not exists resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  file_url text,
  parsed_text text,
  ats_score integer,
  strengths text[] default array[]::text[],
  weaknesses text[] default array[]::text[],
  created_at timestamp with time zone default now()
);

create table if not exists skill_gaps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  resume_id uuid references resumes(id) on delete cascade,
  existing_skills text[] default array[]::text[],
  missing_skills text[] default array[]::text[],
  roadmap jsonb,
  created_at timestamp with time zone default now()
);

create table if not exists interview_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  interview_type text,
  questions jsonb,
  responses jsonb,
  scores jsonb,
  feedback text,
  overall_score integer,
  created_at timestamp with time zone default now()
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  job_title text,
  company_name text,
  job_description text,
  job_link text,
  referral_link text,
  required_skills text[] default array[]::text[],
  location text,
  job_type text,
  source text,
  created_at timestamp with time zone default now()
);

create table if not exists job_matches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  job_id uuid references jobs(id) on delete cascade,
  match_score float,
  match_reason text,
  status text default 'new',
  created_at timestamp with time zone default now()
);

create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  action text,
  metadata jsonb,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security for all tables
alter table users enable row level security;
alter table resumes enable row level security;
alter table skill_gaps enable row level security;
alter table interview_results enable row level security;
alter table jobs enable row level security;
alter table job_matches enable row level security;
alter table activity_logs enable row level security;

create policy "users_self" on users
  for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "resumes_self" on resumes
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "skill_gaps_self" on skill_gaps
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "interview_results_self" on interview_results
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "job_matches_self" on job_matches
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "activity_logs_self" on activity_logs
  for select
  using (auth.uid() = user_id);
