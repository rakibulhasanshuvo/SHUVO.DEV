---
name: skill-animation-libraries
description: Guide on using Framer Motion, GSAP, Lottie, and AutoAnimate.
---

# Skill: CSS/JS Animation Libraries

This skill covers the two distinct methodologies of animation: declarative frame orchestration and imperative hardware-accelerated bypassing.

## Resources

### 1. Framer Motion (Now "Motion")
*   **URL**: [https://motion.dev/](https://motion.dev/)
*   **Licensing**: MIT License.
*   **Usage**: Leading declarative animation library for the React ecosystem. Great for layout animations and mounting/unmounting lifecycles.

### 2. GSAP (GreenSock Animation Platform)
*   **URL**: [https://gsap.com/](https://gsap.com/)
*   **Licensing**: Standard No-Charge License (Commercial restrictions apply).
*   **Usage**: Pinnacle of high-performance, imperative animation. Best for complex sequencing and timeline-based animations. Use with `@gsap/react`.

### 3. Lottie (LottieFiles)
*   **URL**: [https://lottiefiles.com/](https://lottiefiles.com/)
*   **Licensing**: MIT License (for the player library).
*   **Usage**: Render complex vector animations natively exported from Adobe After Effects as JSON data.

### 4. FormKit AutoAnimate
*   **URL**: [https://auto-animate.formkit.com/](https://auto-animate.formkit.com/)
*   **Licensing**: MIT License.
*   **Usage**: "Zero-config" paradigm shift. Exceedingly lightweight library leveraging the browser's native MutationObserver API.

## Best Practices
*   Any animation library relying on browser APIs must execute strictly within client boundaries in Next.js (use `"use client"`).
*   Use the `dotLottie` format for Lottie animations to reduce file sizes and utilize WebAssembly/Canvas rendering.
