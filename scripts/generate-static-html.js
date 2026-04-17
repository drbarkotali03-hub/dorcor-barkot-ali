import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist', 'client');
const assetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(distDir) || !fs.existsSync(assetsDir)) {
  console.error('Error: dist/client or dist/client/assets not found. Run build first.');
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);
const cssFiles = files.filter((file) => file.endsWith('.css'));
const jsFiles = files.filter((file) => file.endsWith('.js'));

if (jsFiles.length === 0) {
  console.error('Error: no JS files found in dist/client/assets');
  process.exit(1);
}

const cssTags = cssFiles
  .map((file) => `<link rel="stylesheet" href="/assets/${file}" />`)
  .join('\n    ');
const jsTags = jsFiles
  .map((file) => `<script type="module" src="/assets/${file}"></script>`)
  .join('\n    ');

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dr. Barkot Ali - Child Specialist</title>
    ${cssTags}
  </head>
  <body>
    <div id="app"></div>
    ${jsTags}
  </body>
</html>
`;

fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(distDir, '404.html'), html, 'utf8');
console.log('Generated dist/client/index.html and dist/client/404.html');
