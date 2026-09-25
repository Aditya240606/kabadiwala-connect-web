const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseOutDir = path.join(__dirname, 'screenshots', 'batch4');

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
  '16_collector_tracking_initiated': {
    en: {
      mustInclude: ['TRANSACTION TRACKING', 'TXN-2026-001'],
      mustExclude: ['लेन-देन ट्रैकिंग', 'व्यवहार ट्रॅकिंग'],
    },
    hi: {
      mustInclude: ['लेन-देन ट्रैकिंग', 'TXN-2026-001'],
      mustExclude: ['TRANSACTION TRACKING', 'व्यवहार ट्रॅकिंग'],
    },
    mr: {
      mustInclude: ['व्यवहार ट्रॅकिंग', 'TXN-2026-001'],
      mustExclude: ['TRANSACTION TRACKING', 'लेन-देन ट्रैकिंग'],
    },
  },
  '17_recycler_dashboard': {
    en: {
      mustInclude: ['RECYCLER CONSOLE', 'VIEW INCOMING LOTS'],
      mustExclude: ['रिसाइक्लर कंसोल', 'रिसायकलर कन्सोल', 'आने वाले लॉट देखें', 'येणारे लॉट्स पहा'],
    },
    hi: {
      mustInclude: ['रिसाइक्लर कंसोल', 'आने वाले लॉट देखें'],
      mustExclude: ['RECYCLER CONSOLE', 'रिसायकलर कन्सोल', 'VIEW INCOMING LOTS', 'येणारे लॉट्स पहा'],
    },
    mr: {
      mustInclude: ['रिसायकलर कन्सोल', 'येणारे लॉट्स पहा'],
      mustExclude: ['RECYCLER CONSOLE', 'रिसाइक्लर कंसोल', 'VIEW INCOMING LOTS', 'आने वाले लॉट देखें'],
    },
  },
  '18_recycler_incoming_lots': {
    en: {
      mustInclude: ['INCOMING LOTS', 'INSPECT LOT'],
      mustExclude: ['आने वाले लॉट', 'येणारे लॉट्स', 'लॉट की जांच करें', 'लॉट तपासा'],
    },
    hi: {
      mustInclude: ['आने वाले लॉट', 'लॉट की जांच करें'],
      mustExclude: ['INCOMING LOTS', 'येणारे लॉट्स', 'INSPECT LOT', 'लॉट तपासा'],
    },
    mr: {
      mustInclude: ['येणारे लॉट्स', 'लॉट तपासा'],
      mustExclude: ['INCOMING LOTS', 'आने वाले लॉट', 'INSPECT LOT', 'लॉट की जांच करें'],
    },
  },
  '19_recycler_lot_detail': {
    en: {
      mustInclude: ['LOT INSPECTION', 'ACCEPT HANDOVER'],
      mustExclude: ['लॉट निरीक्षण', 'लॉट तपासणी', 'हस्तांतरण स्वीकार करें', 'हस्तांतरण स्वीकारा'],
    },
    hi: {
      mustInclude: ['लॉट निरीक्षण', 'हस्तांतरण स्वीकार करें'],
      mustExclude: ['LOT INSPECTION', 'लॉट तपासणी', 'ACCEPT HANDOVER', 'हस्तांतरण स्वीकारा'],
    },
    mr: {
      mustInclude: ['लॉट तपासणी', 'हस्तांतरण स्वीकारा'],
      mustExclude: ['LOT INSPECTION', 'लॉट निरीक्षण', 'ACCEPT HANDOVER', 'हस्तांतरण स्वीकार करें'],
    },
  },
  '20_recycler_receive_material': {
    en: {
      mustInclude: ['PHYSICAL HANDOVER', 'CONFIRM RECEIVED MATERIAL'],
      mustExclude: ['भौतिक हस्तांतरण', 'प्रत्यक्ष हस्तांतरण', 'प्राप्त सामग्री की पुष्टि करें', 'मिळालेल्या सामग्रीची पुष्टी करा'],
    },
    hi: {
      mustInclude: ['भौतिक हस्तांतरण', 'प्राप्त सामग्री की पुष्टि करें'],
      mustExclude: ['PHYSICAL HANDOVER', 'प्रत्यक्ष हस्तांतरण', 'CONFIRM RECEIVED MATERIAL', 'मिळालेल्या सामग्रीची पुष्टी करा'],
    },
    mr: {
      mustInclude: ['प्रत्यक्ष हस्तांतरण', 'मिळालेल्या सामग्रीची पुष्टी करा'],
      mustExclude: ['PHYSICAL HANDOVER', 'भौतिक हस्तांतरण', 'CONFIRM RECEIVED MATERIAL', 'प्राप्त सामग्री की पुष्टि करें'],
    },
  },
  '21_recycler_payment_settlement': {
    en: {
      mustInclude: ['PAYMENT SETTLEMENT', 'RECORD PAYMENT & COMPLETE'],
      mustExclude: ['भुगतान निपटान', 'पेमेंट देयक नोंद', 'भुगतान दर्ज करें और पूर्ण करें', 'पेमेंट नोंदवा आणि पूर्ण करा'],
    },
    hi: {
      mustInclude: ['भुगतान निपटान', 'भुगतान दर्ज करें और पूर्ण करें'],
      mustExclude: ['PAYMENT SETTLEMENT', 'पेमेंट देयक नोंद', 'RECORD PAYMENT & COMPLETE', 'पेमेंट नोंदवा आणि पूर्ण करा'],
    },
    mr: {
      mustInclude: ['पेमेंट देयक नोंद', 'पेमेंट नोंदवा आणि पूर्ण करा'],
      mustExclude: ['PAYMENT SETTLEMENT', 'भुगतान निपटान', 'RECORD PAYMENT & COMPLETE', 'भुगतान दर्ज करें और पूर्ण करें'],
    },
  },
  '22_recycler_complete_record': {
    en: {
      mustInclude: ['TRANSACTION COMPLETE', 'DIGITAL TRANSACTION RECORD'],
      mustExclude: ['लेन-देन पूर्ण हुआ', 'व्यवहार पूर्ण झाला', 'डिजिटल लेन-देन रिकॉर्ड', 'डिजिटल व्यवहार नोंद'],
    },
    hi: {
      mustInclude: ['लेन-देन पूर्ण हुआ', 'डिजिटल लेन-देन रिकॉर्ड'],
      mustExclude: ['TRANSACTION COMPLETE', 'व्यवहार पूर्ण झाला', 'DIGITAL TRANSACTION RECORD', 'डिजिटल व्यवहार नोंद'],
    },
    mr: {
      mustInclude: ['व्यवहार पूर्ण झाला', 'डिजिटल व्यवहार नोंद'],
      mustExclude: ['TRANSACTION COMPLETE', 'लेन-देन पूर्ण हुआ', 'DIGITAL TRANSACTION RECORD', 'डिजिटल लेन-देन रिकॉर्ड'],
    },
  },
  '23_collector_tracking_completed': {
    en: {
      mustInclude: ['TRANSACTION TRACKING', 'COMPLETED'],
      mustExclude: ['लेन-देन ट्रैकिंग', 'व्यवहार ट्रॅकिंग'],
    },
    hi: {
      mustInclude: ['लेन-देन ट्रैकिंग', 'COMPLETED'],
      mustExclude: ['TRANSACTION TRACKING', 'व्यवहार ट्रॅकिंग'],
    },
    mr: {
      mustInclude: ['व्यवहार ट्रॅकिंग', 'COMPLETED'],
      mustExclude: ['TRANSACTION TRACKING', 'लेन-देन ट्रैकिंग'],
    },
  },
  '24_collector_history': {
    en: {
      mustInclude: ['TRANSACTION HISTORY', 'VIEW RECORD'],
      mustExclude: ['लेन-देन इतिहास', 'व्यवहार इतिहास', 'रिकॉर्ड देखें', 'नोंद पहा'],
    },
    hi: {
      mustInclude: ['लेन-देन इतिहास', 'रिकॉर्ड देखें'],
      mustExclude: ['TRANSACTION HISTORY', 'व्यवहार इतिहास', 'VIEW RECORD', 'नोंद पहा'],
    },
    mr: {
      mustInclude: ['व्यवहार इतिहास', 'नोंद पहा'],
      mustExclude: ['TRANSACTION HISTORY', 'लेन-देन इतिहास', 'VIEW RECORD', 'रिकॉर्ड देखें'],
    },
  },
};

