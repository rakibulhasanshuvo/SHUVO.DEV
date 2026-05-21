sed -i 's/href="#projects-stack"/href="#work"/g' src/app/page.tsx
sed -i 's/<StickyStackCards \/>/<section id="work" className="scroll-mt-24">\n          <StickyStackCards \/>\n        <\/section>/g' src/app/page.tsx
sed -i 's/<div className="mt-40 mb-40">/<section id="about" className="scroll-mt-24 mt-40 mb-40">/g' src/app/page.tsx
sed -i 's/          <AboutSection \/>\n        <\/div>/          <AboutSection \/>\n        <\/section>/g' src/app/page.tsx
sed -i 's/id="process" className="mb-40 max-w-\[1440px\] mx-auto px-6 relative"/id="process" className="scroll-mt-24 mb-40 max-w-[1440px] mx-auto px-6 relative"/g' src/app/page.tsx
sed -i 's/id="reviews" className="mb-40 max-w-\[1440px\] mx-auto px-6"/id="reviews" className="scroll-mt-24 mb-40 max-w-[1440px] mx-auto px-6"/g' src/app/page.tsx
sed -i 's/id="faq" className="mt-40 relative overflow-hidden"/id="faq" className="scroll-mt-24 mt-40 relative overflow-hidden"/g' src/app/page.tsx
sed -i 's/id="blog" className="mt-40"/id="blog" className="scroll-mt-24 mt-40"/g' src/app/page.tsx
sed -i 's/id="contact" className="overflow-hidden glass rounded-3xl sm:grid/id="contact" className="scroll-mt-24 overflow-hidden glass rounded-3xl sm:grid/g' src/app/page.tsx

sed -i 's/By John Doe/By M.R.H. Shuvo/g' src/app/page.tsx
sed -i 's/31\/06\/2025/30\/06\/2025/g' src/app/page.tsx
sed -i 's/Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum provident a, ipsa maiores deleniti consectetur nobis et eaque./A deep dive into my journey of building a modern portfolio using Next.js, Tailwind CSS, and Vercel for the first time./g' src/app/page.tsx
