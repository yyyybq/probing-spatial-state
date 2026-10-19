// Minimal static server with byte ranges (for <video>): node serve.js <root> <port>
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(process.argv[2] || '.'), port = +process.argv[3] || 8765;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4', '.vtt': 'text/vtt; charset=utf-8', '.svg': 'image/svg+xml' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p); if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.stat(f, (e, st) => {
    if (e || !st.isFile()) { res.writeHead(404); return res.end('not found'); }
    const type = types[path.extname(f)] || 'application/octet-stream', range = req.headers.range;
    if (range) {
      const m = /bytes=(\d+)-(\d*)/.exec(range), s = +m[1], en = m[2] ? +m[2] : st.size - 1;
      res.writeHead(206, { 'Content-Range': `bytes ${s}-${en}/${st.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': en - s + 1, 'Content-Type': type });
      fs.createReadStream(f, { start: s, end: en }).pipe(res);
    } else { res.writeHead(200, { 'Content-Type': type, 'Content-Length': st.size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(res); }
  });
}).listen(port, '127.0.0.1', () => console.log(`serving ${root} on http://127.0.0.1:${port}`));
