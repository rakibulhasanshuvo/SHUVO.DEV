const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'http://localhost:3000';
const SCRATCH_DIR = 'c:/Users/CM/OneDrive/Desktop/my-multi=portfolio/review';

(async () => {
  if (!fs.existsSync(SCRATCH_DIR)) {
    fs.mkdirSync(SCRATCH_DIR, { recursive: true });
  }

  console.log('Launching browser to verify 3D stack cards scroll-linking...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log(`Navigating to ${TARGET_URL}...`);
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  console.log('Page loaded successfully.');

  // Locate the projects-stack section
  const section = await page.locator('#projects-stack');
  const box = await section.boundingBox();
  
  if (!box) {
    console.error('❌ Could not find #projects-stack section on the page!');
    await browser.close();
    return;
  }

  console.log(`Found projects-stack section: x=${box.x}, y=${box.y}, width=${box.width}, height=${box.height}`);

  // We want to scroll to different positions within the projects-stack section.
  // The section is h-[360vh], which is 3.6 * 900 = 3240px.
  // The sticky container inside is 100vh (900px) tall.
  // So the scrolling range is from box.y (start of sticky) to box.y + 2340px (end of sticky scroll).
  const startScrollY = box.y;
  const totalScrollRange = box.height - 900; // 3240 - 900 = 2340px
  
  const scrollSteps = [0.0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 0.95, 1.0];

  for (const step of scrollSteps) {
    const scrollY = startScrollY + (totalScrollRange * step);
    console.log(`Scrolling to progress ${Math.round(step * 100)}% (Y=${Math.round(scrollY)}px)...`);
    
    await page.evaluate((targetY) => window.scrollTo(0, targetY), scrollY);
    await page.waitForTimeout(600); // Wait for animations to settle

    // Capture viewport screenshot
    const screenshotPath = path.join(SCRATCH_DIR, `stack_scroll_${Math.round(step * 100)}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Saved screenshot to ${screenshotPath}`);
  }

  console.log('Scroll-link visual verification completed!');
  await browser.close();
})();
