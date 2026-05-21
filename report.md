# Performance Improvement Areas Report

Based on an audit of the Next.js portfolio application, here are the key areas for performance improvements:

## 1. Image Optimization
- **`<img>` tags over `next/image`**: `<img>` tags are currently used throughout the application (e.g., `src/app/page.tsx`, `src/app/templates/[id]/page.tsx`, `src/components/ui/LazyVideoPreview.tsx`).
- **Action**: Replace `<img>` tags with Next.js `<Image>` component (`next/image`) to benefit from automatic image optimization, lazy loading, and WebP support, ensuring better performance and lower Cumulative Layout Shift (CLS).

## 2. Dynamic Component Loading
- **"use client" directives**: Almost all components in `src/components/` and `src/app/` are rendered on the client side using the `"use client"` directive.
- **Heavy UI Components**: Several heavy UI components, like 3D visualizations (`ThreeDCarousel.tsx`, `TechPhysicsSandbox.tsx`, `InteractiveGridBackground.tsx`, `CyberCore.tsx`), animations (`Framer Motion`), and interactive features, are bundled into the initial client load.
- **Action**: Implement Next.js Dynamic Imports (`next/dynamic`) to lazy load these heavy components. By utilizing `{ ssr: false }` for interactive, client-only visual effects, you can significantly reduce the initial JavaScript bundle size, improving First Load JavaScript size and Time to Interactive (TTI).

## 3. Server vs. Client Component Rendering
- **Page-level Client Components**: `src/app/page.tsx`, `src/app/about/page.tsx`, and `src/app/projects/page.tsx` are entirely marked with `"use client"`.
- **Action**: Move `"use client"` down the component tree. Keep the top-level page components as Server Components by default to optimize initial load and SEO. Only mark individual interactive components (e.g., buttons, galleries, specific animations) as Client Components. This allows Next.js to render the static shell on the server and ship less JS to the client.

## 4. Metadata and SEO (Warning specific)
- **Missing `metadataBase`**: There is a build warning indicating `metadataBase` property is missing in the metadata export (`layout.tsx`).
- **Action**: Set the `metadataBase` in `src/app/layout.tsx` to ensure absolute URLs are generated correctly for Open Graph and Twitter images, improving off-site performance and sharing accuracy.

## 5. Animation Libraries
- **Framer Motion**: Framer Motion is heavily used.
- **Action**: Use Framer Motion's `LazyMotion` wrapper combined with `domAnimation` or `domMax` to dynamically load motion features and minimize the initial payload size if the animations aren't critical to the above-the-fold content.

## 6. CSS Delivery (Font Loading)
- **Preload Fonts**: While Fontshare is used with `display=swap`, ensuring it is preloaded properly with the correct `<link rel="preload">` strategies can further mitigate the Flash of Unstyled Text (FOUT) issue early on in the render tree. Next.js `next/font` is suggested in the standard setup but external imports are being used in `layout.tsx`.
- **Action**: If feasible, migrate to `next/font/google` or `next/font/local` to allow Next.js to automatically self-host and optimize font delivery without external network requests on initial page load.
