
import fs from 'fs/promises';
import path from 'path';
import admin from 'firebase-admin';

const distDir = path.resolve(process.cwd(), 'dist', 'client');
const serverEntryPath = path.resolve(process.cwd(), 'dist', 'server', 'index.js');

async function renderPage(url = 'http://localhost/') {
  const serverEntryUrl = new URL(`file://${serverEntryPath}`);
  const server = await import(serverEntryUrl.href);

  if (!server?.default?.fetch) {
    throw new Error('Server entry does not export a fetch handler.');
  }

  const response = await server.default.fetch(new Request(url));

  if (!response.ok) {
    throw new Error(`SSR render failed: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function main() {
  let exitCode = 0;
  try {
    const html = await renderPage();
    await fs.writeFile(path.join(distDir, 'index.html'), html, 'utf8');
    await fs.writeFile(path.join(distDir, '404.html'), html, 'utf8');
    console.log('Generated SSR dist/client/index.html and dist/client/404.html');
  } catch (error) {
    console.error('Error generating SSR HTML:', error);
    // Fallback to static HTML
    const staticHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dr. Barkot Ali - Child Specialist Khulna</title>
  <meta name="description" content="Professor Dr. Md. Barkot Ali – Leading Child & Adolescent Health Specialist in Khulna, Bangladesh.">
  <link rel="stylesheet" href="/assets/styles-BjPd11Vf.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/assets/index-D8s56bxk.js"></script>
</body>
</html>`;
    await fs.writeFile(path.join(distDir, 'index.html'), staticHtml, 'utf8');
    await fs.writeFile(path.join(distDir, '404.html'), staticHtml, 'utf8');
    console.log('Generated static fallback dist/client/index.html and dist/client/404.html');
  } finally {
    // The server-side code initializes a Firebase Admin app for SSR.
    // We need to gracefully shut it down, otherwise the build process will hang.
    if (admin.apps.length > 0) {
      console.log('Closing Firebase Admin connection...');
      await admin.app().delete();
      console.log('Firebase Admin connection closed.');
    }
    console.log(`Exiting build script with code ${exitCode}.`);
    process.exit(exitCode);
  }
}

main();
