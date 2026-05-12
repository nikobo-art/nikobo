import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/Usuario/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const url       = process.argv[2] || 'http://localhost:3000';
const selector  = process.argv[3] || 'body';
const label     = process.argv[4] ? `-${process.argv[4]}` : '';

const existing = fs.readdirSync(outDir).map(f => { const m = f.match(/^screenshot-(\d+)/); return m ? parseInt(m[1]) : 0; });
const n = (existing.length ? Math.max(...existing) : 0) + 1;
const file = path.join(outDir, `screenshot-${n}${label}.png`);

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });
await page.waitForSelector(selector, { timeout: 5000 }).catch(() => {});
await page.evaluate(sel => {
  const el = document.querySelector(sel);
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  // Force all reveal elements visible for screenshots
  document.querySelectorAll('.reveal').forEach(e => e.classList.add('visible'));
}, selector);
await new Promise(r => setTimeout(r, 2500));
await page.screenshot({ path: file });
await browser.close();
console.log(`Saved: ${file}`);
