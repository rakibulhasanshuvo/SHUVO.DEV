# Cyber-Luxury Portfolio — Full Design System & Layout

> This document outlines the visual identity and detailed layout structure for Muhammad Rakibul Hasan Shuvo's portfolio. It is designed to be fed into Stitch to generate the corresponding UI components and styles based on the approved blueprint.

---

## 🎨 Core Visual Identity (The "Cyber-Luxury" Vibe)

The aesthetic is high-contrast, premium, and futuristic. It combines the raw energy of cyberspace with the polished finish of a luxury brand.

### 1. Color Palette
*   **Background (Primary):** True Black `#000000` (Used for the main canvas to make elements pop).
*   **Background (Secondary):** Deep Charcoal `#0B0B0C` (Used for cards and section containers to create depth).
*   **Accent Color (Primary):** Neon Cyan `#00F0FF` (Used for primary calls to action, active states, and glowing accents).
*   **Accent Color (Secondary):** Electric Purple `#A100FF` (Used for gradients and secondary highlights).
*   **Text (Primary):** Pure White `#FFFFFF` or Off-White `#F5F5F7` for body text.
*   **Text (Muted):** Cool Gray `#86868B` (For labels and descriptions).

### 2. Typography
*   **Headings:** *Cabinet Grotesk* (or similar premium geometric sans-serif). Bold, sharp, and commanding.
*   **Body Text:** *Satoshi* (or *Inter* if Fontshare is unavailable). Clean, highly legible, and modern.
*   **Accent/Metrics:** Monospace font (like *JetBrains Mono*) for technical data, line counts, and dates.

### 3. Effects & UI Polish
*   **Glassmorphism:** Frosted glass effect for navigation bars and cards.
    *   `background: rgba(255, 255, 255, 0.03)`
    *   `backdrop-filter: blur(12px)`
    *   `border: 1px solid rgba(255, 255, 255, 0.08)`
*   **Neon Glows:** Subtle, high-spread shadows to simulate glowing hardware.
    *   Example: `box-shadow: 0 0 30px -5px rgba(0, 240, 255, 0.3)`
*   **Grid Overlays:** Hero background should feature a subtle geometric grid or dot matrix pattern to emphasize the "cyber" feel.

---

## 📐 5-Page Structure & Layout Breakdown

This is a multi-page Next.js application consisting of 5 main pages. Each page should maintain the Cyber-Luxury theme but has a specific layout focus:

### 1. Home Page (`/`)
*   **Focus:** High-impact introduction and hero element.
*   **Layout Sections:**
    *   **Hero:** Massive, bold headline with the **Aurora Text Effect** (gradient shift). Lightweight CSS/SVG Code-Art on the side (glowing geometric matrix).
    *   **Featured Work:** Highlighting top 2-3 custom engineered projects (e.g., *Amolnama*, *Componeo*) in a sleek grid.
    *   **Work Process:** A breakdown of how you build (Planning → Architecture → Development → Deployment). Can use a timeline or stepper component with neon glowing nodes.
    *   **Reviews/Testimonials:** Glassmorphic cards with glowing borders to build client trust.
    *   **Call to Action (CTA):** A sleek section at the bottom driving users to the Contact page for custom quotes.

### 2. Deep-Dive Projects Page (`/projects`)
*   **Focus:** Showcasing your major technical builds.
*   **Layout Sections:**
    *   **Project Grid:** A clean glassmorphism grid of your major technical builds. Cards use the **3D Card Tilt** effect on hover.
    *   **Dynamic Routes (`/projects/[slug]`):** Detailed case studies.
        *   *Amolnama Case Study:* Detail the 10+ scraper bots built.
        *   *Componeo Case Study:* Explain the Next.js/Supabase backend for the component registry.

### 3. Template Library Page (`/templates`)
*   **Focus:** Storefront for 300+ converted templates.
*   **Layout Sections:**
    *   **Grid Display:** Dense grid of clean cards with high-res previews or looping video clips (WebM).
    *   **Content Per Card:** Tech stack tags, TASL Attribution (Title, Author, Source, License), and a download/purchase link.
    *   **SEO:** Ready for JSON-LD Product/SoftwareApplication Schema.

### 4. About & Tech Stack Page (`/about`)
*   **Focus:** Your story and hardware setup.
*   **Layout Sections:**
    *   **The Story:** Detailing the transition from graphic design and volunteering into full-stack web engineering.
    *   **The Stack Wall:** Infinite moving logos or a grid of tech icons (Next.js, Supabase, Tailwind, Refine) with neon hover effects.
    *   **Hardware Setup:** A brief, styled nod to custom PC building and hardware optimization for dev workflows.

### 5. Contact Page (`/contact`)
*   **Focus:** Polished, secure lead generation.
*   **Layout Sections:**
    *   **Form:** A polished, secure form with floating glowing input borders when focused.
    *   **Links:** Direct links to Upwork, GitHub, and LinkedIn profiles.

---

## 💰 Services & Pricing Section (For Home or Services Page)

Style these as premium service tiers (e.g., using a bento grid or comparison cards with glassmorphism):

*   **Tier 1: The Conversion (HTML/Figma to Next.js)** — Focus on performance and component-based structure.
*   **Tier 2: The Full-Stack Build (From Scratch)** — Highlight Refine dashboards, Supabase, and auth.
*   **Tier 3: The Interactive Experience (Premium)** — Highlight advanced motion engineering and custom CSS art.
