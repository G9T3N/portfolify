-- ==============================================================================
-- Portfolio Content Update for Wael Alamrany (mrerr.com)
-- Run this SQL in your Supabase SQL Editor (Dashboard -> SQL Editor -> New query)
-- This will populate projects, work_experiences, and skill categories with your real data.
-- ==============================================================================

-- 1. CLEAN UP OLD PLACEHOLDER PROJECTS
DELETE FROM public.projects 
WHERE title IN (
  'SecureAuth Dashboard', 
  'CryptoTracker Pro', 
  'HealthSync Mobile', 
  'DevOps Monitor', 
  'test', 
  'asdasd'
) OR description LIKE '%test for the test%' OR live_url LIKE '%example.com%';

-- 2. INSERT / UPDATE REAL PROJECTS
INSERT INTO public.projects (
  id,
  title,
  description,
  full_content,
  category,
  status,
  thumbnail_url,
  live_url,
  code_url,
  tech_stack,
  display_order,
  created_at,
  updated_at
) VALUES 
(
  'e2b4f981-8b3d-4c3e-9c5e-7a1b3c5d7e90',
  'Sofa Platform',
  'Production web product work spanning reusable React interfaces, API integration, application state, debugging, and maintainable feature delivery.',
  'Core web platform engineering at Sofa. Built and maintained complex responsive customer interfaces with React and TypeScript, integrated high-throughput REST APIs, managed complex client state, and ensured smooth production releases.',
  'web',
  'live',
  NULL,
  'https://play.sofa.ye',
  NULL,
  ARRAY['React', 'TypeScript', 'REST', 'Production'],
  1,
  NOW(),
  NOW()
),
(
  'f3c5a092-9c4e-5d4f-ad6f-8b2c4d6e8f01',
  'Portfolify',
  'A TypeScript-based public project focused on modern portfolio/product presentation and reusable frontend structure.',
  'Modern portfolio application engineered with React Router v7, TypeScript, Tailwind CSS, Framer Motion, and Supabase integration. Features dark mode, responsive glassmorphic UI, dynamic project routing, and CMS dashboard management.',
  'web',
  'live',
  NULL,
  NULL,
  'https://github.com/G9T3N/portfolify',
  ARRAY['TypeScript', 'React', 'React Router v7', 'TailwindCSS'],
  2,
  NOW(),
  NOW()
),
(
  'a4d6b103-0d5f-6e5a-be70-9c3d5e7f9a12',
  'Open Source & NPM',
  'Reusable React utilities and Mapbox tooling published under the g9t3n namespace, including Skeletune and geospatial packages.',
  'Open-source ecosystem contributions and NPM packages authored under @g9t3n. Includes Skeletune skeleton loader utilities, Mapbox geospatial UI tools, and developer productivity libraries published for the community.',
  'open-source',
  'live',
  NULL,
  'https://www.npmjs.com/~g9t3n',
  'https://github.com/G9T3N',
  ARRAY['NPM', 'React', 'Mapbox', 'Open Source', 'TypeScript'],
  3,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  full_content = EXCLUDED.full_content,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  live_url = EXCLUDED.live_url,
  code_url = EXCLUDED.code_url,
  tech_stack = EXCLUDED.tech_stack,
  display_order = EXCLUDED.display_order,
  updated_at = NOW();

-- 3. CLEAN UP OLD PLACEHOLDER WORK EXPERIENCES
DELETE FROM public.work_experiences
WHERE company IN (
  'Tech Innovations Inc.',
  'Digital Solutions Ltd.',
  'StartupXYZ'
);

-- 4. INSERT / UPDATE REAL WORK EXPERIENCES
INSERT INTO public.work_experiences (
  id,
  company,
  position,
  location,
  start_date,
  end_date,
  is_current,
  description,
  achievements,
  display_order,
  is_visible,
  created_at
) VALUES
(
  'c1a2b3c4-1111-4444-8888-000000000001',
  'Sofa',
  'Frontend / Full-Stack Product Engineer',
  'Sana''a, Yemen',
  '2023-01-01',
  NULL,
  TRUE,
  'Frontend / full-stack product engineering with React and TypeScript, API integration, reusable UI architecture, debugging, and production delivery.',
  ARRAY[
    'Engineered scalable React & TypeScript production interfaces',
    'Integrated high-throughput REST APIs and client state management',
    'Architected reusable component systems and automated quality checks',
    'Ensured dependable release cadence and continuous production delivery'
  ],
  1,
  TRUE,
  NOW()
),
(
  'c1a2b3c4-2222-4444-8888-000000000002',
  'Sparksoft',
  'Software Engineer',
  'Remote',
  '2023-06-01',
  NULL,
  TRUE,
  'Remote engineering across private production codebases, collaborative Git workflows, dashboards, commerce-oriented products, CI/CD, and quality gates.',
  ARRAY[
    'Collaborative distributed Git workflows across core private repositories',
    'Built responsive dashboards and commerce-oriented products',
    'Configured CI/CD automation pipelines and test coverage gates',
    'Conducted code reviews and refactoring for production reliability'
  ],
  2,
  TRUE,
  NOW()
),
(
  'c1a2b3c4-3333-4444-8888-000000000003',
  'OnePlusOneTech',
  'Software Engineer',
  'Remote',
  '2024-01-01',
  NULL,
  TRUE,
  'Remote software engineering in private repositories with distributed collaboration, feature delivery, debugging, code review practices, and maintainable implementation.',
  ARRAY[
    'Feature delivery and bug fixing across private client applications',
    'Maintained high standards for code readability and architectural separation',
    'Participated in cross-functional planning and engineering design reviews',
    'Implemented clean API contract integrations and data validations'
  ],
  3,
  TRUE,
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  company = EXCLUDED.company,
  position = EXCLUDED.position,
  location = EXCLUDED.location,
  start_date = EXCLUDED.start_date,
  end_date = EXCLUDED.end_date,
  is_current = EXCLUDED.is_current,
  description = EXCLUDED.description,
  achievements = EXCLUDED.achievements,
  display_order = EXCLUDED.display_order,
  is_visible = EXCLUDED.is_visible;

-- 5. INSERT / UPDATE SITE SETTINGS
INSERT INTO public.site_settings (id, key, value, updated_at) VALUES
(
  'e9b02839-b112-4c73-9d5f-b6b01e59bf44',
  'cv_url',
  'https://nazqonifftxawbrzereb.supabase.co/storage/v1/object/public/cv-files/cv-1774151915418.pdf',
  NOW()
),
(
  'd8a1c2e3-f4b5-4a6b-8c7d-9e0f1a2b3c4d',
  'title',
  'Wael Alamrany — Software Engineer | React & TypeScript',
  NOW()
),
(
  'b7a0b1c2-e3d4-4f5a-9b8c-0d1e2f3a4b5c',
  'bio',
  'Software Engineer based in Sana''a, Yemen. Specializing in React, TypeScript, production architectures, and open-source tooling.',
  NOW()
)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = NOW();

-- Output status summary
SELECT 'Migration completed successfully. Projects, experiences, and settings are up to date.' AS status;
