import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

// Serve /magus-app/* and any other future iframe-mounted apps as raw static files,
// before Vite's HTML middleware can inject @react-refresh and break them.
function rawStaticPlugin(...prefixes: string[]): Plugin {
  return {
    name: 'raw-static',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        const matched = prefixes.find((p) => url.startsWith(p));
        if (!matched) return next();
        // Map URL into the public/ tree
        const cwd = (server.config.publicDir || resolve(process.cwd(), 'public'));
        let filePath = resolve(cwd, '.' + url);
        if (existsSync(filePath) && statSync(filePath).isDirectory()) {
          filePath = resolve(filePath, 'app.html');
        }
        if (!existsSync(filePath) || !statSync(filePath).isFile()) {
          return next();
        }
        const ext = filePath.split('.').pop() || '';
        const mime: Record<string, string> = {
          html: 'text/html; charset=utf-8',
          js: 'application/javascript',
          css: 'text/css',
          json: 'application/json',
          wasm: 'application/wasm',
          png: 'image/png',
          jpg: 'image/jpeg',
          svg: 'image/svg+xml',
          ico: 'image/x-icon',
          ttf: 'font/ttf',
          woff: 'font/woff',
          woff2: 'font/woff2',
          map: 'application/json',
        };
        res.setHeader('Content-Type', mime[ext] || 'application/octet-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.end(readFileSync(filePath));
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    rawStaticPlugin('/magus-app/', '/wp-planner-app/', '/codewitness-app/', '/beacon-app/', '/pgp-app/'),
  ],
  build: {
    rollupOptions: {
      // Two SPAs from one build: index.html = portfolio (portfolio.imwy.ai),
      // landing.html = imwy.ai company landing. Routed by Host in nginx.
      input: {
        main: resolve(process.cwd(), 'index.html'),
        landing: resolve(process.cwd(), 'landing.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
    // WSL on /mnt/d cannot deliver native fs events to chokidar — force polling
    // so source edits are picked up reliably.
    watch: {
      usePolling: true,
      interval: 300,
      // Iframed third-party SPA builds — large + immutable in dev. Excluding them
      // from the watcher keeps memory under control (otherwise Vite gets OOM-killed
      // polling tens of thousands of files).
      ignored: [
        '**/public/beacon-app/**',
        '**/public/magus-app/**',
        '**/public/codewitness-app/**',
        '**/public/wp-planner-app/**',
        '**/node_modules/**',
        '**/dist/**',
      ],
    },
  },
});
