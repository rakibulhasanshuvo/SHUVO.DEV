1. **Fix Broken CTA Anchor in Hero**:
   - Update `href="#projects-stack"` to `href="#work"` in the "View My Work" CTA.
2. **Add Missing Section IDs and Adjust Scroll Margin**:
   - The fixed navbar overlaps section titles when navigating via anchors. I will add `scroll-mt-24` (or similar padding) to all anchor sections.
   - Change `div` around `<AboutSection />` to `<section id="about" className="scroll-mt-24 mt-40 mb-40">`.
   - Wrap `<StickyStackCards />` with `<section id="work" className="scroll-mt-24">`.
   - Add `scroll-mt-24` to `#process`, `#reviews`, `#faq`, `#blog`, `#contact` sections in `src/app/page.tsx`.
3. **Fix Blog Card Content (UI/UX Audit Polish)**:
   - Replace "By John Doe" placeholder names with "By M.R.H. Shuvo" (owner's name).
   - Replace "Lorem ipsum..." with real, context-appropriate English text.
   - Fix the invalid date `31/06/2025` to `30/06/2025` (or a valid date).
4. **Pre-commit Steps**:
   - Run tests and verifications using `pre_commit_instructions` tool.
5. **Submit the change**:
   - Submit the branch with the UI/UX audit fixes.
