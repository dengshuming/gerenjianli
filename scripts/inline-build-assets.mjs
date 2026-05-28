import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const distDir = join(projectRoot, 'dist');
const indexPath = join(distDir, 'index.html');

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html does not exist. Run vite build first.');
}

let html = readFileSync(indexPath, 'utf8');

function escapeInlineScript(js) {
  return js
    .replace(/<\/script/gi, '<\\/script')
    .replace(/<!--/g, '<\\!--');
}

function escapeInlineStyle(css) {
  return css.replace(/<\/style/gi, '<\\/style');
}

html = html.replace(
  /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
  (_match, href) => {
    const cssPath = join(distDir, href.replace(/^\//, ''));
    const css = readFileSync(cssPath, 'utf8');
    return `<style>${escapeInlineStyle(css)}</style>`;
  },
);

html = html.replace(
  /<script type="module" crossorigin src="([^"]+)"><\/script>/g,
  (_match, src) => {
    const jsPath = join(distDir, src.replace(/^\//, ''));
    const js = readFileSync(jsPath, 'utf8');
    return `<script type="module">${escapeInlineScript(js)}</script>`;
  },
);

writeFileSync(indexPath, html);
console.log('Inlined build assets into dist/index.html');
