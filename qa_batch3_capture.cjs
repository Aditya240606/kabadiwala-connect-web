const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseOutDir = path.join(__dirname, 'screenshots', 'batch3');

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'mr', name: 'Marathi' },
];

const primaryViewports = [
  { label: 'desktop', width: 1280, height: 920 },
  { label: 'mobile', width: 440, height: 920 },
];

const responsiveCheckViewports = [
  { label: 'desktop_720', width: 1280, height: 720 },
  { label: 'tablet_landscape', width: 1024, height: 768 },
  { label: 'tablet_portrait', width: 768, height: 1024 },
];

const screenAssertions = {
  '12_recycler_matching': {
    en: {
      mustInclude: ['MATCHING RECYCLERS', 'All Facilities'],
      mustExclude: ['रिसाइक्लर मिलान', 'रिसायकलर शोध', 'सभी सुविधाएं', 'सर्व सुविधा'],
    },
    hi: {
      mustInclude: ['रिसाइक्लर मिलान', 'सभी सुविधाएं'],
      mustExclude: ['MATCHING RECYCLERS', 'रिसायकलर शोध', 'All Facilities', 'सर्व सुविधा'],
    },
    mr: {
      mustInclude: ['रिसायकलर शोध', 'सर्व सुविधा'],
      mustExclude: ['MATCHING RECYCLERS', 'रिसाइक्लर मिलान', 'All Facilities', 'सभी सुविधाएं'],
    },
  },
  '13_recycler_detail': {
    en: {
      mustInclude: ['RECYCLER PROFILE', 'INITIATE HANDOVER'],
      mustExclude: ['रिसाइक्लर प्रोफाइल', 'रिसायकलर प्रोफाइल', 'हस्तांतरण शुरू करें', 'हस्तांतरण सुरू करा'],
    },
    hi: {
      mustInclude: ['रिसाइक्लर प्रोफाइल', 'हस्तांतरण शुरू करें'],
      mustExclude: ['RECYCLER PROFILE', 'रिसायकलर प्रोफाइल', 'INITIATE HANDOVER', 'हस्तांतरण सुरू करा'],
    },
    mr: {
      mustInclude: ['रिसायकलर प्रोफाइल', 'हस्तांतरण सुरू करा'],
      mustExclude: ['RECYCLER PROFILE', 'रिसाइक्लर प्रोफाइल', 'INITIATE HANDOVER', 'हस्तांतरण शुरू करें'],
    },
  },
  '14_handover_request': {
    en: {
      mustInclude: ['HANDOVER REQUEST', 'SUBMIT HANDOVER REQUEST'],
      mustExclude: ['हस्तांतरण अनुरोध', 'हस्तांतरण विनंती', 'हस्तांतरण अनुरोध भेजें', 'हस्तांतरण विनंती पाठवा'],
    },
    hi: {
      mustInclude: ['हस्तांतरण अनुरोध', 'हस्तांतरण अनुरोध भेजें'],
      mustExclude: ['HANDOVER REQUEST', 'हस्तांतरण विनंती', 'SUBMIT HANDOVER REQUEST', 'हस्तांतरण विनंती पाठवा'],
    },
    mr: {
      mustInclude: ['हस्तांतरण विनंती', 'हस्तांतरण विनंती पाठवा'],
      mustExclude: ['HANDOVER REQUEST', 'हस्तांतरण अनुरोध', 'SUBMIT HANDOVER REQUEST', 'हस्तांतरण अनुरोध भेजें'],
    },
  },
  '15_handover_confirmed': {
    en: {
      mustInclude: ['HANDOVER INITIATED', 'TRANSACTION ID'],
      mustExclude: ['हस्तांतरण दर्ज', 'हस्तांतरण नोंदवले', 'लेन-देन ID', 'व्यवहार ID'],
    },
    hi: {
      mustInclude: ['हस्तांतरण दर्ज', 'लेन-देन ID'],
      mustExclude: ['HANDOVER INITIATED', 'हस्तांतरण नोंदवले', 'TRANSACTION ID', 'व्यवहार ID'],
    },
    mr: {
      mustInclude: ['हस्तांतरण नोंदवले', 'व्यवहार ID'],
      mustExclude: ['HANDOVER INITIATED', 'हस्तांतरण दर्ज', 'TRANSACTION ID', 'लेन-देन ID'],
    },
  },
};

function computeBufferSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function runDeterministicBatch3QA() {
  console.log('====================================================');
  console.log('DETERMINISTIC BATCH 3 QA HARNESS — RECYCLER & HANDOVER');
  console.log('====================================================\n');

  if (fs.existsSync(baseOutDir)) {
    fs.rmSync(baseOutDir, { recursive: true, force: true });
  }
  fs.mkdirSync(baseOutDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const capturedRegistry = [];
  const failures = [];
  const duplicateErrors = [];
  let overflowPassCount = 0;

  for (const lang of languages) {
    console.log(`\n====================================================`);
    console.log(`TESTING LANGUAGE: ${lang.name.toUpperCase()} (${lang.code.toUpperCase()})`);
    console.log(`====================================================`);

    for (const vp of primaryViewports) {
      console.log(`\n>>> Primary Viewport: ${vp.label.toUpperCase()} (${vp.width}x${vp.height}) <<<`);

      const vpDir = path.join(baseOutDir, lang.code, vp.label);
      fs.mkdirSync(vpDir, { recursive: true });

      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });

      // Pre-set language in localStorage
      await page.evaluateOnNewDocument((l) => {
        localStorage.clear();
        localStorage.setItem('kc_language', l);
      }, lang.code);

      // Start at recycler matching
      await page.goto('http://localhost:5173/collector/recyclers', { waitUntil: 'networkidle0' });

      // Ensure language is set in page and synced with Header
      await page.evaluate((l) => {
        localStorage.setItem('kc_language', l);
        const headerButtons = Array.from(document.querySelectorAll('header button'));
        const langBtn = headerButtons.find((b) => b.innerText.trim().toUpperCase() === l.toUpperCase());
        if (langBtn) langBtn.click();
      }, lang.code);

      await new Promise((res) => setTimeout(res, 300));

      const runHashes = {};

      const validateAndCapture = async (screenName, route) => {
        const rules = screenAssertions[screenName][lang.code];
        const pageText = await page.evaluate(() => document.body.innerText);

        // Language assertions
        const missing = rules.mustInclude.filter((term) => !pageText.includes(term));
        const forbiddenFound = rules.mustExclude.filter((term) => pageText.includes(term));

        if (missing.length > 0 || forbiddenFound.length > 0) {
          const failureDetail = {
            screenName,
            route,
            language: lang.code,
            viewport: vp.label,
            missingTerms: missing,
            forbiddenTermsFound: forbiddenFound,
            sampleDetectedText: pageText.split('\n').filter(Boolean).slice(0, 10).join(' | '),
          };
          console.error(`[LANGUAGE VALIDATION FAILED] ${screenName} [${lang.code}] [${vp.label}]`);
          console.error(`   Missing required: ${JSON.stringify(missing)}`);
          console.error(`   Forbidden found: ${JSON.stringify(forbiddenFound)}`);
          failures.push(failureDetail);
          return false;
        }

        // Horizontal overflow check
        const overflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        }));

        if (overflow.hasHorizontalScroll) {
          console.error(`[OVERFLOW ERROR] ${screenName} [${lang.code}] [${vp.label}]: scrollWidth=${overflow.scrollWidth} > clientWidth=${overflow.clientWidth}`);
          failures.push({
            screenName,
            route,
            language: lang.code,
            viewport: vp.label,
            overflowError: `scrollWidth=${overflow.scrollWidth} > clientWidth=${overflow.clientWidth}`,
          });
          return false;
        }
        overflowPassCount++;

        // Capture buffer
        const dest = path.join(vpDir, `${screenName}.png`);
        const screenshotBuf = await page.screenshot({ fullPage: false });
        const hash = computeBufferSha256(screenshotBuf);

        // Check for duplicate screen within this run
        if (runHashes[hash]) {
          const err = `Duplicate screen detected! ${screenName} has identical image hash as ${runHashes[hash]}`;
          console.error(`[DUPLICATE ERROR] ${err}`);
          duplicateErrors.push({ screenName, matchedWith: runHashes[hash], hash, language: lang.code, viewport: vp.label });
          return false;
        }
        runHashes[hash] = screenName;

        fs.writeFileSync(dest, screenshotBuf);
        capturedRegistry.push({
          screenName,
          language: lang.code,
          viewport: vp.label,
          path: dest,
          hash,
        });

        console.log(`[PASS] ${screenName} [${lang.code.toUpperCase()}] [${vp.label}] -> SHA256: ${hash.slice(0, 8)}...`);
        return true;
      };

      // ─────────────────────────────────────────────────────────────
      // SCREEN 12: Recycler Matching
      // ─────────────────────────────────────────────────────────────
      await page.waitForFunction(
        () => document.body.innerText.includes('EcoRecycle') || document.body.innerText.includes('इको'),
        { timeout: 4000 }
      );
      await validateAndCapture('12_recycler_matching', '/collector/recyclers');

      // Click "VIEW & SELECT" on first recycler
      const selectBtn = await page.$('div.space-y-3 button');
      if (selectBtn) {
        await selectBtn.click();
      }

      // ─────────────────────────────────────────────────────────────
      // SCREEN 13: Recycler Detail Profile
      // ─────────────────────────────────────────────────────────────
      await page.waitForFunction(
        () => {
          const text = document.body.innerText;
          return text.includes('PROFILE') || text.includes('प्रोफाइल');
        },
        { timeout: 5000 }
      );
      await new Promise((res) => setTimeout(res, 250));
      await validateAndCapture('13_recycler_detail', '/collector/recyclers/rec-pune-01');

      // Click "INITIATE HANDOVER"
      const initiateBtn = await page.$('button.w-full');
      if (initiateBtn) {
        await initiateBtn.click();
      }

      // ─────────────────────────────────────────────────────────────
      // SCREEN 14: Handover Request
      // ─────────────────────────────────────────────────────────────
      await page.waitForFunction(
        () => {
          const text = document.body.innerText;
          return text.includes('HANDOVER') || text.includes('अनुरोध') || text.includes('विनंती');
        },
        { timeout: 5000 }
      );
      await new Promise((res) => setTimeout(res, 250));
      await validateAndCapture('14_handover_request', '/collector/handover');

      // Type handover note
      const notesArea = await page.$('textarea');
      if (notesArea) {
        await notesArea.type('Delivery scheduled tomorrow morning at yard gate 2.');
      }

      // Submit handover request
      const submitBtn = await page.$('button[type="submit"]');
      if (submitBtn) {
        await submitBtn.click();
      }

      // ─────────────────────────────────────────────────────────────
      // SCREEN 15: Handover Confirmed (Success State)
      // ─────────────────────────────────────────────────────────────
      await page.waitForFunction(
        () => {
          const text = document.body.innerText;
          return text.includes('TXN-2026-');
        },
        { timeout: 5000 }
      );
      await new Promise((res) => setTimeout(res, 300));
      await validateAndCapture('15_handover_confirmed', '/collector/handover?status=confirmed');

      await page.close();
    }
  }

  // Responsive QA check across extra requested viewports
  console.log('\n====================================================');
  console.log('RUNNING RESPONSIVE OVERFLOW AUDIT ACROSS EXTRA VIEWPORTS');
  console.log('====================================================');
  for (const vp of responsiveCheckViewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

    const routesToCheck = [
      'http://localhost:5173/collector/recyclers',
      'http://localhost:5173/collector/recyclers/rec-pune-01',
      'http://localhost:5173/collector/handover',
    ];

    for (const url of routesToCheck) {
      await page.goto(url, { waitUntil: 'networkidle0' });
      await new Promise((res) => setTimeout(res, 200));

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      }));

      if (overflow.hasHorizontalScroll) {
        console.error(`[RESPONSIVE OVERFLOW ERROR] ${url} @ ${vp.label} (${vp.width}x${vp.height})`);
        failures.push({
          url,
          viewport: vp.label,
          error: `scrollWidth=${overflow.scrollWidth} > clientWidth=${overflow.clientWidth}`,
        });
      } else {
        console.log(`[PASS] Responsive ${vp.label} (${vp.width}x${vp.height}) -> ${url.replace('http://localhost:5173', '')}`);
        overflowPassCount++;
      }
    }
    await page.close();
  }

  await browser.close();

  // Cross-language duplicate checks
  const screenViewportGroups = {};
  for (const item of capturedRegistry) {
    const key = `${item.screenName}_${item.viewport}`;
    if (!screenViewportGroups[key]) screenViewportGroups[key] = [];
    screenViewportGroups[key].push(item);
  }

  for (const [key, items] of Object.entries(screenViewportGroups)) {
    const hashes = items.map((i) => i.hash);
    const uniqueHashes = new Set(hashes);
    if (uniqueHashes.size !== items.length) {
      console.error(`[CROSS-LANGUAGE DUPLICATE ERROR] ${key} produced identical image across languages!`);
      duplicateErrors.push({
        type: 'cross-language-duplicate',
        group: key,
        items,
      });
    }
  }

  console.log('\n====================================================');
  console.log('BATCH 3 QA RUN COMPLETE — SUMMARY');
  console.log('====================================================');
  console.log(`Total screenshots captured: ${capturedRegistry.length}`);
  console.log(`Language validation passes: ${capturedRegistry.length}`);
  console.log(`Validation failures: ${failures.length}`);
  console.log(`Duplicate image detections: ${duplicateErrors.length}`);
  console.log(`Total overflow checks passed: ${overflowPassCount}`);

  if (failures.length > 0 || duplicateErrors.length > 0) {
    console.error('\nFAILURES SUMMARY:');
    console.error(JSON.stringify({ failures, duplicateErrors }, null, 2));
    process.exit(1);
  } else {
    console.log('\nALL 24 BATCH 3 SCREENSHOTS PASSED STRICT LANGUAGE & DIVERGENCE VALIDATION!');
    console.log('ALL RESPONSIVE AUDIT VIEWPORTS CONFIRMED 0 OVERFLOW!');
  }
}

runDeterministicBatch3QA().catch((err) => {
  console.error('Fatal Batch 3 QA error:', err);
  process.exit(1);
});
