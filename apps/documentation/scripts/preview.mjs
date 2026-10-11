import { existsSync } from 'node:fs';
import { lstat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import handler from 'serve-handler';

const directory = fileURLToPath(new URL('../out/', import.meta.url));
const { values } = parseArgs({ options: { port: { type: 'string', short: 'p' } } });
const port = Number(values.port ?? process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('Preview port must be an integer between 1 and 65535.');
}
if (!existsSync(`${directory}/index.html`)) {
  throw new Error('Run pnpm build before previewing the documentation.');
}

const server = createServer((request, response) => handler(request, response, {
  public: directory,
  cleanUrls: true,
  directoryListing: false,
  trailingSlash: false,
}, {
  async lstat(filename) {
    const stats = await lstat(filename);
    if (stats.isDirectory()) {
      const html = await lstat(`${filename}.html`).catch((error) => {
        if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') throw error;
        return null;
      });
      // Next exports RSC files in a same-name directory. Let cleanUrls find the HTML.
      if (html?.isFile()) {
        throw Object.assign(new Error('Prefer the exported HTML document.'), { code: 'ENOENT' });
      }
    }
    return stats;
  },
}));

server.listen(port, '127.0.0.1', () => {
  console.log(`Documentation preview: http://127.0.0.1:${port}`);
});
