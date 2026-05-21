---
name: skill-typography
description: Guide on using Google Fonts, Fontshare, and Bunny Fonts in Next.js.
---

# Skill: Typography Resources

This skill covers rendering logic of typography in a modern Next.js ecosystem mandating strict adherence to the built-in `next/font` module.

## Resources

### 1. Google Fonts (via next/font/google)
*   **URL**: [https://fonts.google.com/](https://fonts.google.com/)
*   **Licensing**: SIL Open Font License (OFL) or Apache License.
*   **Usage**: Native to Next.js; fetches fonts during the build pipeline to avoid requests to Google servers by the end-user.

### 2. Fontshare by Indian Type Foundry (ITF)
*   **URL**: [https://www.fontshare.com/](https://www.fontshare.com/)
*   **Licensing**: ITF Free Font License (FFL).
*   **Usage**: Highly curated collection of premium-grade typography. Use with `next/font/local`.

### 3. Bunny Fonts (Fontsource)
*   **URL**: [https://bunny.net/fonts/](https://bunny.net/fonts/) / [https://fontsource.org/](https://fontsource.org/)
*   **Licensing**: MIT (API) / SIL OFL (Fonts).
*   **Usage**: Privacy-focused, GDPR-compliant alternative to Google Fonts.

## Best Practices
*   Utilize the built-in `next/font` module to prevent FOIT/FOUT and eliminate layout shifts (CLS).
*   Download raw `.woff2` files and utilize the `next/font/local` module for fonts outside the Google Fonts ecosystem.
