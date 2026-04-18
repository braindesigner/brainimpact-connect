-- ============================================================
-- BrainImpact Connect - Initial Schema
-- ============================================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "vector";

-- ============================================================
-- ENUMS
-- ============================================================
create type user_role as enum ('solopreneur', 'builder');
create type platform_type as enum ('slack', 'discord', 'kakao', 'notion', 'telegram', 'other');
create type meeting_status as enum ('pending', 'confirmed', 'completed', 'cancelled');
create type collab_type as enum ('sponsorship', 'content', 'membership', 'ama', 'other');

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
create table profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          user_role not null,
  name          text not null,
  email         text not null,
  avatar_url    text,
  bio           text,
  location      text,
  website_url   text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ============================================================
-- SOLOPRENEUR PROFILES
-- ============================================================
create table solopreneur_profiles (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references profiles(id) on delete cascade,
  service_name    text not null,
  service_desc    text,
  categories      text[] default '{}',
  target_audiences text[] default '{}',
  goals           text[] default '{}',
  embedding       vector(1536),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique(user_id)
);

-- ============================================================
-- BUILDER PROFILES
-- ============================================================
create table builder_profiles (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references profiles(id) on delete cascade,
  title           text not null,
  years_exp       int default 0,
  collab_types    collab_type[] default '{}',
  response_hours  int default 24,
  monthly_slots   int default 3,
  is_verified     boolean default false,
  rating          numeric(3,2) default 0,
  review_count    int default 0,
  embedding       vector(1536),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique(user_id)
);

