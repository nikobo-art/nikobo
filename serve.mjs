import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const mime = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.mjs': 'application/javascript'
};

// Paths that should serve index.html (mirrors _redirects)
const spa = new Set(['/music', '/coaching']);

http.createServer((req, res) => {
  const pathname = decodeURIComponent(req.url.split('?')[0]);
  const target = (pathname === '/' || spa.has(pathname)) ? 'index.html' : pathname;
  let filePath = path.join(__dirname, target);
  if (!path.extname(filePath)) filePath = path.join(filePath, 'index.html'); // dir stubs (/coaching/1on1 …)
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(err.code === 'ENOENT' ? 404 : 500); res.end(); return; }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Server at http://localhost:${PORT}`));
