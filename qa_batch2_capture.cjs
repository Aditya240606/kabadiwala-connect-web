const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseOutDir = path.join(__dirname, 'screenshots', 'batch2');

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'mr', name: 'Marathi' },
];

const viewports = [
  { label: 'desktop', width: 1280, height: 920 },
  { label: 'mobile', width: 440, height: 920 },
];

/**
 * Language text assertions for each screen.
 * Each screen definition contains:
 * - name: file identifier
 * - expected: strings that MUST be present for that language
 * - forbidden: strings from other languages that MUST NOT appear as title/heading
 */
const screenAssertions = {
  '06_capture_photo': {
    en: {
      mustInclude: ['CAPTURE MATERIAL', 'TAKE PHOTO'],
      mustExclude: ['सामग्री कैप्चर', 'सामग्री कॅप्चर', 'फोटो लें', 'फोटो घ्या'],
    },
    hi: {
      mustInclude: ['सामग्री कैप्चर करें', 'फोटो लें'],
      mustExclude: ['CAPTURE MATERIAL', 'सामग्री कॅप्चर करा', 'TAKE PHOTO', 'फोटो घ्या'],
    },
    mr: {
      mustInclude: ['सामग्री कॅप्चर करा', 'फोटो घ्या'],
      mustExclude: ['CAPTURE MATERIAL', 'सामग्री कैप्चर करें', 'TAKE PHOTO', 'फोटो लें'],
    },
  },
  '07_ai_classification': {
    en: {
      mustInclude: ['AI CLASSIFICATION', 'CONFIRM CATEGORY'],
      mustExclude: ['AI वर्गीकरण', 'श्रेणी पुष्ट करें', 'श्रेणी पुष्टी करा'],
    },
    hi: {
      mustInclude: ['AI वर्गीकरण', 'श्रेणी पुष्ट करें'],
      mustExclude: ['AI CLASSIFICATION', 'CONFIRM CATEGORY', 'श्रेणी पुष्टी करा'],
    },
    mr: {
      mustInclude: ['AI वर्गीकरण', 'श्रेणी पुष्टी करा'],
      mustExclude: ['AI CLASSIFICATION', 'CONFIRM CATEGORY', 'श्रेणी पुष्ट करें'],
    },
  },
  '08_manual_category': {
    en: {
      mustInclude: ['SELECT CATEGORY', 'CONFIRM SELECTION'],
      mustExclude: ['श्रेणी चुनें', 'श्रेणी निवडा', 'चयन पुष्ट', 'निवड पुष्टी'],
    },
    hi: {
      mustInclude: ['श्रेणी चुनें', 'चयन पुष्ट करें'],
      mustExclude: ['SELECT CATEGORY', 'श्रेणी निवडा', 'CONFIRM SELECTION', 'निवड पुष्टी करा'],
    },
    mr: {
      mustInclude: ['श्रेणी निवडा', 'निवड पुष्टी करा'],
      mustExclude: ['SELECT CATEGORY', 'श्रेणी चुनें', 'CONFIRM SELECTION', 'चयन पुष्ट करें'],
    },
  },
  '09_weight_entry': {
    en: {
      mustInclude: ['ENTER WEIGHT', 'CONTINUE'],
      mustExclude: ['वज़न दर्ज', 'वजन नोंदवा', 'आगे बढ़ें', 'पुढे जा'],
    },
    hi: {
      mustInclude: ['वज़न दर्ज करें', 'आगे बढ़ें'],
      mustExclude: ['ENTER WEIGHT', 'वजन नोंदवा', 'CONTINUE', 'पुढे जा'],
    },
    mr: {
      mustInclude: ['वजन नोंदवा', 'पुढे जा'],
      mustExclude: ['ENTER WEIGHT', 'वज़न दर्ज करें', 'CONTINUE', 'आगे बढ़ें'],
    },
  },
  '10_review_lot': {
    en: {
      mustInclude: ['REVIEW LOT', 'CREATE LOT'],
      mustExclude: ['लॉट समीक्षा', 'लॉट पुनरावलोकन', 'लॉट बनाएं', 'लॉट तयार करा'],
    },
    hi: {
      mustInclude: ['लॉट समीक्षा', 'लॉट बनाएं'],
      mustExclude: ['REVIEW LOT', 'लॉट पुनरावलोकन', 'CREATE LOT', 'लॉट तयार करा'],
    },
    mr: {
      mustInclude: ['लॉट पुनरावलोकन', 'लॉट तयार करा'],
      mustExclude: ['REVIEW LOT', 'लॉट समीक्षा', 'CREATE LOT', 'लॉट बनाएं'],
    },
  },
  '11_lot_created': {
    en: {
      mustInclude: ['LOT CREATED', 'NEW COLLECTION'],
      mustExclude: ['लॉट बनाया गया', 'लॉट तयार झाला', 'नया संग्रह', 'नवीन संकलन'],
    },
    hi: {
      mustInclude: ['लॉट बनाया गया', 'नया संग्रह'],
      mustExclude: ['LOT CREATED', 'लॉट तयार झाला', 'NEW COLLECTION', 'नवीन संकलन'],
    },
    mr: {
      mustInclude: ['लॉट तयार झाला', 'नवीन संकलन'],
      mustExclude: ['LOT CREATED', 'लॉट बनाया गया', 'NEW COLLECTION', 'नया संग्रह'],
    },
  },
};

function computeBufferSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function runDeterministicQA() {
  console.log('====================================================');
  console.log('DETERMINISTIC BATCH 2 SCREENSHOT QA HARNESS');
  console.log('====================================================\n');

  // Ensure base out dir
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

  for (const lang of languages) {
    console.log(`\n====================================================`);
    console.log(`TESTING LANGUAGE: ${lang.name.toUpperCase()} (${lang.code.toUpperCase()})`);
    console.log(`====================================================`);

    for (const vp of viewports) {
      console.log(`\n>>> Viewport: ${vp.label.toUpperCase()} (${vp.width}x${vp.height}) <<<`);

      const vpDir = path.join(baseOutDir, lang.code, vp.label);
      fs.mkdirSync(vpDir, { recursive: true });

      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });

      // 1. Explicitly set language before navigation
      await page.evaluateOnNewDocument((l) => {
        localStorage.clear();
        localStorage.setItem('kc_language', l);
      }, lang.code);

      // Navigate to capture start
      await page.goto('http://localhost:5173/collector/flow/capture', { waitUntil: 'networkidle0' });

      // In-page explicit language set & click Header language button to guarantee React state synchronization
      await page.evaluate((l) => {
        localStorage.setItem('kc_language', l);
        const headerButtons = Array.from(document.querySelectorAll('header button'));
        const langBtn = headerButtons.find((b) => b.innerText.trim().toUpperCase() === l.toUpperCase());
        if (langBtn) langBtn.click();
      }, lang.code);

      await new Promise((res) => setTimeout(res, 300));

      // Local fingerprint registry for this viewport/language run
      const runHashes = {};

      /**
       * Validates language text on screen, checks overflow, and captures screenshot
       */
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

        // Horizontal overflow assertion
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

        // Capture buffer
        const dest = path.join(vpDir, `${screenName}.png`);
        const screenshotBuf = await page.screenshot({ fullPage: false });
        const hash = computeBufferSha256(screenshotBuf);

        // Check for duplicate screen within this run (harness didn't advance state)
        if (runHashes[hash]) {
          const err = `Duplicate screen detected! ${screenName} has identical image hash as ${runHashes[hash]}`;
          console.error(`[DUPLICATE ERROR] ${err}`);
          duplicateErrors.push({ screenName, matchedWith: runHashes[hash], hash, language: lang.code, viewport: vp.label });
          return false;
        }
        runHashes[hash] = screenName;

        // Save screenshot
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
      // SCREEN 06: Capture Photo
      // ─────────────────────────────────────────────────────────────
      await validateAndCapture('06_capture_photo', '/collector/flow/capture');

      // Click "Use Sample Photo" button
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const sampleBtn = btns.find((b) =>
          b.innerText.includes('Sample') ||
          b.innerText.includes('नमूना') ||
          b.innerText.includes('नमुना')
        );
        if (sampleBtn) sampleBtn.click();
      });

      // Wait for image to render in DOM
      await page.waitForSelector('img[alt="Captured material"]', { timeout: 3000 });
      await new Promise((res) => setTimeout(res, 200));

      // Click "Use This Photo"
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const useBtn = btns.find((b) =>
          b.innerText.includes('USE THIS') ||
          b.innerText.includes('उपयोग करें') ||
          b.innerText.includes('वापरा')
        );
        if (useBtn) useBtn.click();
      });

      // ─────────────────────────────────────────────────────────────
      // SCREEN 07: AI Classification Result
      // ─────────────────────────────────────────────────────────────
      // Wait for simulated AI classification to complete (max 5s)
      await page.waitForFunction(
        () => {
          const text = document.body.innerText;
          return text.includes('CONFIRM') || text.includes('पुष्ट') || text.includes('पुष्टी');
        },
        { timeout: 7000 }
      );
      await new Promise((res) => setTimeout(res, 200));
      await validateAndCapture('07_ai_classification', '/collector/flow/classify');

      // Click "Select Different" (Correct Category) to test Manual Category screen
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const correctBtn = btns.find((b) =>
          b.innerText.includes('SELECT DIFFERENT') ||
          b.innerText.includes('अन्य चुनें') ||
          b.innerText.includes('वेगळी निवडा')
        );
        if (correctBtn) correctBtn.click();
      });

      // ─────────────────────────────────────────────────────────────
      // SCREEN 08: Manual Category Grid
      // ─────────────────────────────────────────────────────────────
      await page.waitForFunction(
        () => {
          const text = document.body.innerText;
          return text.includes('CATEGORY') || text.includes('श्रेणी') || text.includes('वर्ग') || text.includes('निवडा');
        },
        { timeout: 4000 }
      );
      await new Promise((res) => setTimeout(res, 200));
      await validateAndCapture('08_manual_category', '/collector/flow/manual-category');

      // Select first category card (Smartphone Scrap)
      await page.evaluate(() => {
        const catButtons = Array.from(document.querySelectorAll('div.grid button'));
        if (catButtons.length > 0) catButtons[0].click();
      });
      await new Promise((res) => setTimeout(res, 200));

      // Click "Confirm Selection"
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const confirmBtn = btns.find((b) =>
          b.innerText.includes('CONFIRM SELECTION') ||
          b.innerText.includes('चयन पुष्ट') ||
          b.innerText.includes('निवड पुष्टी')
        );
        if (confirmBtn) confirmBtn.click();
      });

      // ─────────────────────────────────────────────────────────────
      // SCREEN 09: Weight Entry
      // ─────────────────────────────────────────────────────────────
      await page.waitForSelector('input[type="number"]', { timeout: 4000 });
      const weightInput = await page.$('input[type="number"]');
      if (weightInput) {
        await weightInput.click({ clickCount: 3 });
        await weightInput.type('14.5');
      }
      await new Promise((res) => setTimeout(res, 400));
      await validateAndCapture('09_weight_entry', '/collector/flow/weight');

      // Click "Continue" to Review
      const buttonsAfterWeight = await page.$$('button');
      for (const btn of buttonsAfterWeight) {
        const text = await page.evaluate((el) => el.innerText, btn);
        if (text && (text.includes('CONTINUE') || text.includes('आगे बढ़ें') || text.includes('पुढे जा'))) {
          await btn.click();
          break;
        }
      }

      // ─────────────────────────────────────────────────────────────
      // SCREEN 10: Review Lot
      // ─────────────────────────────────────────────────────────────
      await page.waitForFunction(
        () => {
          const text = document.body.innerText;
          return text.includes('REVIEW') || text.includes('समीक्षा') || text.includes('पुनरावलोकन');
        },
        { timeout: 6000 }
      );
      await new Promise((res) => setTimeout(res, 300));
      await validateAndCapture('10_review_lot', '/collector/flow/review');

      // Click "Create Lot"
      const reviewButtons = await page.$$('button');
      for (const btn of reviewButtons) {
        const text = await page.evaluate((el) => el.innerText, btn);
        if (text && (text.includes('CREATE LOT') || text.includes('लॉट बनाएं') || text.includes('लॉट तयार करा'))) {
          await btn.click();
          break;
        }
      }

      // ─────────────────────────────────────────────────────────────
      // SCREEN 11: Lot Created Success
      // ─────────────────────────────────────────────────────────────
      await page.waitForFunction(
        () => {
          const text = document.body.innerText;
          return text.includes('CREATED') || text.includes('बनाया गया') || text.includes('तयार झाला');
        },
        { timeout: 8000 }
      );
      await new Promise((res) => setTimeout(res, 400));
      await validateAndCapture('11_lot_created', '/collector/flow/created');

      await page.close();
    }
  }

  await browser.close();

  // Cross-language duplicate checks:
  // Assert that same screen across different languages (e.g. EN 06 vs HI 06 vs MR 06) do NOT have identical hashes
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
  console.log('QA RUN COMPLETE — SUMMARY');
  console.log('====================================================');
  console.log(`Total screenshots captured: ${capturedRegistry.length}`);
  console.log(`Language validation passes: ${capturedRegistry.length}`);
  console.log(`Validation failures: ${failures.length}`);
  console.log(`Duplicate image detections: ${duplicateErrors.length}`);

  if (failures.length > 0 || duplicateErrors.length > 0) {
    console.error('\nFAILURES SUMMARY:');
    console.error(JSON.stringify({ failures, duplicateErrors }, null, 2));
    process.exit(1);
  } else {
    console.log('\nALL 36 SCREENSHOTS PASSED STRICT LANGUAGE & DIVERGENCE VALIDATION!');
  }
}

runDeterministicQA().catch((err) => {
  console.error('Fatal QA error:', err);
  process.exit(1);
});
