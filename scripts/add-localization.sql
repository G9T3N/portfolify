-- ==============================================================================
-- Localization for Portfolio Content (mrerr.com)
-- Run this SQL in your Supabase SQL Editor (Dashboard -> SQL Editor -> New query)
-- Creates a generic `translations` table and seeds Arabic content for projects,
-- work experiences, and site settings. English remains the canonical base.
-- ==============================================================================

-- 1. TRANSLATIONS TABLE
create table if not exists public.translations (
  id uuid primary key default gen_random_uuid(),
  table_name text not null,
  row_id uuid not null,
  locale text not null,
  field text not null,
  value text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (table_name, row_id, locale, field)
);

comment on table public.translations is
  'Localized field overrides for content tables. Base tables stay in English; this table holds per-locale values.';

-- 1b. DEDICATED ARABIC COLUMNS ON CONTENT TABLES
-- Allows editing English and Arabic side-by-side directly in Supabase Studio
alter table public.projects
  add column if not exists title_ar text,
  add column if not exists description_ar text,
  add column if not exists full_content_ar text;

alter table public.work_experiences
  add column if not exists position_ar text,
  add column if not exists description_ar text;

-- 2. ROW LEVEL SECURITY
alter table public.translations enable row level security;

-- Public read is intentional: the portfolio site renders Arabic overrides for
-- anonymous visitors. Reads stay open, writes do not.
drop policy if exists "translations_select_anon" on public.translations;
drop policy if exists "translations_select_authenticated" on public.translations;
drop policy if exists "translations_insert_authenticated" on public.translations;
drop policy if exists "translations_update_authenticated" on public.translations;
drop policy if exists "translations_select_public" on public.translations;
drop policy if exists "translations_admin_insert" on public.translations;
drop policy if exists "translations_admin_update" on public.translations;

create policy "translations_select_public" on public.translations
  for select to anon, authenticated using (true);

-- Writes are admin-only. The previous policies granted every authenticated user
-- insert and update with `true`, so any signed-up account could rewrite the
-- site's published copy.
--
-- Nothing in the app writes this table today — the Arabic content below is
-- seeded from this file, which runs in the SQL editor and therefore as the
-- service role. If a translations admin UI is never built, these two policies
-- can simply be dropped: the service role bypasses RLS regardless.
--
-- INSERT is gated on the column shape too, so an admin cannot store an override
-- that does not correspond to a real content table or field.
create policy "translations_admin_insert" on public.translations
  for insert to authenticated
  with check (
    exists (
      select 1 from public.user_roles
      where user_roles.user_id = auth.uid()
        and user_roles.role = 'admin'
    )
    and table_name in ('projects', 'work_experiences', 'site_settings')
    and field in ('title', 'description', 'full_content', 'position', 'value')
    and locale in ('ar', 'en')
    and char_length(btrim(value)) between 1 and 20000
  );

create policy "translations_admin_update" on public.translations
  for update to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_roles.user_id = auth.uid()
        and user_roles.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.user_roles
      where user_roles.user_id = auth.uid()
        and user_roles.role = 'admin'
    )
    and table_name in ('projects', 'work_experiences', 'site_settings')
    and field in ('title', 'description', 'full_content', 'position', 'value')
    and locale in ('ar', 'en')
    and char_length(btrim(value)) between 1 and 20000
  );

-- No DELETE policy on purpose: deletion stays denied, as it was before. Add one
-- gated on the same admin check if removing stale overrides becomes a need.

-- 3. SEED ARABIC OVERRIDES
--    Locale 'ar' is the only non-English locale today. English values stay in the
--    base tables (canonical) and are used as fallback when no translation exists.

-- 3a. Projects
insert into public.translations (table_name, row_id, locale, field, value) values
('projects', 'e2b4f981-8b3d-4c3e-9c5e-7a1b3c5d7e90', 'ar', 'title',
  'منصة صوفا'),
('projects', 'e2b4f981-8b3d-4c3e-9c5e-7a1b3c5d7e90', 'ar', 'description',
  'تطوير منتجات ويب إنتاجية تشمل واجهات React قابلة لإعادة الاستخدام، وتكامل واجهات برمجة التطبيقات، وإدارة حالة التطبيق، وتتبع الأخطاء، وتسليم ميزات متماسكة قابلة للصيانة.'),