function computeBufferSha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function runDeterministicBatch4QA() {
  console.log('====================================================');
  console.log('DETERMINISTIC BATCH 4 QA HARNESS — HANDOVER & PAYMENT');
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

      // Start at collector tracking
      await page.goto('http://localhost:5173/collector/transactions/TXN-2026-001', { waitUntil: 'networkidle0' });

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
        console.log(`[PASS] ${screenName} -> ${dest} (sha256=${hash.slice(0, 12)}...)`);

        capturedRegistry.push({
          screenName,
          language: lang.code,
          viewport: vp.label,
          filePath: dest,
          hash,
        });
        return true;
      };

      // ── Step 1: Collector Tracking (Initiated) ──
      console.log('   Navigating to: 16_collector_tracking_initiated');
      await page.goto('http://localhost:5173/collector/transactions/TXN-2026-001', { waitUntil: 'networkidle0' });
      await new Promise((res) => setTimeout(res, 250));
      await validateAndCapture('16_collector_tracking_initiated', '/collector/transactions/TXN-2026-001');

      // ── Step 2: Recycler Dashboard ──
      console.log('   Navigating to: 17_recycler_dashboard');
      await page.goto('http://localhost:5173/recycler', { waitUntil: 'networkidle0' });
      await new Promise((res) => setTimeout(res, 250));
      await validateAndCapture('17_recycler_dashboard', '/recycler');

      // ── Step 3: Recycler Incoming Lots ──
      console.log('   Navigating to: 18_recycler_incoming_lots');
      await page.goto('http://localhost:5173/recycler/incoming', { waitUntil: 'networkidle0' });
      await new Promise((res) => setTimeout(res, 250));
      await validateAndCapture('18_recycler_incoming_lots', '/recycler/incoming');

      // ── Step 4: Recycler Lot Detail (Inspection) ──
      console.log('   Navigating to: 19_recycler_lot_detail');
      await page.goto('http://localhost:5173/recycler/lot/TXN-2026-001', { waitUntil: 'networkidle0' });
      await new Promise((res) => setTimeout(res, 250));
      await validateAndCapture('19_recycler_lot_detail', '/recycler/lot/TXN-2026-001');

      // ── Step 5: Recycler Receive Material & Weighing ──
      console.log('   Navigating to: 20_recycler_receive_material');
      await page.goto('http://localhost:5173/recycler/receive/TXN-2026-001', { waitUntil: 'networkidle0' });
      await new Promise((res) => setTimeout(res, 250));
      await validateAndCapture('20_recycler_receive_material', '/recycler/receive/TXN-2026-001');

      // ── Step 6: Recycler Payment Settlement ──
      console.log('   Navigating to: 21_recycler_payment_settlement');
      await page.goto('http://localhost:5173/recycler/settle/TXN-2026-001', { waitUntil: 'networkidle0' });
      await new Promise((res) => setTimeout(res, 250));
      await validateAndCapture('21_recycler_payment_settlement', '/recycler/settle/TXN-2026-001');

      // ── Step 7: Recycler Complete & Digital Record ──
      console.log('   Navigating to: 22_recycler_complete_record');
      await page.goto('http://localhost:5173/recycler/complete/TXN-2026-001', { waitUntil: 'networkidle0' });
      await new Promise((res) => setTimeout(res, 250));
      await validateAndCapture('22_recycler_complete_record', '/recycler/complete/TXN-2026-001');

      // ── Step 8: Collector Tracking (Completed) ──
      console.log('   Navigating to: 23_collector_tracking_completed');
      await page.goto('http://localhost:5173/collector/transactions/TXN-2026-002', { waitUntil: 'networkidle0' });
      await new Promise((res) => setTimeout(res, 250));
      await validateAndCapture('23_collector_tracking_completed', '/collector/transactions/TXN-2026-002');

      // ── Step 9: Collector Transactions History ──
      console.log('   Navigating to: 24_collector_history');
      await page.goto('http://localhost:5173/collector/transactions', { waitUntil: 'networkidle0' });
      await new Promise((res) => setTimeout(res, 250));
      await validateAndCapture('24_collector_history', '/collector/transactions');

      await page.close();
    }
  }

  // ── Responsive Check on Intermediate Viewports ──
  console.log('\n====================================================');
  console.log('RESPONSIVE OVERFLOW CHECKS ACROSS 3 ADDITIONAL VIEWPORTS');
  console.log('====================================================');

  const checkPage = await browser.newPage();
  const testRoutes = [
    '/collector/transactions',
    '/collector/transactions/TXN-2026-001',
    '/recycler',
    '/recycler/incoming',
    '/recycler/lot/TXN-2026-001',
    '/recycler/receive/TXN-2026-001',
    '/recycler/settle/TXN-2026-001',
    '/recycler/complete/TXN-2026-001',
  ];

  for (const vp of responsiveCheckViewports) {
    console.log(`\nTesting Responsive Viewport: ${vp.label} (${vp.width}x${vp.height})`);
    await checkPage.setViewport({ width: vp.width, height: vp.height });

    for (const route of testRoutes) {
      await checkPage.goto(`http://localhost:5173${route}`, { waitUntil: 'networkidle0' });
      const overflow = await checkPage.evaluate(() => ({
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));

      if (overflow.hasOverflow) {
        console.error(`[OVERFLOW ERROR] ${route} on ${vp.label}: scrollWidth=${overflow.scrollWidth} > clientWidth=${overflow.clientWidth}`);
        failures.push({ route, viewport: vp.label, overflowError: overflow });
      } else {
        overflowPassCount++;
      }
    }
  }
  await checkPage.close();
  await browser.close();

  // Summary Report
  console.log('\n====================================================');
  console.log('BATCH 4 QA HARNESS AUDIT SUMMARY');
  console.log('====================================================');
  console.log(`Total Verified Captures: ${capturedRegistry.length} (Target: 54 = 9 screens * 3 languages * 2 viewports)`);
  console.log(`Total Overflow Assertions Passed: ${overflowPassCount}`);
  console.log(`Total Language/Assertion Failures: ${failures.length}`);
  console.log(`Total Duplicate Errors: ${duplicateErrors.length}`);

  if (failures.length > 0 || duplicateErrors.length > 0) {
    console.error('\n>>> QA HARNESS FAILED. REVIEW ERRORS ABOVE. <<<');
    process.exit(1);
  } else {
    console.log('\n>>> DETERMINISTIC BATCH 4 QA PASSED WITH ZERO ERRORS <<<');
  }
}

runDeterministicBatch4QA().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