-- ============================================================
-- COMMUNITIES (운영 커뮤니티 목록)
-- ============================================================
create table communities (
  id              uuid primary key default uuid_generate_v4(),
  builder_id      uuid not null references builder_profiles(id) on delete cascade,
  name            text not null,
  platform        platform_type not null,
  member_count    int default 0,
  categories      text[] default '{}',
  member_roles    text[] default '{}',
  description     text,
  is_active       boolean default true,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- PORTFOLIO (협업 사례)
-- ============================================================
create table portfolio_items (
  id              uuid primary key default uuid_generate_v4(),
  builder_id      uuid not null references builder_profiles(id) on delete cascade,
  client_name     text not null,
  result_summary  text not null,
  tags            text[] default '{}',
  period_start    date,
  period_end      date,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- MATCH SESSIONS (AI 매칭 세션)
-- ============================================================
create table match_sessions (
  id              uuid primary key default uuid_generate_v4(),
  solopreneur_id  uuid not null references profiles(id) on delete cascade,
  service_desc    text,
  target_audience text[],
  goals           text[],
  status          text default 'pending',  -- pending | completed
  created_at      timestamptz not null default now()
);

-- ============================================================
-- MATCH RESULTS (매칭 결과)
-- ============================================================
create table match_results (
  id              uuid primary key default uuid_generate_v4(),
  session_id      uuid not null references match_sessions(id) on delete cascade,
  builder_id      uuid not null references builder_profiles(id) on delete cascade,
  score           int not null check (score between 0 and 100),
  reason          text,
  rank            int,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- MEETING REQUESTS
-- ============================================================
create table meetings (
  id              uuid primary key default uuid_generate_v4(),
  requester_id    uuid not null references profiles(id) on delete cascade,
  builder_id      uuid not null references builder_profiles(id) on delete cascade,
  match_result_id uuid references match_results(id),
  status          meeting_status not null default 'pending',
  agenda          text,
  scheduled_at    timestamptz,
  meeting_url     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ============================================================
-- MESSAGES
-- ============================================================
create table messages (
  id              uuid primary key default uuid_generate_v4(),
  sender_id       uuid not null references profiles(id) on delete cascade,
  receiver_id     uuid not null references profiles(id) on delete cascade,
  content         text not null,
  is_read         boolean default false,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- REVIEWS
-- ============================================================
create table reviews (
  id              uuid primary key default uuid_generate_v4(),
  reviewer_id     uuid not null references profiles(id) on delete cascade,
  builder_id      uuid not null references builder_profiles(id) on delete cascade,
  meeting_id      uuid references meetings(id),
  rating          int not null check (rating between 1 and 5),
  comment         text,
  created_at      timestamptz not null default now(),
  unique(reviewer_id, builder_id, meeting_id)
);

-- ============================================================
-- INDEXES
-- ============================================================
create index on solopreneur_profiles using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index on builder_profiles using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index on messages (sender_id, receiver_id, created_at desc);
create index on match_results (session_id, score desc);
create index on meetings (requester_id, status);
create index on meetings (builder_id, status);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table profiles enable row level security;
alter table solopreneur_profiles enable row level security;
alter table builder_profiles enable row level security;
alter table communities enable row level security;
alter table portfolio_items enable row level security;
alter table match_sessions enable row level security;
alter table match_results enable row level security;
alter table meetings enable row level security;
alter table messages enable row level security;
alter table reviews enable row level security;

-- profiles: 본인만 수정, 전체 조회 가능
create policy "profiles_select_all" on profiles for select using (true);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on profiles for insert with check (auth.uid() = id);

-- solopreneur_profiles
create policy "solo_select_all" on solopreneur_profiles for select using (true);
create policy "solo_modify_own" on solopreneur_profiles for all using (auth.uid() = user_id);

-- builder_profiles
create policy "builder_select_all" on builder_profiles for select using (true);
create policy "builder_modify_own" on builder_profiles for all using (auth.uid() = user_id);

-- communities
create policy "community_select_all" on communities for select using (true);
create policy "community_modify_own" on communities for all
  using (auth.uid() = (select user_id from builder_profiles where id = builder_id));

-- portfolio_items
create policy "portfolio_select_all" on portfolio_items for select using (true);
create policy "portfolio_modify_own" on portfolio_items for all
  using (auth.uid() = (select user_id from builder_profiles where id = builder_id));

-- match_sessions: 본인 세션만
create policy "match_sessions_own" on match_sessions for all using (auth.uid() = solopreneur_id);

-- match_results: 세션 소유자 + 해당 빌더
create policy "match_results_select" on match_results for select
  using (
    auth.uid() = (select solopreneur_id from match_sessions where id = session_id)
    or auth.uid() = (select user_id from builder_profiles where id = builder_id)
  );

-- meetings
create policy "meetings_select_own" on meetings for select
  using (auth.uid() = requester_id or auth.uid() = (select user_id from builder_profiles where id = builder_id));
create policy "meetings_insert_requester" on meetings for insert with check (auth.uid() = requester_id);
create policy "meetings_update_own" on meetings for update
  using (auth.uid() = requester_id or auth.uid() = (select user_id from builder_profiles where id = builder_id));

-- messages: 송신자 or 수신자
create policy "messages_own" on messages for select
  using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "messages_insert" on messages for insert with check (auth.uid() = sender_id);
create policy "messages_mark_read" on messages for update
  using (auth.uid() = receiver_id);

-- reviews
create policy "reviews_select_all" on reviews for select using (true);
create policy "reviews_insert_own" on reviews for insert with check (auth.uid() = reviewer_id);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- 빌더 평점 자동 업데이트
create or replace function update_builder_rating()
returns trigger language plpgsql as $$
begin
  update builder_profiles
  set
    rating = (select avg(rating) from reviews where builder_id = new.builder_id),
    review_count = (select count(*) from reviews where builder_id = new.builder_id)
  where id = new.builder_id;
  return new;
end;
$$;

create trigger trg_update_builder_rating
after insert or update on reviews
for each row execute function update_builder_rating();

-- updated_at 자동 갱신
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at before update on profiles
  for each row execute function set_updated_at();
create trigger trg_solopreneur_updated_at before update on solopreneur_profiles
  for each row execute function set_updated_at();
create trigger trg_builder_updated_at before update on builder_profiles
  for each row execute function set_updated_at();
create trigger trg_meetings_updated_at before update on meetings
  for each row execute function set_updated_at();
