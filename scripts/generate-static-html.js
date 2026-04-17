import fs from 'fs/promises';
import path from 'path';

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
  try {
    const html = await renderPage();
    await fs.writeFile(path.join(distDir, 'index.html'), html, 'utf8');
    await fs.writeFile(path.join(distDir, '404.html'), html, 'utf8');
    console.log('Generated SSR dist/client/index.html and dist/client/404.html');
  } catch (error) {
    console.error('Error generating SSR HTML:', error);
    process.exit(1);
  }
}

main();
