'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = process.env.QA_BASE_URL || 'http://localhost:3000';
const VIDEO_DIR = path.join(__dirname, 'temporary screenshots');
const OUTPUT_NAME = 'demo-portfolio-walkthrough.webm';
const REHEARSAL = process.argv.includes('--rehearse');

if (!fs.existsSync(VIDEO_DIR)) fs.mkdirSync(VIDEO_DIR, { recursive: true });

async function injectCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-cursor')) return;
    const cursor = document.createElement('div');
    cursor.id = 'demo-cursor';
    cursor.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="white" stroke="black" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`;
    cursor.style.cssText = `
      position: fixed; z-index: 999999; pointer-events: none;
      width: 24px; height: 24px;
      transition: left 0.1s, top 0.1s;
      filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.3));
    `;
    cursor.style.left = '0px';
    cursor.style.top = '0px';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  });
}

async function injectSubtitleBar(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-subtitle')) return;
    const bar = document.createElement('div');
    bar.id = 'demo-subtitle';
    bar.style.cssText = `
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 999998;
      text-align: center; padding: 12px 24px;
      background: rgba(0, 0, 0, 0.75);
      color: white; font-family: -apple-system, "Segoe UI", sans-serif;
      font-size: 16px; font-weight: 500; letter-spacing: 0.3px;
      transition: opacity 0.3s;
      pointer-events: none;
    `;
    bar.textContent = '';
    bar.style.opacity = '0';
    document.body.appendChild(bar);
  });
}

async function showSubtitle(page, text) {
  await page.evaluate((t) => {
    const bar = document.getElementById('demo-subtitle');
    if (!bar) return;
    if (t) {
      bar.textContent = t;
      bar.style.opacity = '1';
    } else {
      bar.style.opacity = '0';
    }
  }, text);
  if (text) await page.waitForTimeout(800);
}

async function ensureVisible(page, locator, label) {
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  const visible = await el.isVisible().catch(() => false);
  if (!visible) {
    console.error(`REHEARSAL FAIL: "${label}" not found - selector: ${typeof locator === 'string' ? locator : '(locator object)'}`);
    return false;
  }
  console.log(`REHEARSAL OK: "${label}"`);
  return true;
}

async function moveAndClick(page, locator, label, opts = {}) {
  const { postClickDelay = 800, ...clickOpts } = opts;
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  const visible = await el.isVisible().catch(() => false);
  if (!visible) {
    console.error(`WARNING: moveAndClick skipped - "${label}" not visible`);
    return false;
  }
  try {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const box = await el.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
      await page.waitForTimeout(400);
    }
    await el.click(clickOpts);
  } catch (e) {
    console.error(`WARNING: moveAndClick failed on "${label}": ${e.message}`);
    return false;
  }
  await page.waitForTimeout(postClickDelay);
  return true;
}

async function smoothScrollTo(page, y, wait = 1500) {
  await page.evaluate((target) => window.scrollTo({ top: target, behavior: 'smooth' }), y);
  await page.waitForTimeout(wait);
}

const REHEARSAL_STEPS = [
  { label: 'Title screen Play button', selector: 'a:has-text("Play")' },
  { label: 'Title screen Contact button', selector: 'a:has-text("Contact Me")' },
];

const REHEARSAL_STEPS_PORTFOLIO = [
  { label: 'Nav About link', selector: 'a:has-text("About")' },
  { label: 'Nav Work link', selector: 'a:has-text("Work")' },
  { label: 'Nav Contact link', selector: 'a:has-text("Contact")' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });

  if (REHEARSAL) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    let allOk = true;
    for (const step of REHEARSAL_STEPS) {
      if (!await ensureVisible(page, step.selector, step.label)) allOk = false;
    }

    await page.goto(`${BASE_URL}/portfolio/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    for (const step of REHEARSAL_STEPS_PORTFOLIO) {
      if (!await ensureVisible(page, step.selector, step.label)) allOk = false;
    }

    await browser.close();
    if (!allOk) {
      console.error('REHEARSAL FAILED - fix selectors before recording');
      process.exit(1);
    }
    console.log('REHEARSAL PASSED - all selectors verified');
    return;
  }

  const context = await browser.newContext({
    recordVideo: { dir: VIDEO_DIR, size: { width: 1280, height: 720 } },
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  try {
    // Entry: title screen
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await injectCursor(page);
    await injectSubtitleBar(page);
    await showSubtitle(page, 'Step 1 - Title screen');
    await page.waitForTimeout(2500);

    // Action: click Play into the portfolio
    await showSubtitle(page, 'Step 2 - Entering the portfolio');
    await moveAndClick(page, 'a:has-text("Play")', 'Play button', { postClickDelay: 1500 });
    await page.waitForLoadState('networkidle').catch(() => {});
    await injectCursor(page);
    await injectSubtitleBar(page);
    await page.waitForTimeout(1000);

    // Hero section
    await showSubtitle(page, 'Step 3 - Hero introduction');
    await page.waitForTimeout(2500);

    // About section
    await showSubtitle(page, 'Step 4 - About');
    await smoothScrollTo(page, 769, 1800);
    await page.waitForTimeout(1500);

    // Career section
    await showSubtitle(page, 'Step 5 - Career timeline');
    await smoothScrollTo(page, 1478, 1800);
    await page.waitForTimeout(2000);

    // Work section
    await showSubtitle(page, 'Step 6 - Projects and work');
    await smoothScrollTo(page, 2291, 1800);
    await page.waitForTimeout(2000);
    await smoothScrollTo(page, 2900, 1500);
    await page.waitForTimeout(1500);

    // Open positions / extra section
    await showSubtitle(page, 'Step 7 - Open positions');
    await smoothScrollTo(page, 3463, 1800);
    await page.waitForTimeout(2000);

    // Contact section
    await showSubtitle(page, 'Step 8 - Get in touch');
    await smoothScrollTo(page, 4183, 1800);
    await page.waitForTimeout(2500);

    // Result: back to top
    await showSubtitle(page, '');
    await smoothScrollTo(page, 0, 1800);
    await page.waitForTimeout(1500);
  } catch (err) {
    console.error('DEMO ERROR:', err.message);
  } finally {
    await context.close();
    const video = page.video();
    if (video) {
      const src = await video.path();
      const dest = path.join(VIDEO_DIR, OUTPUT_NAME);
      try {
        fs.copyFileSync(src, dest);
        console.log('Video saved:', dest);
      } catch (e) {
        console.error('ERROR: Failed to copy video:', e.message);
        console.error('  Source:', src);
        console.error('  Destination:', dest);
      }
    }
    await browser.close();
  }
})();
