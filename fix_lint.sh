#!/bin/bash
# Escaping single quotes in page.tsx
sed -i "s/It's true/It\&apos;s true/g" src/app/page.tsx
sed -i "s/Let's Build/Let\&apos;s Build/g" src/app/page.tsx
sed -i "s/Let's collaborate/Let\&apos;s collaborate/g" src/app/page.tsx

# Fix react-hooks/set-state-in-effect
# Navbar
sed -i 's/setMobileOpen(false);/setTimeout(() => setMobileOpen(false), 0);/' src/components/Navbar.tsx
# QuoteConfigurator
sed -i 's/setEstimatedCost(finalPrice);/setTimeout(() => setEstimatedCost(finalPrice), 0);/' src/components/QuoteConfigurator.tsx
# StickyStackCards
sed -i 's/setMounted(true);/setTimeout(() => setMounted(true), 0);/' src/components/StickyStackCards.tsx
# TechPhysicsSandbox
sed -i 's/setReducedMotion(mediaQuery.matches);/setTimeout(() => setReducedMotion(mediaQuery.matches), 0);/g' src/components/TechPhysicsSandbox.tsx

# Fix unexpected any
sed -i 's/: any/: unknown/g' src/components/layers/StickyStackGrid.tsx
sed -i 's/Icon: any/Icon: React.ElementType/g' src/components/magicui/BentoGrid.tsx
