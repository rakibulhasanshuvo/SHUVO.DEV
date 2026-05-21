---
name: skill-link-cards
description: Component documentation and code for Interactive Glowing Link Cards with 3D hover effects.
---

# Interactive Glowing Link Cards

**Stack:** Next.js, CSS Modules, React, TypeScript
**Aesthetic:** Cyber-Luxury (Neon glows, angled overlaps, floating elements)

## Overview

This component features a set of 3 interactive cards (Github, Code, Earn) that overlap in a fan-like arrangement. On hover, the cards spread out, flatten their rotation, and lift up, creating a dynamic 3D effect. The design uses radial gradients for glows and a moving dot animation to enhance the futuristic "Cyber-Luxury" vibe.

## Dimensional Refinements & Architecture

1. **Overlap & Spread:** The cards use negative margins (`margin: 0 -80px`) to overlap. On hover of the container, they spread out (`margin: 0 40px`) and reset their rotation (`rotate(0deg)`).
2. **Dynamic Rotation:** Each card has a specific rotation angle passed via inline styles as a CSS variable (`--r`), which is then used in the CSS `transform: rotate(calc(var(--r) * 1deg))`.
3. **Pseudo-element Content:** The text for each card is provided via the `data-text` attribute and rendered using CSS `attr(data-text)` in a pseudo-element.

## Audit Findings & Recommended Improvements

During the audit of this component, the following areas were identified for improvement:

### 1. Accessibility (High Priority)
- **Interactive Elements:** The cards are currently `div` elements. If they are intended to be clickable links (as suggested by "Github", "Code", "Earn"), they should be refactored to use `<a>` or `<Link>` tags or `<button>` tags with proper ARIA roles.
- **Keyboard Navigation:** Divs are not focusable by default. Adding `tabIndex={0}` and keyboard event handlers (or using semantic interactive elements) is required for accessibility.
- **SVGs:** The SVGs lack titles and ARIA labels. Adding `aria-hidden="true"` or a `<title>` tag would improve accessibility.

### 2. Responsiveness (Medium Priority)
- **Fixed Dimensions:** The cards have fixed width (`280px`) and height (`320px`). On very small screens, the overlapping design with negative margins might cause overflow issues.
- **Media Queries:** Adding media queries to reduce card size or stack them vertically on mobile devices would improve usability.

---

## Component Code

### `LinkCards.tsx`

```tsx
import React from 'react';
import styles from './LinkCards.module.css';

const LinkCards = () => {
  return (
    <div className={styles.container}>
      {/* Card 1: Github */}
      <div data-text="Github" style={{ '--r': -15 } as React.CSSProperties} className={styles.outerCard}>
        <div className={styles.dot} />
        <div className={styles.innerCard}>
          <div className={styles.ray} />
          <svg viewBox="0 0 496 512" height="1em" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
          </svg>
          <div className={`${styles.line} ${styles.topl}`} />
          <div className={`${styles.line} ${styles.leftl}`} />
          <div className={`${styles.line} ${styles.bottoml}`} />
          <div className={`${styles.line} ${styles.rightl}`} />
        </div>
      </div>

      {/* Card 2: Code */}
      <div data-text="Code" style={{ '--r': 5 } as React.CSSProperties} className={styles.outerCard}>
        <div className={styles.dot} />
        <div className={styles.innerCard}>
          <div className={styles.ray} />
          <svg viewBox="0 0 640 512" height="1em" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
          </svg>
          <div className={`${styles.line} ${styles.topl}`} />
          <div className={`${styles.line} ${styles.leftl}`} />
          <div className={`${styles.line} ${styles.bottoml}`} />
          <div className={`${styles.line} ${styles.rightl}`} />
        </div>
      </div>

      {/* Card 3: Earn */}
      <div data-text="Earn" style={{ '--r': 25 } as React.CSSProperties} className={styles.outerCard}>
        <div className={styles.dot} />
        <div className={styles.innerCard}>
          <div className={styles.ray} />
          <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
          </svg>
          <div className={`${styles.line} ${styles.topl}`} />
          <div className={`${styles.line} ${styles.leftl}`} />
          <div className={`${styles.line} ${styles.bottoml}`} />
          <div className={`${styles.line} ${styles.rightl}`} />
        </div>
      </div>
    </div>
  );
}

export default LinkCards;
```

### `LinkCards.module.css`

```css
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
}

.outerCard {
  position: relative;
  width: 280px;
  height: 320px;
  background: radial-gradient(circle 200px at 0% 0%, rgba(0, 240, 255, 0.4), #0c0d0d);
  transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  margin: 0 -80px;
  transform: rotate(calc(var(--r) * 1deg));
  cursor: pointer;
  padding: 1px;
  box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container:hover .outerCard {
  transform: rotate(0deg);
  margin: 0 40px;
}

.outerCard:hover {
  box-shadow: 0 0 40px rgba(0, 240, 255, 0.4);
  transform: translateY(-15px) !important;
  z-index: 10;
}

.innerCard {
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 11px;
  background: radial-gradient(circle 250px at 0% 0%, rgba(255, 255, 255, 0.05), #0c0d0d);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  color: #fff;
  overflow: hidden;
}

.dot {
  width: 6px;
  aspect-ratio: 1;
  position: absolute;
  background-color: #00f0ff;
  box-shadow: 0 0 10px #00f0ff;
  border-radius: 100px;
  z-index: 5;
  right: 10%;
  top: 10%;
  animation: moveDot 6s linear infinite;
}

@keyframes moveDot {
  0%, 100% {
    top: 5%;
    right: 5%;
  }
  25% {
    top: 5%;
    right: calc(100% - 15px);
  }
  50% {
    top: calc(100% - 15px);
    right: calc(100% - 15px);
  }
  75% {
    top: calc(100% - 15px);
    right: 5%;
  }
}

.ray {
  width: 320px;
  height: 60px;
  border-radius: 100px;
  position: absolute;
  background-color: #00f0ff;
  opacity: 0.15;
  box-shadow: 0 0 50px #00f0ff;
  filter: blur(15px);
  transform-origin: 10%;
  top: 0%;
  left: 0;
  transform: rotate(40deg);
  pointer-events: none;
}

.outerCard::before {
  content: attr(data-text);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: rgba(0, 240, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: 'Cabinet Grotesk', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 1px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top: 1px solid rgba(0, 240, 255, 0.2);
  z-index: 3;
}

.outerCard svg {
  font-size: 4em;
  fill: #fff;
  transition: 0.3s;
  filter: drop-shadow(0 0 5px rgba(0, 240, 255, 0.3));
  z-index: 2;
  margin-bottom: 30px;
}

.outerCard:hover svg {
  fill: #00f0ff;
  filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.6));
}

.line {
  width: 100%;
  height: 1px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.05);
}

.topl {
  top: 15%;
  background: linear-gradient(90deg, rgba(0, 240, 255, 0.3) 30%, transparent 70%);
}

.bottoml {
  bottom: 15%;
}

.leftl {
  left: 15%;
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 240, 255, 0.3) 30%, transparent 70%);
}

.rightl {
  right: 15%;
  width: 1px;
  height: 100%;
}
```