('projects', 'e2b4f981-8b3d-4c3e-9c5e-7a1b3c5d7e90', 'ar', 'full_content',
  'هندسة المنصة الأساسية لتطبيقات الويب في شركة صوفا. بنيت وحافظت على واجهات تفاعلية متجاوبة وعالية الأداء بالاعتماد على React وTypeScript، وتكامل واجهات REST البرمجية، وإدارة حالة العميل، وضمان دورات إطلاق إنتاجية سلسة.'),
('projects', 'f3c5a092-9c4e-5d4f-ad6f-8b2c4d6e8f01', 'ar', 'title',
  'بورتفوليفاي'),
('projects', 'f3c5a092-9c4e-5d4f-ad6f-8b2c4d6e8f01', 'ar', 'description',
  'مشروع عام مبني بلغة TypeScript يركز على العرض العصري للمشاريع والمنتجات، وهندسة واجهات أمامية نموذجية قابلة لإعادة الاستخدام.'),
('projects', 'f3c5a092-9c4e-5d4f-ad6f-8b2c4d6e8f01', 'ar', 'full_content',
  'تطبيق محفظة أعمال حديث مبني باستخدام React Router v7 وTypeScript وTailwind CSS وFramer Motion مع دمج Supabase. يتميز بنمط داكن، وتصاميم زجاجية متجاوبة، وتوجيه ديناميكي للمشاريع، وإدارة محتوى عبر لوحة تحكم متكاملة.'),
('projects', 'a4d6b103-0d5f-6e5a-be70-9c3d5e7f9a12', 'ar', 'title',
  'برمجيات مفتوحة المصدر وnpm'),
('projects', 'a4d6b103-0d5f-6e5a-be70-9c3d5e7f9a12', 'ar', 'description',
  'أدوات React ومكتبات Mapbox منشورة تحت مساحة g9t3n، متضمنةً Skeletune وحزم جغرافية مكانية للمجتمع التقني.'),
('projects', 'a4d6b103-0d5f-6e5a-be70-9c3d5e7f9a12', 'ar', 'full_content',
  'مساهمات نشطة في منظومة المصادر المفتوحة وحزم npm منشورة تحت @g9t3n. تشمل أدوات هياكل التحميل Skeletune، ومكونات Mapbox الجغرافية المكانية، ومكتبات إنتاجية نُشرت للمطورين.')
on conflict (table_name, row_id, locale, field) do update set
  value = excluded.value,
  updated_at = now();

-- 3b. Work experiences
insert into public.translations (table_name, row_id, locale, field, value) values
('work_experiences', 'c1a2b3c4-1111-4444-8888-000000000001', 'ar', 'position',
  'مهندس واجهات أمامية ومطور Full-Stack'),
('work_experiences', 'c1a2b3c4-1111-4444-8888-000000000001', 'ar', 'description',
  'هندسة واجهات أمامية وتطوير برمجيات شامل باستخدام React وTypeScript، وتكامل واجهات REST البرمجية، وهندسة واجهات تفاعلية قابلة لإعادة الاستخدام، وتتبع الأخطاء، وإطلاق الإصدارات الإنتاجية.'),
('work_experiences', 'c1a2b3c4-2222-4444-8888-000000000002', 'ar', 'position',
  'مهندس برمجيات'),
('work_experiences', 'c1a2b3c4-2222-4444-8888-000000000002', 'ar', 'description',
  'تطوير برمجيات عن بُعد عبر قواعد كود إنتاجية، وسير عمل تعاوني عبر Git، ولوحات تحكم تفاعلية، ومنتجات تجارية، ومسارات CI/CD، وبوابات فحص الجودة.'),
('work_experiences', 'c1a2b3c4-3333-4444-8888-000000000003', 'ar', 'position',
  'مهندس برمجيات'),
('work_experiences', 'c1a2b3c4-3333-4444-8888-000000000003', 'ar', 'description',
  'تطوير برمجيات عن بُعد ضمن مستودعات خاصة بالتعاون مع فرق موزعة، وإنجاز الميزات البرمجية، وتتبع الأخطاء وحلها، ومراجعة الكود، وبناء حلول برمجية مستدامة.')
on conflict (table_name, row_id, locale, field) do update set
  value = excluded.value,
  updated_at = now();

-- 3c. Site settings (title + bio only; cv_url is language-neutral)
insert into public.translations (table_name, row_id, locale, field, value) values
('site_settings', 'd8a1c2e3-f4b5-4a6b-8c7d-9e0f1a2b3c4d', 'ar', 'value',
  'وائل العمراني — مهندس برمجيات | React وTypeScript'),
