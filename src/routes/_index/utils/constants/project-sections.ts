export const FEATURED_PROJECTS_COUNT = 5;

export const DEFAULT_PROJECTS = [
  // ─── 5 Common / Featured Projects ───
  {
    id: "sofa-platform",
    title: "Sofa Platform",
    title_ar: "منصة صوفا",
    description:
      "Production web product work spanning reusable React interfaces, API integration, application state, debugging, and maintainable feature delivery.",
    description_ar:
      "تطوير منتجات ويب إنتاجية تشمل واجهات React قابلة لإعادة الاستخدام، وتكامل واجهات برمجة التطبيقات، وإدارة حالة التطبيق، وتتبع الأخطاء، وتسليم ميزات متماسكة قابلة للصيانة.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/sofa.svg",
    tech_stack: ["React", "TypeScript", "REST", "Tailwind CSS"],
    live_url: "https://play.sofa.ye",
    code_url: null,
  },
  {
    id: "solvera",
    title: "Solvera",
    title_ar: "سولفيرا",
    description:
      "A bilingual luxury perfume storefront and administration dashboard built with Next.js 16, WooCommerce, and full Arabic/English routing.",
    description_ar:
      "متجر إلكتروني ثنائي اللغة للعطور الفاخرة ولوحة تحكم إدارية مبنية باستخدام Next.js 16 وWooCommerce مع دعم توجيه كامل باللغتين العربية والإنجليزية.",
    category: "ecommerce",
    status: "live",
    thumbnail_url: "/projects/solvera.svg",
    tech_stack: ["Next.js 16", "React 19", "WooCommerce", "next-intl"],
    live_url: "https://solvera.sparksoft.io",
    code_url: null,
  },
  {
    id: "sparksoft-platform",
    title: "Sparksoft Platform",
    title_ar: "منصة سبارك سوفت",
    description:
      "The Sparksoft company platform, featuring a fully automated deployment pipeline and production web delivery.",
    description_ar:
      "المنصة التعريفية لشركة سبارك سوفت، تتميز بمسار نشر آلي متكامل وتسليم منتجات ويب إنتاجية.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/sparksoft.svg",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "CI/CD"],
    live_url: "https://sparksoft.io",
    code_url: null,
  },
  {
    id: "hajzak-dashboard",
    title: "HAJZAK",
    title_ar: "لوحة تحكم حجزك",
    description:
      "An operations monitoring and host management dashboard platform for vacation rentals, bookings, and property operations.",
    description_ar:
      "منظومة رقمية لمتابعة عمليات وإدارة بيوت العطلات والحجوزات والمضيفين وعمليات العقارات.",
    category: "dashboard",
    status: "live",
    thumbnail_url: "/projects/hajzak-console.svg",
    tech_stack: ["Next.js 16", "PostgREST", "shadcn", "RTL"],
    live_url: null, // Private internal dashboard (hajzak.mrerr.com) — no navigation link
    code_url: null,
  },
  {
    id: "hareer",
    title: "Hareer",
    title_ar: "حرير",
    description:
      "A production web product delivered for Sparksoft, built with a modern Next.js and TypeScript stack.",
    description_ar:
      "منتج ويب إنتاجي تم تنفيذه لصالح شركة سبارك سوفت، مبني بتقنيات حديثة تشمل Next.js وTypeScript.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/hareer.svg",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    live_url: "https://hareer.sparksoft.io",
    code_url: null,
  },

  // ─── Additional Projects (Available under "Read More") ───
  {
    id: "mrerror",
    title: "Mr.Err — mrerr.com",
    title_ar: "مستر إيرور — mrerr.com",
    description:
      "The public personal site and brand home for Mr.Err. A fast, animated React + Vite experience with custom sections, dark theme, and GitHub-driven metrics.",
    description_ar:
      "الموقع الشخصي والواجهة العامة لمستر إيرور. تجربة سريعة وتفاعلية مبنية بـ React وVite مع نمط داكن وإحصائيات GitHub.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/mrerror.png",
    tech_stack: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    live_url: "https://www.mrerr.com",
    code_url: "https://github.com/G9T3N/Mrerror",
  },
  {
    id: "mrerr-platform",
    title: "MRERR Platform",
    title_ar: "منصة مستر إيرور الموحدة",
    description:
      "A Turborepo monorepo powering mrerr.com, me.mrerr.com, and dashboard.mrerr.com with shared UI, design, and database packages.",
    description_ar:
      "مستودع موحد (Turborepo) يدير مواقع mrerr.com وme.mrerr.com وdashboard.mrerr.com مع حزم مشتركة للواجهات والتصميم وقواعد البيانات.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/mrerr-platform.svg",
    tech_stack: ["React Router v7", "Turborepo", "pnpm", "TypeScript"],
    live_url: null,
    code_url: "https://github.com/G9T3N/me.portfolify",
  },
  {
    id: "portfolify-project",
    title: "Mr.Err Portfolio",
    title_ar: "محفظة مستر إيرور",
    description:
      "This site: an interactive React Router v7 portfolio with a Supabase CMS, bilingual Arabic/English content, and a custom admin dashboard.",
    description_ar:
      "محفظة أعمال تفاعلية مبنية باستخدام React Router v7 مع نظام إدارة محتوى Supabase ودعم كامل للغتين العربية والإنجليزية ولوحة تحكم مخصصة.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/portfolify.svg",
    tech_stack: ["React Router v7", "Supabase", "Framer Motion", "Tailwind CSS"],
    live_url: null,
    code_url: "https://github.com/G9T3N/portfolify",
  },
  {
    id: "portfoliofy",
    title: "Portfoliofy",
    title_ar: "بورتفوليفاي",
    description:
      "A modern, data-driven portfolio generator that keeps a developer's showcase automatically in sync without manual updates.",
    description_ar: "مولد محفظة أعمال حديث قائم على البيانات يُبقي مشاريع المطور متزامنة تلقائياً.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/portfoliofy.svg",
    tech_stack: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    live_url: null,
    code_url: "https://github.com/G9T3N/old-porto",
  },
  {
    id: "digital-market",
    title: "Digital Market",
    title_ar: "السوق الرقمي",
    description:
      "A production e-commerce marketplace with catalog, search, cart, multi-currency, and bilingual storefront experience.",
    description_ar:
      "سوق تجارة إلكترونية متكامل يضم دليلاً للمنتجات والبحث وسلة التسوق ودعم تعدد العملات واللغات.",
    category: "ecommerce",
    status: "live",
    thumbnail_url: "/projects/digitalmarket.png",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "REST"],
    live_url: "https://digitalmarket.coder4u.com",
    code_url: null,
  },
  {
    id: "hajzak-user",
    title: "HAJZAK User App",
    title_ar: "تطبيق حجزك للمستخدمين",
    description:
      "A Flutter mobile app for discovering and booking Yemen's finest recreational properties, with BLoC state management and Firebase backend.",
    description_ar:
      "تطبيق Flutter لحجز بيوت واستراحات العطلات في اليمن، مع إدارة الحالة عبر BLoC وخدمات Firebase.",
    category: "mobile",
    status: "live",
    thumbnail_url: "/projects/hajzak-user.svg",
    tech_stack: ["Flutter", "Dart", "BLoC", "Firebase"],
    live_url: null,
    code_url: null,
  },
  {
    id: "hajzak-console",
    title: "HAJZAK Admin Console",
    title_ar: "لوحة تحكم حجزك الإدارية",
    description:
      "An Arabic-first RTL web admin panel for property review, approval, and operations monitoring, built with Next.js 16 and PostgREST.",
    description_ar:
      "لوحة تحكم إدارية باللغة العربية لمراجعة العقارات واعتمادها ومتابعة الحجوزات، مبنية بـ Next.js 16 وPostgREST.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/hajzak-console.svg",
    tech_stack: ["Next.js 16", "PostgREST", "shadcn", "RTL"],
    live_url: null,
    code_url: null,
  },
  {
    id: "code4u",
    title: "Code4U",
    title_ar: "كود فور يو",
    description:
      "A Sparksoft front-end application platform sharing the organization's component and tooling conventions.",
    description_ar: "منصة ويب متكاملة تابعة لسبارك سوفت وتعتمد معايير وأدوات الفريق البرمجية.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/code4u.svg",
    tech_stack: ["TypeScript", "React", "Web"],
    live_url: null,
    code_url: null,
  },
  {
    id: "landing-page",
    title: "Landing Page System",
    title_ar: "نظام الصفحات التعريفية",
    description:
      "A reusable Next.js marketing and landing page system used across Sparksoft products.",
    description_ar: "منظومة صفحات هبوط تسويقية قابلة لإعادة الاستخدام في منتجات ومشاريع سبارك سوفت.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/landing-page.svg",
    tech_stack: ["Next.js", "React", "Tailwind CSS"],
    live_url: null,
    code_url: null,
  },
  {
    id: "big-cart",
    title: "Big Cart",
    title_ar: "بيغ كارت",
    description:
      "A cross-platform Flutter commerce application exploring scalable mobile shopping experiences.",
    description_ar: "تطبيق تسوق رقمي متعدد المنصات مبني بتقنية Flutter لتقديم تجربة شراء سلسة.",
    category: "mobile",
    status: "live",
    thumbnail_url: "/projects/big-cart.svg",
    tech_stack: ["Flutter", "Dart", "Mobile"],
    live_url: null,
    code_url: "https://github.com/Big-cart/BIG-CART",
  },
  {
    id: "yemen-certificate",
    title: "Yemen Certificate",
    title_ar: "شهادات اليمن",
    description:
      "A certificate issuance and verification platform serving organizations across Yemen.",
    description_ar: "منصة إلكترونية لإصدار الشهادات والتحقق من صحتها مخصصة للمؤسسات في اليمن.",
    category: "web",
    status: "live",
    thumbnail_url: "/projects/yemen-certificate.svg",
    tech_stack: ["PHP", "MySQL", "Web"],
    live_url: null,
    code_url: "https://github.com/G9T3N/yemen-certificate",
  },
  {
    id: "react-screenutil",
    title: "React ScreenUtil",
    title_ar: "React ScreenUtil",
    description:
      "A React/TypeScript port of Flutter's flutter_screenutil, bringing responsive design scaling to React applications. Published on NPM.",
    description_ar:
      "مكتبة مفتوحة المصدر لملائمة أبعاد الشاشات وتجاوب التصاميم في تطبيقات React، منشورة على NPM.",
    category: "open-source",
    status: "live",
    thumbnail_url: "/projects/react-screenutil.svg",
    tech_stack: ["React", "TypeScript", "NPM"],
    live_url: "https://www.npmjs.com/package/@g9t3n/react-screenutil",
    code_url: "https://github.com/G9T3N/react_screenUtils",
  },
  {
    id: "skeletune",
    title: "Skeletune",
    title_ar: "Skeletune",
    description:
      "A small, composable React skeleton loading wrapper component with customizable animation, styling, and children. Published on NPM.",
    description_ar:
      "مكون React مفتوح المصدر لهياكل التحميل (Skeleton) بتأثيرات حركية قابلة للتخصيص، منشور على NPM.",
    category: "open-source",
    status: "live",
    thumbnail_url: "/projects/skeletune.svg",
    tech_stack: ["React", "TypeScript", "NPM", "UnoCSS"],
    live_url: "https://www.npmjs.com/package/@g9t3n/skeletune",
    code_url: "https://github.com/G9T3N/skeletune",
  },
  {
    id: "sparksoft-front-template",
    title: "Sparksoft Front Template",
    title_ar: "قالب واجهات سبارك سوفت",
    description:
      "A reusable front-end starter template standardizing tooling, structure, and conventions across Sparksoft projects.",
    description_ar:
      "قالب بداية قياسي لتطوير الواجهات الأمامية وتوحيد الأدوات وهيكلية الكود في مشاريع الفريق.",
    category: "tooling",
    status: "live",
    thumbnail_url: "/projects/sparksoft-front-template.svg",
    tech_stack: ["React", "TypeScript", "Template"],
    live_url: null,
    code_url: null,
  },
  {
    id: "sparksoft-starter-template",
    title: "Sparksoft E-Commerce Starter",
    title_ar: "قالب متجر سبارك سوفت",
    description:
      "A production-ready Next.js 16 full-stack e-commerce starter with Better-Auth, Prisma, Next-Intl, and shadcn/ui.",
    description_ar:
      "قالب تجارة إلكترونية شامل وجاهز للإنتاج مبني بـ Next.js 16 وPrisma وBetter-Auth ومكتبة shadcn/ui.",
    category: "tooling",
    status: "live",
    thumbnail_url: "/projects/sparksoft-starter-template.svg",
    tech_stack: ["Next.js 16", "Prisma", "Better-Auth", "shadcn/ui"],
    live_url: null,
    code_url: null,
  },
  {
    id: "org-demo-repository",
    title: "Organization Demo Repository",
    title_ar: "مستودع العرض التوضيحي",
    description:
      "A reference repository showcasing GitHub Actions workflows, pages, and organization best practices.",
    description_ar:
      "مستودع مرجعي يستعرض مسارات العمل التلقائية عبر GitHub Actions وأفضل الممارسات.",
    category: "tooling",
    status: "live",
    thumbnail_url: "/projects/demo-repository.svg",
    tech_stack: ["HTML", "GitHub Actions"],
    live_url: null,
    code_url: null,
  },
  {
    id: "open-source-npm",
    title: "Open Source & NPM",
    title_ar: "حزم ومصادر مفتوحة على NPM",
    description:
      "Reusable React utilities and Mapbox tooling published under the g9t3n namespace, including Skeletune and geospatial packages.",
    description_ar:
      "مكتبات برمجية وأدوات تفاعلية لـ React وخرائط Mapbox منشورة للمجتمع التقني تحت مساحة g9t3n.",
    category: "open-source",
    status: "live",
    thumbnail_url: null,
    tech_stack: ["NPM", "React", "Mapbox", "Open Source"],
    live_url: "https://www.npmjs.com/~g9t3n",
    code_url: "https://github.com/G9T3N",
  },
];
