#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'content/slides.json');
const args = process.argv.slice(2);

function usage() {
  console.log('Usage: npm run import:slides -- --day 4 /private/path/lesson.pptx');
  console.log('   or: npm run import:slides -- --directory /private/path/to/day-01.pptx ... day-30.pptx');
  process.exit(1);
}
function run(command, commandArgs) {
  const result = spawnSync(command, commandArgs, { encoding: 'utf8', env: { ...process.env, XDG_CACHE_HOME: path.join(os.tmpdir(), 'designerkid-cache') } });
  if (result.error || result.status !== 0) throw new Error(`${command} failed: ${result.error?.message || result.stderr || result.stdout}`);
  return result.stdout;
}
function importOne(day, source, manifest) {
  if (!Number.isInteger(day) || day < 1 || day > 30) throw new Error(`Invalid day: ${day}`);
  if (!fs.existsSync(source) || !source.toLowerCase().endsWith('.pptx')) throw new Error(`PowerPoint file not found: ${source}`);
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), `designerkid-day-${day}-`));
  const pdf = path.join(temp, 'lesson.pdf');
  const outputDir = path.join(root, 'public/images/lessons', `day-${String(day).padStart(2, '0')}`);
  try {
    fs.copyFileSync(source, path.join(temp, 'lesson.pptx'));
    run('soffice', [`-env:UserInstallation=file://${path.join(temp, 'lo-profile')}`, '--headless', '--convert-to', 'pdf', '--outdir', temp, path.join(temp, 'lesson.pptx')]);
    const info = run('pdfinfo', [pdf]);
    const count = Number(info.match(/^Pages:\s+(\d+)/m)?.[1]);
    if (!count) throw new Error(`No slides rendered for day ${day}`);
    run('pdftoppm', ['-jpeg', '-jpegopt', 'quality=84', '-r', '130', pdf, path.join(temp, 'slide')]);
    const images = fs.readdirSync(temp).filter(name => /^slide-\d+\.jpg$/.test(name)).sort();
    if (images.length !== count) throw new Error(`Expected ${count} slide images; got ${images.length}`);
    fs.rmSync(outputDir, { recursive: true, force: true });
    fs.mkdirSync(outputDir, { recursive: true });
    images.forEach((name, index) => fs.copyFileSync(path.join(temp, name), path.join(outputDir, `slide-${String(index + 1).padStart(2, '0')}.jpg`)));
    manifest[String(day)] = { count, format: 'jpg', updated: new Date().toISOString().slice(0, 10) };
    console.log(`Day ${String(day).padStart(2, '0')}: rendered ${count} slides`);
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
}

try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (args[0] === '--day' && args.length === 3) importOne(Number(args[1]), path.resolve(args[2]), manifest);
  else if (args[0] === '--directory' && args.length === 2) {
    const directory = path.resolve(args[1]);
    const files = fs.readdirSync(directory).filter(name => /^day[-_ ]?(0?[1-9]|[12]\d|30)(?:[-_ ].*)?\.pptx$/i.test(name));
    if (!files.length) throw new Error('No files beginning with Day_01 through Day_30 were found.');
    const days = files.map(name => Number(name.match(/^day[-_ ]?(\d+)/i)[1]));
    if (new Set(days).size !== days.length) throw new Error('More than one PowerPoint file maps to the same day.');
    files.sort().forEach(name => importOne(Number(name.match(/\d+/)[0]), path.join(directory, name), manifest));
  } else usage();
  fs.writeFileSync(`${manifestPath}.tmp`, JSON.stringify(Object.fromEntries(Object.entries(manifest).sort((a,b) => Number(a[0])-Number(b[0]))), null, 2) + '\n');
  fs.renameSync(`${manifestPath}.tmp`, manifestPath);
} catch (error) { console.error(error.message); process.exit(1); }
