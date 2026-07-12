# Changelog

## [1.3.0](https://github.com/G9T3N/portfolify/compare/v1.2.0...v1.3.0) (2026-07-12)


### Features

* add light/dark theme variable overrides for custom portfolio palette ([a67801b](https://github.com/G9T3N/portfolify/commit/a67801b7a4b0fa9172a3029411418e6ffe771350))
* add LogoCarousel component with dynamic skill mapping and marquee animation ([5da0c63](https://github.com/G9T3N/portfolify/commit/5da0c63eaa4998fa91db7a51bd51d2c348590565))


### Bug Fixes

* replace hardcoded colors with theme-aware values in dialog, metrics, and lanyard ([3e45855](https://github.com/G9T3N/portfolify/commit/3e45855b8422b793d291ab9c3fd59e8ed8d5127e))

## [1.2.0](https://github.com/G9T3N/portfolify/compare/v1.1.1...v1.2.0) (2026-07-11)


### Features

* add LazyInView component for intersection-based deferred rendering ([8d6e393](https://github.com/G9T3N/portfolify/commit/8d6e393969577f2cf06a59452ebad130a1b4d341))
* add privacy toggle for phone numbers and CV download button to ContactSection ([8bb26e8](https://github.com/G9T3N/portfolify/commit/8bb26e87beee57b6d31577b677817fb914edb726))
* add SEO meta tags, deferred section loading via LazyInView, and TestimonialsSection ([bea856f](https://github.com/G9T3N/portfolify/commit/bea856f2f3702a6ab2a56381fa991b9d05160692))
* add useSiteSetting query hook for fetching individual settings by key ([9070a49](https://github.com/G9T3N/portfolify/commit/9070a497cbbf01c8b3eaa5f2371fa913df464ffa))
* enhance AboutSection with quick stats, CV download link, and lazy-loaded 3D card ([46cc374](https://github.com/G9T3N/portfolify/commit/46cc374297ba235bed97390af5a6d8cebef49f69))
* implement admin dashboard layout, add reusable components, and integrate Vite preload striping directly into configuration. ([b86efc7](https://github.com/G9T3N/portfolify/commit/b86efc73224d59da5a6f3fe67440c82ba93031e6))
* implement core portfolio components including Lanyard, About, a… ([135d860](https://github.com/G9T3N/portfolify/commit/135d86032a7e47358d9229af0714c4c6ffaf3087))
* implement core portfolio components including Lanyard, About, and project display sections ([67b27e1](https://github.com/G9T3N/portfolify/commit/67b27e10dd29ac31d58956493d6e0cae57883386))
* implement dark/light theme toggle and active section scroll spy in Navbar ([4407eff](https://github.com/G9T3N/portfolify/commit/4407eff9083daf134e35036e5264758450476c90))
* implement Navbar component with scroll-spy navigation and theme toggle, and initialize i18n message files. ([aa46075](https://github.com/G9T3N/portfolify/commit/aa460755d6515f490cfef75a0adf4d9a212780a4))
* implement Navbar component with scroll-spy navigation and theme… ([e6bd585](https://github.com/G9T3N/portfolify/commit/e6bd5859c0a15400f55c9f0412d42878f48673de))
* implement sticky navigation bar, project GitHub synchronization dialog, and localized message files ([0ed01d8](https://github.com/G9T3N/portfolify/commit/0ed01d88f96450fa8b458ef7ec2019a63185de9d))
* implement sticky navigation bar, project GitHub synchronization… ([ae4e09a](https://github.com/G9T3N/portfolify/commit/ae4e09a7c05a98890616194c6887f49b24ceac58))
* redesign admin panel with floating sidebar, add GitHub repo sync dialog, and optimize build preload stripping ([b131e7b](https://github.com/G9T3N/portfolify/commit/b131e7b87a5445abe0d68a5a26c6a2b379594791))
* redesign ProjectCard with split layout, dynamic LogoCarousel from skills, and optimize portfolio images ([cfa7e7c](https://github.com/G9T3N/portfolify/commit/cfa7e7c2cefd45a18ca0395523ca3b6fa869a1e4))
* responsive HeroSection layout and optimized Lanyard for mobile performance ([1529f98](https://github.com/G9T3N/portfolify/commit/1529f98160f8334c31cbcf5238bd1c21bb37673e))


### Bug Fixes

* apply CodeRabbit auto-fixes ([aaf22d9](https://github.com/G9T3N/portfolify/commit/aaf22d9e976b18dafae978cc3dedc80dc6c09594))

## [1.1.1](https://github.com/G9T3N/portfolify/compare/v1.1.0...v1.1.1) (2026-06-28)


### Bug Fixes

* update healthcheck host from localhost to 127.0.0.1 in docker-co… ([70c31ca](https://github.com/G9T3N/portfolify/commit/70c31ca45687fce412017e5c2a837594f23b6889))
* update healthcheck host from localhost to 127.0.0.1 in docker-compose.yml ([e920ad9](https://github.com/G9T3N/portfolify/commit/e920ad9f1459b29e97aa002076d3d97b38060def))

## [1.1.0](https://github.com/G9T3N/portfolify/compare/v1.0.0...v1.1.0) (2026-06-28)


### Features

* add GitHub Actions workflow to automate deployment to VPS via SSH ([d9a3c3a](https://github.com/G9T3N/portfolify/commit/d9a3c3a3045570e21f769e78796ea543cc2e711f))
* add GitHub Actions workflow to automate deployment to VPS via SSH ([7acc35f](https://github.com/G9T3N/portfolify/commit/7acc35f805a1c61b41d68a530e7f0f94b7e7b19b))

## 1.0.0 (2026-06-28)


### Features

* add 'About Me' label and center CTA button on mobile ([fb1344a](https://github.com/G9T3N/portfolify/commit/fb1344acec33040872353ad227c779b13e2cb262))
* add AboutSection component ([925a7db](https://github.com/G9T3N/portfolify/commit/925a7db566300b97df36cece74bea29cb713f4c7))
* add AboutSection component and Lanyard styles ([0602e9e](https://github.com/G9T3N/portfolify/commit/0602e9e27c0a199a03330ec2c5caac1a5371b1e9))
* add admin authentication hooks ([94d080a](https://github.com/G9T3N/portfolify/commit/94d080a84ea2a610646984435eb8bfbf391539ab))
* add admin dashboard, UI components, hooks, queries, and utils ([f70705b](https://github.com/G9T3N/portfolify/commit/f70705b25dd4128af282ecdb4e0a3453caac82e5))
* add API query hooks for GitHub, Supabase, and contact ([3813743](https://github.com/G9T3N/portfolify/commit/3813743f91d917792d17a7cbb179c590722595ed))
* add assets, public files, and test page ([5c72119](https://github.com/G9T3N/portfolify/commit/5c7211986439014ae7703d18c5693bc218ff9ecf))
* add card-swapping feature components ([70ed073](https://github.com/G9T3N/portfolify/commit/70ed0737aecc1fdd0741e3f1dd9e3553544455e8))
* add CI pipeline for automated testing, Docker builds, and version management ([fbbe431](https://github.com/G9T3N/portfolify/commit/fbbe431f5437fe8b37172b3188891558a71cba92))
* add ContactForm component and project detail route ([5f8f25d](https://github.com/G9T3N/portfolify/commit/5f8f25deebe0b31a9d289f75563261e413940be1))
* add ContactSection with form and submission handling ([574e5a4](https://github.com/G9T3N/portfolify/commit/574e5a44eb0898a6de7a4865c44c740a68112431))
* add Docker, Nginx, and GitHub Actions CI/CD pipeline for produc… ([dd391bd](https://github.com/G9T3N/portfolify/commit/dd391bd87393dfac5d923944012e75a4a0306dd6))
* add Docker, Nginx, and GitHub Actions CI/CD pipeline for production deployment ([647dc55](https://github.com/G9T3N/portfolify/commit/647dc550bf57b5bb4a5cc60c54a13e76936f8ccb))
* add FeaturedCard component for portfolio post swiper display ([6ee2db1](https://github.com/G9T3N/portfolify/commit/6ee2db1d32a670c8ba814fd88131e5c30c1c28db))
* add FeaturedCard component for portfolio post swiper display ([d889b06](https://github.com/G9T3N/portfolify/commit/d889b06d651e2967628c422b030dbe703756a073))
* add FeaturedCard portfolio component ([cc99026](https://github.com/G9T3N/portfolify/commit/cc990265c83949c5f5e69b89acfa79f30f4f550b))
* add Footer component with social links ([79885bf](https://github.com/G9T3N/portfolify/commit/79885bf571a503d601109b608f90fb338f64c7fd))
* add Gauge component and MetricsModal for portfolio stats ([f4725a4](https://github.com/G9T3N/portfolify/commit/f4725a4dd1c621a9399bc7f987dcf928e622eafd))
* add global styles with dark theme, utilities, and shadcn tokens ([9886006](https://github.com/G9T3N/portfolify/commit/988600627e840c3acb14e13cf85a7b55a7de8860))
* add HeroSection with gradient mesh, CTA, and layout ([0e8bd08](https://github.com/G9T3N/portfolify/commit/0e8bd08f4bb3ecf64da1553f31a6b314196570d3))
* add interactive 3D Lanyard using Three.js and Rapier physics ([a583cf1](https://github.com/G9T3N/portfolify/commit/a583cf15104af583f3a35a4a291888cc56239577))
* add LogoCarousel with marquee animation ([ee011c3](https://github.com/G9T3N/portfolify/commit/ee011c3a95d2f5b3b5fa7dbf5abac1b529798f32))
* add Navbar component with glass effect and scroll handling ([892140e](https://github.com/G9T3N/portfolify/commit/892140e2a3568445f843b290c0f78f88a93124ce))
* add ProjectCard component with tech stack and actions ([bc04d9f](https://github.com/G9T3N/portfolify/commit/bc04d9f1cb6519ac6898f0884d1284a93335fd3b))
* add ProjectsSection with horizontal scroll carousel ([527f1a2](https://github.com/G9T3N/portfolify/commit/527f1a2c909231ab06a458dc6d5dbdad1e103e38))
* add SkillsSection with typography rows and icons ([258edec](https://github.com/G9T3N/portfolify/commit/258edec1a77199ce9a118f18a0a677906e12dafe))
* add stacks management ([8fa1707](https://github.com/G9T3N/portfolify/commit/8fa17077afde7c45903089ce69de2ff7dcf31e16))
* add Supabase client setup and full database type definitions ([4454cd3](https://github.com/G9T3N/portfolify/commit/4454cd30fa1a921703bfc3bc6e8946de72d5b37f))
* add type declarations, root layout, and routing setup ([da028ce](https://github.com/G9T3N/portfolify/commit/da028ce14a4f7df070841f9a24944b1d6d08eb41))
* add useAdminAuth hook and admin dashboard query utilities ([bc30ff3](https://github.com/G9T3N/portfolify/commit/bc30ff381191a7cd8ac490635246479e5508d483))
* add utility library (cn helper) ([496c625](https://github.com/G9T3N/portfolify/commit/496c625533addb10a9bcb4a00b15003e6c02df49))
* extract AuthForm component for admin login ([7752f2e](https://github.com/G9T3N/portfolify/commit/7752f2e7bb37f047594930aeed70d0e4374b8294))
* implement admin auth hook, add Swiper-based UI components, and configure project linting and environment ([d449edf](https://github.com/G9T3N/portfolify/commit/d449edfe1ba3d7727ddbd8ebf83ee9a4ae166c90))
* implement core UI layout utilities, error handling logic, and p… ([a356cf2](https://github.com/G9T3N/portfolify/commit/a356cf25ff422f8a2019e1c74575a17e002d8ed6))
* implement core UI layout utilities, error handling logic, and project configuration documentation ([cf7b8d4](https://github.com/G9T3N/portfolify/commit/cf7b8d409970c7216792d2a74e10039cf210a587))
* implement full-stack portfolio administration system with CI/CD pipelines and UI component library ([c5411c3](https://github.com/G9T3N/portfolify/commit/c5411c37adf333dd1d02192b12cd32c0bc925840))
* integrate i18n provider and optimize font loading ([467f0b4](https://github.com/G9T3N/portfolify/commit/467f0b4aed0e32ae070dd046f87d18c10d080b31))
* integrate ImageCardStack into HeroSection ([87936c7](https://github.com/G9T3N/portfolify/commit/87936c73b52d94846ceb45219a9158d78e78fed7))
* update index and dashboard routes ([d713d3c](https://github.com/G9T3N/portfolify/commit/d713d3c9be58f56d139598718a52e8fe4fce542e))
* update Lanyard and Navbar components ([d2bf0aa](https://github.com/G9T3N/portfolify/commit/d2bf0aa3b098660b04391b2a2107cf8c723de4a0))


### Bug Fixes

* adjust card stack scale and ImageStack padding ([a4faf8c](https://github.com/G9T3N/portfolify/commit/a4faf8c2297fa635b3048343c645fe6dcd987cc0))
* apply CodeRabbit auto-fixes ([14f7216](https://github.com/G9T3N/portfolify/commit/14f7216fb903b4774120a14672d83c37beff88f9))
* apply CodeRabbit auto-fixes ([fdca89f](https://github.com/G9T3N/portfolify/commit/fdca89f64e84a38ea4580337849b18d0f48c022c))
* apply CodeRabbit auto-fixes ([e19e699](https://github.com/G9T3N/portfolify/commit/e19e6995eb38d29b0981568af7a7469dd0629237))
* improve Contact and Hero section layout for mobile responsiveness ([b2d2fe5](https://github.com/G9T3N/portfolify/commit/b2d2fe590a7b2b1dcf8a33ef7c0d9cb26f9b7a6f))
* improve Navbar responsiveness with full-width layout and scrollable links ([2ee2cc2](https://github.com/G9T3N/portfolify/commit/2ee2cc2953d3027f4b198bff515938ce06f7821d))
* layouting and spacing errors ([fbd40b1](https://github.com/G9T3N/portfolify/commit/fbd40b17c85aa83f5120362a92316d70ed001c21))
* remove lg:text-9xl from skills section for responsive consistency ([09aa1c6](https://github.com/G9T3N/portfolify/commit/09aa1c6cbd33a5245415c56f2971cb48a76d2978))
* the size in mobild view ([c39d1df](https://github.com/G9T3N/portfolify/commit/c39d1df8cf0b407eb0e8083212d5dc895ce98079))
* update button background color and widen route container for mobile ([0831d1b](https://github.com/G9T3N/portfolify/commit/0831d1b15d5c6e323a90409f4fe4763da92c5008))
* update contact section layout and form button styling ([dcd8464](https://github.com/G9T3N/portfolify/commit/dcd84645e680cb7d14189e1a700c491c8dac155f))


### Performance Improvements

* optimize lanyard card image ([859116c](https://github.com/G9T3N/portfolify/commit/859116c35a67baf15136c66843c5147be076c31d))
