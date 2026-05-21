const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Evaluate page elements to find grids/linear gradients
  const elements = await page.evaluate(() => {
    const results = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundImage;
      const className = el.getAttribute('class') || '';
      
      // Specifically target linear-gradients that could be the grid background
      if (bg && bg.includes('linear-gradient')) {
        const rect = el.getBoundingClientRect();
        results.push({
          tagName: el.tagName,
          id: el.id,
          classes: className,
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
          backgroundImage: bg.substring(0, 200),
        });
      }
    }
    return results;
  });

  console.log('--- FOUND ELEMENTS WITH LINEAR-GRADIENT BACKGROUNDS ---');
  elements.forEach((el, index) => {
    console.log(`\n[${index}] <${el.tagName}> id="${el.id}" class="${el.classes}"`);
    console.log(`    Dimensions: ${el.width}px x ${el.height}px | Top: ${el.top}px, Left: ${el.left}px`);
    console.log(`    BG: ${el.backgroundImage}`);
  });

  await browser.close();
})();
