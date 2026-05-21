const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Evaluate page elements
  const elements = await page.evaluate(() => {
    const results = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundImage;
      const border = style.border || style.borderWidth || style.borderColor;
      const className = el.getAttribute('class') || '';
      
      const hasGridBg = bg && (bg.includes('linear-gradient') || bg.includes('grid'));
      const hasBorder = border && border !== '0px none rgb(255, 255, 255)' && !border.includes('none') && parseFloat(style.borderWidth) > 0;
      
      if (hasGridBg || className.includes('grid') || className.includes('border') || hasBorder) {
        const rect = el.getBoundingClientRect();
        results.push({
          tagName: el.tagName,
          id: el.id,
          classes: className,
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
          backgroundImage: bg ? bg.substring(0, 100) : '',
          border: border ? border.substring(0, 100) : '',
        });
      }
    }
    return results;
  });

  console.log('--- FOUND POTENTIAL GRID / BORDER / CONTAINER ELEMENTS ---');
  elements.forEach((el, index) => {
    console.log(`\n[${index}] <${el.tagName}> id="${el.id}" class="${el.classes}"`);
    console.log(`    Dimensions: ${el.width}px x ${el.height}px | Top: ${el.top}px, Left: ${el.left}px`);
    if (el.backgroundImage) console.log(`    BG: ${el.backgroundImage}`);
    if (el.border) console.log(`    Border: ${el.border}`);
  });

  await browser.close();
})();
