---
name: skill-css-gradients
description: Guide on using Hypercolor, CSS Gradient.io, and React Best Gradient Color Picker.
---

# Skill: CSS Gradient Generators

This skill covers managing precise color stops, complex angles, and mesh blending for CSS gradients.

## Resources

### 1. Hypercolor
*   **URL**: [https://tailkits.com/tools/hypercolor/](https://tailkits.com/tools/hypercolor/)
*   **Licensing**: MIT License.
*   **Usage**: Curated collection of over 50 pre-configured gradients that strictly utilize Tailwind's default color palette.

### 2. CSS Gradient.io
*   **URL**: [https://cssgradient.io/](https://cssgradient.io/)
*   **Licensing**: Public domain for output CSS.
*   **Usage**: Graphical interface for generating highly complex linear and radial gradients.

### 3. React Best Gradient Color Picker
*   **URL**: [https://gradient-package-demo.web.app/](https://gradient-package-demo.web.app/)
*   **Licensing**: MIT License.
*   **Usage**: Interactive React component for dynamic user gradient generation (Client Component required).

## Best Practices
*   Prioritize pure CSS solutions over Canvas or WebGL implementations wherever possible.
*   Abstract raw CSS output into arbitrary values within Tailwind configuration using bracket notation (e.g., `bg-[radial-gradient(...)]`).
