
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
    exitCode = 1;
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
