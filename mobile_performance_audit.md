# Mobile Performance Audit Report - Home Page

## Overview

A deep performance audit was conducted on the home page for mobile devices using Lighthouse CLI against a local production build. The focus was on identifying performance bottlenecks, particularly main-thread blocking operations and Largest Contentful Paint (LCP) delays.

## Lighthouse Metrics (Mobile)

*   **Overall Performance Score:** 0.51 (51 / 100)
*   **First Contentful Paint (FCP):** 1.4 s
*   **Largest Contentful Paint (LCP):** 4.5 s
*   **Total Blocking Time (TBT):** 1,930 ms
*   **Speed Index:** 4.2 s
*   **Cumulative Layout Shift (CLS):** 0.106

## Key Findings & Diagnostics

1.  **Minimize Main-Thread Work (6.0 s total):**
    *   **Script Evaluation:** ~2.1 s
    *   **Style & Layout:** ~1.17 s
    *   *Issue:* The main thread is heavily blocked during initial hydration. This is the primary contributor to the low performance score and high TBT.

2.  **Reduce JavaScript Execution Time (2.3 s):**
    *   *Issue:* Too much JavaScript is being parsed and executed initially. The top opportunity identified by Lighthouse is "Reduce unused JavaScript," which could save around 300ms.

3.  **LCP Discovery & Paint (4.5 s):**
    *   *Issue:* The Largest Contentful Paint is significantly delayed.

## Detailed Code Review & Actionable Recommendations

Based on manual inspection of `src/app/page.tsx` and related components, here are the targeted optimizations to resolve the issues above:

### 1. Extensive Static Imports Blocking Initial Hydration

**Finding:** `src/app/page.tsx` is currently statically importing many heavy components that are below the fold. While RSC (React Server Components) handle server-rendering efficiently, the client-side JavaScript for these components (especially those using Framer Motion or complex interactivity) is bundled and executed during the initial load, blocking the main thread.

Examples of statically imported components found in `src/app/page.tsx` that should be deferred:
*   `PricingCards`
*   `CyberButton`
*   `AngledGallery`
*   `FeaturedWork`
*   `StickyStackCards`

**Recommendation:**
*   Implement lazy loading using `next/dynamic` for all below-the-fold components in `src/app/page.tsx`. This will split the JavaScript bundle and ensure that the main thread is not blocked by executing code for elements the user cannot yet see.
*   Example:
    ```typescript
    import dynamic from 'next/dynamic';
    const PricingCards = dynamic(() => import('@/components/PricingCards'), { ssr: true });
    ```
    *(Note: Keep `ssr: true` (default) for SEO, but the JS payload will be deferred).*

### 2. Framer Motion Overhead

**Finding:** The project heavily utilizes `framer-motion`. While the `RootLayoutClient.tsx` correctly wraps the app in `<LazyMotion features={domAnimation} strict>`, many individual components still import standard Framer Motion components (e.g., `import { m } from "framer-motion"`). If too many of these are statically imported on the home page, the engine initialization and component mounting contribute to the "Script Evaluation" and "Style & Layout" time.

**Recommendation:**
*   By lazy-loading the below-the-fold components (as recommended in point 1), the associated Framer Motion overhead will also be deferred.
*   Ensure that any standard `div` elements used purely for structure are not wrapped in `<m.div>` unnecessarily, adhering to the project's motion engineering constraints.

### 3. LCP Delay caused by Entrance Animations

**Finding:** The project memory states: "To prevent LCP (Largest Contentful Paint) delays, avoid applying entrance animations that start with `opacity: 0` (e.g., Tailwind's `animate-fade-up`) to above-the-fold hero content or the primary LCP element."
Inspection of `src/app/page.tsx` reveals several instances of `animate-fade-up` in the hero section (e.g., lines 79, 83). If one of these elements (or the container holding the LCP image/text) starts with `opacity: 0`, the browser cannot paint it until the CSS animation begins executing, artificially inflating the LCP metric.

**Recommendation:**
*   Remove the `animate-fade-up` and related `animation-delay` classes from the primary hero heading, subtext, and any hero imagery that constitutes the LCP. Let the core content render immediately.

### 4. Verification of Mobile Optimizations

**Finding:** The application currently implements a proxy (`src/proxy.ts`) to detect the device type and sets an `x-device-type` header. The home page correctly reads this header and completely omits the heavy 3D background (`<DynamicConstellation />`) for mobile devices. This architecture is working as intended.
