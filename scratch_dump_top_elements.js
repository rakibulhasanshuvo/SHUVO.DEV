const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Evaluate the first few elements with classes or backgrounds
  const elements = await page.evaluate(() => {
    const results = [];
    const all = document.querySelectorAll('*');
    let count = 0;
    for (const el of all) {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundImage;
      const className = el.getAttribute('class') || '';
      
      if (bg && bg.includes('linear-gradient') && count < 15) {
        const rect = el.getBoundingClientRect();
        results.push({
          tagName: el.tagName,
          id: el.id,
          classes: className,
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: el.offsetLeft || rect.left,
          backgroundImage: bg.substring(0, 150),
        });
        count++;
      }
    }
    return results;
  });

  console.log('--- FIRST 15 ELEMENTS WITH LINEAR GRADIENT ---');
  elements.forEach((el, index) => {
    console.log(`\n[${index}] <${el.tagName}> id="${el.id}" class="${el.classes}"`);
    console.log(`    Dimensions: ${el.width}px x ${el.height}px | Top: ${el.top}px, Left: ${el.left}px`);
    console.log(`    BG: ${el.backgroundImage}`);
  });

  await browser.close();
})();
