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
  'عمل إنتاجي على منتجات الويب يشمل واجهات React قابلة لإعادة الاستخدام، ودمج واجهات برمجة التطبيقات، وإدارة حالة التطبيق، وتصحيح الأخطاء، وتقديم ميزات قابلة للصيانة.'),
('projects', 'e2b4f981-8b3d-4c3e-9c5e-7a1b3c5d7e90', 'ar', 'full_content',
  'هندسة المنصة الأساسية لتطبيقات الويب في شركة صوفا. بنيت وحافظت على واجهات عملاء تفاعلية ومعقدة ومتجاوبة باستخدام React وTypeScript، ودمجت واجهات برمجة تطبيقات REST عالية الإنتاجية، وأدرت حالة عميل معقدة، وضمنت إصدارات إنتاجية سلسة.'),
('projects', 'f3c5a092-9c4e-5d4f-ad6f-8b2c4d6e8f01', 'ar', 'title',
  'بورتفوليفاي'),
('projects', 'f3c5a092-9c4e-5d4f-ad6f-8b2c4d6e8f01', 'ar', 'description',
  'مشروع عام مبني بلغة TypeScript يركز على العرض العصري للمحافظ والمنتجات وهيكلية واجهات أمامية قابلة لإعادة الاستخدام.'),
('projects', 'f3c5a092-9c4e-5d4f-ad6f-8b2c4d6e8f01', 'ar', 'full_content',
  'تطبيق محفظة حديث مبني باستخدام React Router v7 وTypeScript وTailwind CSS وFramer Motion مع دمج Supabase. يتميز بالوضع الداكن، وواجهات زجاجية متجاوبة، وتوجيه ديناميكي للمشاريع، وإدارة محتوى عبر لوحة تحكم.'),
('projects', 'a4d6b103-0d5f-6e5a-be70-9c3d5e7f9a12', 'ar', 'title',
  'مصادر مفتوحة و npm'),
('projects', 'a4d6b103-0d5f-6e5a-be70-9c3d5e7f9a12', 'ar', 'description',
  'أدوات React قابلة لإعادة الاستخدام وأدوات Mapbox منشورة تحت مساحة g9t3n، بما في ذلك Skeletune وحزم متعلقة بالجغرافيا المكانية.'),
('projects', 'a4d6b103-0d5f-6e5a-be70-9c3d5e7f9a12', 'ar', 'full_content',
  'مساهمات في النظام البيئي للمصادر المفتوحة وحزم npm منشورة تحت @g9t3n. تشمل أدوات تحميل الهيكل Skeletune، وأدوات واجهات Mapbox الجغرافية المكانية، ومكتبات إنتاجية للمطورين منشورة للمجتمع.')
on conflict (table_name, row_id, locale, field) do update set
  value = excluded.value,
  updated_at = now();

-- 3b. Work experiences
insert into public.translations (table_name, row_id, locale, field, value) values
('work_experiences', 'c1a2b3c4-1111-4444-8888-000000000001', 'ar', 'position',
  'مهندس منتجات أمامية / تطوير كامل'),
('work_experiences', 'c1a2b3c4-1111-4444-8888-000000000001', 'ar', 'description',
  'هندسة منتجات أمامية وتطوير كامل باستخدام React وTypeScript، ودمج واجهات برمجة التطبيقات، وهندسة واجهات قابلة لإعادة الاستخدام، وتصحيح الأخطاء، والتسليم الإنتاجي.'),
('work_experiences', 'c1a2b3c4-2222-4444-8888-000000000002', 'ar', 'position',
  'مهندس برمجيات'),
('work_experiences', 'c1a2b3c4-2222-4444-8888-000000000002', 'ar', 'description',
  'هندسة عن بُعد عبر قواعد أكواد إنتاجية خاصة، وسير عمل Git تعاوني، ولوحات تحكم، ومنتجات تجارية، وخطوط CI/CD، وبوابات جودة.'),
('work_experiences', 'c1a2b3c4-3333-4444-8888-000000000003', 'ar', 'position',
  'مهندس برمجيات'),
('work_experiences', 'c1a2b3c4-3333-4444-8888-000000000003', 'ar', 'description',
  'هندسة برمجيات عن بُعد في مستودعات خاصة مع تعاون موزّع، وتقديم ميزات، وتصحيح أخطاء، ومراجعات كود، وتطبيق قابل للصيانة.')
on conflict (table_name, row_id, locale, field) do update set
  value = excluded.value,
  updated_at = now();

-- 3c. Site settings (title + bio only; cv_url is language-neutral)
insert into public.translations (table_name, row_id, locale, field, value) values
('site_settings', 'd8a1c2e3-f4b5-4a6b-8c7d-9e0f1a2b3c4d', 'ar', 'value',
  'وليد العمراني — مهندس برمجيات | React وTypeScript'),
('site_settings', 'b7a0b1c2-e3d4-4f5a-9b8c-0d1e2f3a4b5c', 'ar', 'value',
  'مهندس برمجيات مقيم في صنعاء، اليمن. متخصص في React وTypeScript والبنى الإنتاجية وأدوات مفتوحة المصدر.')
on conflict (table_name, row_id, locale, field) do update set
  value = excluded.value,
  updated_at = now();

-- Output status summary
select 'Localization enabled: translations table created and Arabic content seeded.' as status;