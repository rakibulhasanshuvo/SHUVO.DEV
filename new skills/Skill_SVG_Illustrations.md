---
name: skill-svg-illustrations
description: Guide on using unDraw, ManyPixels, and Humaaans for SVG illustrations in Next.js.
---

# Skill: SVG Illustration Libraries

This skill covers the integration of scalable vector graphics (SVGs) for resolution-independent, performant visual storytelling on the web.

## Resources

### 1. unDraw
*   **URL**: [https://undraw.co/](https://undraw.co/)
*   **Licensing**: Custom Open License (No attribution; redistribution/AI training prohibited).
*   **Usage**: Minimalist, human-centric designs with real-time color customization.

**Example (iblis-react-undraw)**:
```tsx
import { Svg3DModeling } from 'iblis-react-undraw';

export default function HeroIllustration() {
  return <Svg3DModeling primaryColor="#3b82f6" height="100%" />;
}
```

### 2. ManyPixels Illustration Gallery
*   **URL**: [https://www.manypixels.co/gallery](https://www.manypixels.co/gallery)
*   **Licensing**: Custom Royalty-Free License.
*   **Usage**: Monochromatic, dual-tone, flat outline, and isometric designs. Requires manual SVG conversion.

### 3. Humaaans by Pablo Stanley
*   **URL**: [https://www.humaaans.com/](https://www.humaaans.com/)
*   **Licensing**: CC BY 4.0 / CC0.
*   **Usage**: Modular, compositional library to assemble human figures.

## Best Practices
*   Heavily optimize SVGs using tools like SVGO.
*   Adhere to accessibility (a11y) standards: use `aria-hidden="true"` for decorative elements or provide descriptive `role="img"` and `<title>` tags for informative graphics.
