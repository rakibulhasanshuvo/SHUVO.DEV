# Portfolio Architecture & Blueprint
**Developer:** Muhammad Rakibul Hasan Shuvo
**Role:** Full-Stack Web Developer & Graphic Designer
**Aesthetic:** Cyber-Luxury (Dark Mode, Glassmorphism, Neon Accents)

---

## 1. Core Visual & Technical Strategy

* **Vibe:** Cyber-Luxury. True black/charcoal backgrounds, frosted glass UI components (glassmorphism), and highly saturated neon accents (cyan, purple, or emerald).
* **Architecture:** Next.js App Router (RSC). Leveraging React Server Components to minimize client-side JavaScript and ensure instant loading.
* **UI Components:** **Shadcn/ui** for core accessible primitives, enhanced with **Magic UI** (Aurora Text, Flickering Grids) and **Aceternity UI** (3D Card tilt, Tracing Beams) for the cyber aesthetic.
* **Design System:** Centralized Tailwind CSS configuration with custom utility tokens for glassmorphism blur and neon text/box shadows. Leveraging **Hypercolor** for gradients and **Hero Patterns** for geometric grids.
* **Typography:** **Fontshare** for premium-quality free fonts (e.g., Satoshi or Cabinet Grotesk) to give a distinct edge over standard Google Fonts.
* **Hero Element:** Lightweight CSS/SVG Code-Art. Using pure CSS gradients, `clip-path`, and glowing `box-shadow` techniques to create hardware-accelerated glowing lines and geometric matrices. Zero impact on Core Web Vitals.
* **Interactivity:** Fluid, physics-based motion using Framer Motion and Anime.js for scroll reveals and hover states.
* **Performance Targets:** LCP < 2.5s, CLS < 0.1, aiming for 100/100 Lighthouse performance scores.
* **Workflow Integration:** Highlights the "Vibe Coding" philosophy—focusing on high-level architecture and AI-assisted implementation.

---

## 2. Site Architecture (Core Pages)

### 1. Home (`/`)
* **Hero Section:** High-impact introduction featuring CSS-generated glowing lines/shapes and your value proposition as a developer bridging design and engineering.
* **Featured Work:** Highlighting top 2-3 custom engineered projects (e.g., Amolnama, Componeo).
* **Work Process:** A breakdown of how you build (planning, architecture, development, deployment).
* **Reviews/Testimonials:** Building client trust.
* **Call to Action (CTA):** A sleek section at the bottom driving users to the Contact page for custom quotes.

### 2. Deep-Dive Projects (`/projects` & `/projects/[slug]`)
* **Overview:** A clean glassmorphism grid of your major technical builds.
* **Dynamic Routing:** Each project gets a detailed case study detailing the problem, stack, and solution.
    * *Highlighting Data Pipelines:* Detailing the 10+ scraper bots built for Amolnama.
    * *Highlighting Architecture:* Explaining the Next.js/Supabase backend for the Componeo component registry.
* **SEO & Discovery:** Automated OpenGraph image generation and **JSON-LD Schema Markup** for case studies.

### 3. The Template Library (`/templates` & `/templates/[id]`)
* **Overview:** The storefront for your 300+ converted templates.
* **Optimization:** Template cards use looping WebM videos or high-res images to save space. Only the top 5-10 templates are hosted as live URLs on Vercel.
* **Content:** Each dynamic page includes the tech stack, TASL attribution (Title, Author, Source, License), and a download/purchase link. 
* **SEO:** **JSON-LD Product/SoftwareApplication Schema** for every template page to enable rich snippets in search results.
### 4. About & Tech Stack (`/about`)
* **The Story:** Detailing the transition from graphic design and a dedicated volunteering/self-taught gap into full-stack web engineering, culminating in a full-time technical role.
* **The Stack:** Next.js, Tailwind CSS, TypeScript, Supabase, Refine, Framer Motion, Anime.js, Vercel, GitHub, Tinybird, Shadcn/ui, Magic UI, Aceternity UI.
* **Hardware Setup:** Brief nod to custom PC building and hardware optimization for development workflows.

### 5. Contact (`/contact`)
* **Function:** A polished, secure form routed to your backend data pipeline. Links to GitHub, LinkedIn, and Upwork profile.

---

## 3. Services & Pricing Structure

Instead of listing standard freelance rates, the portfolio uses structured service tiers to filter clients and accommodate a full-time schedule.

* **Tier 1: The Conversion (HTML/Figma to Next.js)**
    * Converting static designs or templates into high-performance, component-based Next.js applications using Tailwind CSS. 
* **Tier 2: The Full-Stack Build (From Scratch)**
    * Complete architecture including custom design, Refine admin dashboards, Supabase database integration, and authentication.
* **Tier 3: The Interactive Experience (Premium)**
    * High-end corporate builds featuring advanced motion engineering (Framer Motion/Anime.js), custom CSS art, and heavy data-pipeline integration. Custom quote only.

---

## 4. Personal & Professional Details (Data Context)

*This section aggregates your specific professional details for inclusion in the "About" or "Resume" section of the site.*

* **Full Name:** Muhammad Rakibul Hasan Shuvo
* **Location:** Bangladesh
* **Academic Background:** Bachelor of Computer Science and Engineering student at Bangladesh Open University (BOU). Applicant for the Islamic Development Bank (IsDB) Scholarship.
* **Professional Status:** Full-time technical role (joined April 2026) following a highly successful 28-day intensive career sprint.
* **Key Engineering Projects:**
    * **Amolnama:** Digital ledger & data pipeline utilizing 10+ scraper bots tracking national events.
    * **Componeo / Componeo Elite:** High-performance React component registry (Next.js & Supabase).
    * **Izzan / Izzan-store:** Deployed e-commerce architecture.
    * **Vortexa / Aether-core:** Cloud hosting and backend database management.