('site_settings', 'b7a0b1c2-e3d4-4f5a-9b8c-0d1e2f3a4b5c', 'ar', 'value',
  'مهندس برمجيات مقيم في صنعاء باليمن. متخصص في React وTypeScript، وبناء المعماريات الإنتاجية، وتطوير الأدوات مفتوحة المصدر.')
on conflict (table_name, row_id, locale, field) do update set
  value = excluded.value,
  updated_at = now();

-- 3d. Direct column updates on base tables for side-by-side editing in Supabase Table Editor
update public.projects set
  title_ar = 'منصة صوفا',
  description_ar = 'تطوير منتجات ويب إنتاجية تشمل واجهات React قابلة لإعادة الاستخدام، وتكامل واجهات برمجة التطبيقات، وإدارة حالة التطبيق، وتتبع الأخطاء، وتسليم ميزات متماسكة قابلة للصيانة.',
  full_content_ar = 'هندسة المنصة الأساسية لتطبيقات الويب في شركة صوفا. بنيت وحافظت على واجهات تفاعلية متجاوبة وعالية الأداء بالاعتماد على React وTypeScript، وتكامل واجهات REST البرمجية، وإدارة حالة العميل، وضمان دورات إطلاق إنتاجية سلسة.'
where id = 'e2b4f981-8b3d-4c3e-9c5e-7a1b3c5d7e90';

update public.projects set
  title_ar = 'بورتفوليفاي',
  description_ar = 'مشروع عام مبني بلغة TypeScript يركز على العرض العصري للمشاريع والمنتجات، وهندسة واجهات أمامية نموذجية قابلة لإعادة الاستخدام.',
  full_content_ar = 'تطبيق محفظة أعمال حديث مبني باستخدام React Router v7 وTypeScript وTailwind CSS وFramer Motion مع دمج Supabase. يتميز بنمط داكن، وتصاميم زجاجية متجاوبة، وتوجيه ديناميكي للمشاريع، وإدارة محتوى عبر لوحة تحكم متكاملة.'
where id = 'f3c5a092-9c4e-5d4f-ad6f-8b2c4d6e8f01';

update public.projects set
  title_ar = 'برمجيات مفتوحة المصدر وnpm',
  description_ar = 'أدوات React ومكتبات Mapbox منشورة تحت مساحة g9t3n، متضمنةً Skeletune وحزم جغرافية مكانية للمجتمع التقني.',
  full_content_ar = 'مساهمات نشطة في منظومة المصادر المفتوحة وحزم npm منشورة تحت @g9t3n. تشمل أدوات هياكل التحميل Skeletune، ومكونات Mapbox الجغرافية المكانية، ومكتبات إنتاجية نُشرت للمطورين.'
where id = 'a4d6b103-0d5f-6e5a-be70-9c3d5e7f9a12';

update public.work_experiences set
  position_ar = 'مهندس واجهات أمامية ومطور Full-Stack',
  description_ar = 'هندسة واجهات أمامية وتطوير برمجيات شامل باستخدام React وTypeScript، وتكامل واجهات REST البرمجية، وهندسة واجهات تفاعلية قابلة لإعادة الاستخدام، وتتبع الأخطاء، وإطلاق الإصدارات الإنتاجية.'
where id = 'c1a2b3c4-1111-4444-8888-000000000001';

update public.work_experiences set
  position_ar = 'مهندس برمجيات',
  description_ar = 'تطوير برمجيات عن بُعد عبر قواعد كود إنتاجية، وسير عمل تعاوني عبر Git، ولوحات تحكم تفاعلية، ومنتجات تجارية، ومسارات CI/CD، وبوابات فحص الجودة.'
where id = 'c1a2b3c4-2222-4444-8888-000000000002';

update public.work_experiences set
  position_ar = 'مهندس برمجيات',
  description_ar = 'تطوير برمجيات عن بُعد ضمن مستودعات خاصة بالتعاون مع فرق موزعة، وإنجاز الميزات البرمجية، وتتبع الأخطاء وحلها، ومراجعة الكود، وبناء حلول برمجية مستدامة.'
where id = 'c1a2b3c4-3333-4444-8888-000000000003';

-- Output status summary
select 'Localization enabled: direct Arabic columns created on base tables, translations table created, and content seeded.' as status;