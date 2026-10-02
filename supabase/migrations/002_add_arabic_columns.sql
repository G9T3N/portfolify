-- ==============================================================================
-- Migration: 002_add_arabic_columns.sql
-- Adds dedicated columns for Arabic content to `projects` and `work_experiences`
-- Allows viewing and editing Arabic content directly alongside English in Supabase Studio
-- ==============================================================================

-- 1. Projects Arabic columns
alter table public.projects
  add column if not exists title_ar text,
  add column if not exists description_ar text,
  add column if not exists full_content_ar text;

comment on column public.projects.title_ar is 'Localized project title in Arabic';
comment on column public.projects.description_ar is 'Localized short project description in Arabic';
comment on column public.projects.full_content_ar is 'Localized detailed project description in Arabic';

-- 2. Work Experiences Arabic columns
alter table public.work_experiences
  add column if not exists position_ar text,
  add column if not exists description_ar text;

comment on column public.work_experiences.position_ar is 'Localized job position/title in Arabic';
comment on column public.work_experiences.description_ar is 'Localized job description in Arabic';

-- 3. Backfill from existing translations table if it exists
do $$
begin
  if exists (
    select from information_schema.tables 
    where table_schema = 'public' and table_name = 'translations'
  ) then
    -- Backfill projects
    update public.projects p
    set
      title_ar = coalesce(p.title_ar, (
        select value from public.translations t
        where t.table_name = 'projects'
          and t.row_id = p.id
          and t.locale = 'ar'
          and t.field = 'title'
        limit 1
      )),
      description_ar = coalesce(p.description_ar, (
        select value from public.translations t
        where t.table_name = 'projects'
          and t.row_id = p.id
          and t.locale = 'ar'
          and t.field = 'description'
        limit 1
      )),
      full_content_ar = coalesce(p.full_content_ar, (
        select value from public.translations t
        where t.table_name = 'projects'
          and t.row_id = p.id
          and t.locale = 'ar'
          and t.field = 'full_content'
        limit 1
      ));

    -- Backfill work_experiences
    update public.work_experiences w
    set
      position_ar = coalesce(w.position_ar, (
        select value from public.translations t
        where t.table_name = 'work_experiences'
          and t.row_id = w.id
          and t.locale = 'ar'
          and t.field = 'position'
        limit 1
      )),
      description_ar = coalesce(w.description_ar, (
        select value from public.translations t
        where t.table_name = 'work_experiences'
          and t.row_id = w.id
          and t.locale = 'ar'
          and t.field = 'description'
        limit 1
      ));
  end if;
end $$;
