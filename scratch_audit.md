# UI/UX Audit - Home Page (`/`)

I'll review the codebase for `src/app/page.tsx` and related components to conduct a UI/UX audit for the Home Page, focusing on the Cyber-Luxury aesthetic.

1.  **"By John Doe" placeholder**: Found placeholder names like "By John Doe" and placeholder text ("Lorem ipsum...") in the Blog/Insights section of `src/app/page.tsx` (lines 617, 620, 654, 657). Needs to be replaced with real content or at least the owner's name ("M.R.H. Shuvo" or "Muhammad Rakibul Hasan Shuvo").
2.  **Date issues**: Found `31/06/2025` which is an invalid date (June only has 30 days) and `15/07/2025`.
3.  **Hero CTA Links**: The Hero section contains `#projects-stack` and `#contact`. Does `#projects-stack` exist on the page?
4.  **Overall Layout**: Let's check what components are used in `src/app/page.tsx`.

5. **Navbar Issues**:
   - Uses `#contact` and `#projects` for anchoring in some places, but navbar links to `/projects` and `/contact`. The `#projects-stack` CTA points to `#projects-stack`, but let's see if that section ID actually exists in `src/app/page.tsx`. (Wait, let's grep for `projects-stack`)
6. **Missing anchor**: `#projects-stack` used in Hero section link, but `id="projects-stack"` does not exist in `src/app/page.tsx` (the featured work section just has `<FeaturedWork />`).
7. **Contact href**: In Hero CTA, `href="#contact"` is used, which works on the home page (section `id="contact"`), but the global navbar uses `href="/contact"` which means if the user is on the homepage, `/contact` will route to a new page instead of scrolling to the contact section on the homepage, but if they click the CTA, it scrolls. This is inconsistent, but if `/contact` is a separate page, the CTA should probably link to `/contact` instead of `#contact`, or the navbar should use `#contact` if it's a single-page layout. Since there are separate pages (`/about`, `/contact`), the CTA `href="#contact"` might be intentional for the homepage section, but `href="/contact"` is generally safer if it's meant to go to the contact page.
8. **Navigation mismatch**: The Navbar has `href="/contact"`, `href="/about"`, `href="/projects"`. The footer has `href="#work"`, `href="#about"`, `href="#process"`, `href="#reviews"`, `href="#contact"`. This creates inconsistent behavior between the top and bottom navigation.
9. **Typography**: The name `John Doe` should be `M.R.H. Shuvo`.
10. **Dates**: `31/06/2025` is invalid. June only has 30 days.
11. **Hero CTA href**: `href="#projects-stack"` is broken because there's no `id="projects-stack"`. `FeaturedWork` is added without an id wrapper. I should add `id="projects-stack"` to the `<FeaturedWork />` wrapper or `id="work"`. The footer links to `#work` so we could use `id="work"` for the Featured Work section, and update the CTA to point to `#work`.
12. **Featured Work Component**: `StickyStackCards` is used for Featured Work, but it doesn't have an `id="work"`. I should wrap it in `<section id="work">`. The CTA `href="#projects-stack"` should be updated to `href="#work"`.

Let's summarize the plan:
1.  **Placeholder Text**: Update the blog section cards. Change "By John Doe" to "By M.R.H. Shuvo". Replace the "Lorem ipsum..." placeholder with relevant placeholder text for "How I built my first website..." (e.g., "A deep dive into my journey of building a modern portfolio using Next.js, Tailwind CSS, and Vercel for the first time.").
2.  **Dates**: Change `31/06/2025` to a valid date, e.g., `30/06/2025` or simply `15/05/2025`.
3.  **Hero CTA Link**: The first CTA in the hero section points to `href="#projects-stack"`. Wrap the `<StickyStackCards />` at line 324 in `<section id="work">` and change the CTA to point to `#work`.
4.  **Footer Links**: The footer links to `#work`, `#about`, `#process`, `#reviews`, `#contact`.
    - `#work` -> points to `<StickyStackCards />` after wrapping.
    - `#about` -> points to `<AboutSection />`. Need to ensure this is wrapped with `<section id="about">`
    - `#process` -> exists on `<section id="process">`
    - `#reviews` -> exists on `<section id="reviews">`
    - `#contact` -> exists on `<section id="contact">`
5.  **About Section ID**: Let's check if `<AboutSection />` at line 382 is wrapped in `id="about"`. Currently, it's wrapped in `<div className="mt-40 mb-40">`. Let's change that to `<section id="about" className="mt-40 mb-40">`.

Let's review the current footer and navbar.
Navbar: `/`, `/projects`, `/templates`, `/about`, `/contact`.
Wait, the application HAS other pages like `/about` and `/contact`.
If I am on `/`, and the Navbar has `/contact`, that's fine. The Footer has `#contact`. So clicking `#contact` in the footer on the home page will scroll down. But if I'm on `/about` and click `#contact` in the footer, it will just append `#contact` to `/about#contact`, and the contact section doesn't exist there.
BUT the prompt says "RUN A UI UX AUDIT FOR THE HOME PAGE ONLLY". So I should just fix the UI/UX issues on the Home Page specifically. I will change footer links on the homepage? Or maybe just fix the obvious placeholder text and broken anchors on the home page.
Let's check the rest of `src/app/page.tsx` for other issues.

- Check CTA hover states.
- Check accessibility (aria-labels, etc). The buttons look okay.
- The footer has `GH`, `TW`, `LI` links which go to `#`. Can leave them as `#` since it's a template/placeholder for the user.
- The footer says "© 2026 M.R.H. Shuvo. All rights reserved.".
- The blog section "Latest Insights" has two cards. One has the image `photo-1633332755192-727a05c4013d`. The other has `photo-1550751827-4bd374c3f58b`.
- Wait, the Navbar component itself is imported in `src/app/layout.tsx`. The Navbar points to `/about`, `/contact`, `/projects`, `/templates`.
- The Hero CTA points to `#projects-stack` (View My Work). I will change this to `#work`.
- The Hero CTA "Get in Touch" points to `#contact`. This is fine.

Let's do the following UI/UX fixes:
1. Update `href="#projects-stack"` to `href="#work"` on line 273.
2. Wrap `<StickyStackCards />` with `<section id="work" className="scroll-mt-24">`.
3. Wrap `<AboutSection />` with `<section id="about" className="scroll-mt-24 mt-40 mb-40">` (instead of `div`).
4. Add `scroll-mt-24` to `#process`, `#reviews`, `#blog`, `#contact` sections to offset the fixed navbar height (the navbar is sticky/fixed on scroll, so anchor links need scroll margin).
5. Update blog section:
    - Change "By John Doe" to "By M.R.H. Shuvo".
    - Change date "31/06/2025" to "30/06/2025" or "15/06/2025".
    - Update the Lorem Ipsum text.
