const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseOutDir = path.join(__dirname, 'screenshots', 'web');

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'mr', name: 'Marathi' },
];

const routes = [
  { name: '01_role_selection', url: 'http://localhost:5173/role-selection' },
  { name: '02_collector_home', url: 'http://localhost:5173/collector/home' },
  { name: '03_collections', url: 'http://localhost:5173/collector/collections' },
  { name: '04_collection_detail', url: 'http://localhost:5173/collector/collections/LOT-2026-0818' },
  { name: '05_collector_profile', url: 'http://localhost:5173/collector/profile' },
];

const viewports = [
  { label: 'desktop', width: 1280, height: 920 },
  { label: 'mobile', width: 440, height: 920 },
];

async function capture() {
  console.log('Launching Chrome from:', chromePath);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  let overflowErrors = 0;

  for (const lang of languages) {
    console.log(`\n========================================`);
    console.log(`CAPTURING SCREENSHOTS FOR: ${lang.name} (${lang.code.toUpperCase()})`);
    console.log(`========================================`);

    const langDir = path.join(baseOutDir, lang.code);
    if (!fs.existsSync(langDir)) {
      fs.mkdirSync(langDir, { recursive: true });
    }

    // Set active language in localStorage
    await page.goto('http://localhost:5173/role-selection', { waitUntil: 'networkidle0' });
    await page.evaluate((l) => {
      localStorage.setItem('kc_language', l);
    }, lang.code);

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
      const vpDir = path.join(langDir, vp.label);
      if (!fs.existsSync(vpDir)) {
        fs.mkdirSync(vpDir, { recursive: true });
      }

      for (const r of routes) {
        await page.goto(r.url, { waitUntil: 'networkidle0' });
        await new Promise((res) => setTimeout(res, 350));

        // Horizontal overflow check
        const overflow = await page.evaluate(() => {
          return {
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          };
        });

        if (overflow.hasHorizontalScroll) {
          console.error(`[OVERFLOW ERROR] [${lang.code}] ${r.name} @ ${vp.label}: scrollWidth=${overflow.scrollWidth} > clientWidth=${overflow.clientWidth}`);
          overflowErrors++;
        }

        const dest = path.join(vpDir, `${r.name}_${vp.label}_${lang.code}.png`);
        await page.screenshot({ path: dest, fullPage: false });
        console.log(`[PASS] Saved ${lang.name} ${vp.label} (${vp.width}x${vp.height}): ${path.relative(__dirname, dest)}`);
      }
    }
  }

  await browser.close();

  console.log('\n========================================');
  if (overflowErrors > 0) {
    console.error(`COMPLETED WITH ${overflowErrors} OVERFLOW ERRORS.`);
    process.exit(1);
  } else {
    console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY WITH 0 OVERFLOW ERRORS!');
  }
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
