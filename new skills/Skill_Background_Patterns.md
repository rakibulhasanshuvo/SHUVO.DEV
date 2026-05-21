---
name: skill-background-patterns
description: Guide on using Hero Patterns, Tailwindcss-bg-patterns, and MagicPattern.
---

# Skill: Background Patterns

This skill covers implementing generative background patterns to add texture and spatial depth to user interfaces.

## Resources

### 1. Hero Patterns
*   **URL**: [https://heropatterns.com/](https://heropatterns.com/)
*   **Licensing**: CC BY 4.0 / MIT (Plugin).
*   **Usage**: Meticulously crafted, seamlessly repeating SVG background patterns. Use with `tailwindcss-hero-patterns` plugin.

### 2. Tailwindcss-bg-patterns
*   **URL**: [https://www.npmjs.com/package/tailwindcss-bg-patterns](https://www.npmjs.com/package/tailwindcss-bg-patterns)
*   **Licensing**: MIT License.
*   **Usage**: Highly customizable geometric SVG backgrounds generated entirely via code.

### 3. MagicPattern
*   **URL**: [https://www.magicpattern.design/](https://www.magicpattern.design/)
*   **Licensing**: Commercial Use Allowed (AI training prohibited).
*   **Usage**: AI-driven, generative approach to pattern creation (blobs, meshes, geometric scatter).

## Best Practices
*   Convert SVG patterns into URL-encoded Data URIs and inject them via Tailwind plugins to prevent extra HTTP requests.
*   Explicitly define which patterns to include in the Tailwind configuration file to avoid inflating the final CSS bundle.
