const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'http://localhost:3000';
const REVIEW_DIR = 'c:/Users/CM/OneDrive/Desktop/my-multi=portfolio/review';

(async () => {
  // Create review directory if it doesn't exist
  if (!fs.existsSync(REVIEW_DIR)) {
    fs.mkdirSync(REVIEW_DIR, { recursive: true });
  }

  console.log('Starting browser review...');
  
  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: REVIEW_DIR,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  const pagesToVisit = [
    { name: '01_home', url: '/' },
    { name: '02_about', url: '/about' },
    { name: '03_contact', url: '/contact' },
    { name: '04_project_amolnama', url: '/projects/amolnama' },
    { name: '05_templates', url: '/templates' },
    { name: '06_template_zenith', url: '/templates/zenith' }
  ];

  for (const p of pagesToVisit) {
    console.log(`\n----------------------------------------`);
    console.log(`Navigating to ${p.name} (${TARGET_URL}${p.url})...`);
    try {
      await page.goto(`${TARGET_URL}${p.url}`, { waitUntil: 'networkidle', timeout: 30000 });
      console.log(`Page loaded: "${await page.title()}"`);

      // Scroll down slowly to trigger any lazy loads or animations
      console.log('Scrolling down page...');
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 150;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight || totalHeight > 10000) {
              clearInterval(timer);
              resolve();
            }
          }, 100);
        });
      });

      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1500);

      // Take a standard viewport screenshot
      const vpPath = path.join(REVIEW_DIR, `${p.name}_viewport.png`);
      await page.screenshot({ path: vpPath });
      console.log(`📸 Viewport screenshot saved to ${vpPath}`);

      // Take a full page screenshot
      const fpPath = path.join(REVIEW_DIR, `${p.name}_fullpage.png`);
      await page.screenshot({ path: fpPath, fullPage: true });
      console.log(`📸 Fullpage screenshot saved to ${fpPath}`);

    } catch (err) {
      console.error(`❌ Error visiting ${p.name}:`, err.message);
    }
  }

  // Close context to save the video
  console.log('\nClosing browser context to finalize video recording...');
  await context.close();
  await browser.close();

  // Find the video file created in REVIEW_DIR and rename it
  const files = fs.readdirSync(REVIEW_DIR);
  const videoFiles = files.filter(f => f.endsWith('.webm'));
  
  if (videoFiles.length > 0) {
    console.log('\nFound recorded videos:');
    videoFiles.forEach((file, index) => {
      const oldPath = path.join(REVIEW_DIR, file);
      const newPath = path.join(REVIEW_DIR, `review_video_${index + 1}.webm`);
      fs.renameSync(oldPath, newPath);
      console.log(`🎥 Video renamed: ${oldPath} -> ${newPath}`);
    });
  } else {
    console.log('\n⚠️ No video files were found.');
  }

  console.log('\nReview completed! All screenshots and videos are saved in:', REVIEW_DIR);
})();
