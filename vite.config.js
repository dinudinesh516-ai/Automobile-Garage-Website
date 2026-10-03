import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Dev-only plugin: serves the Vercel functions in /api/*.js from the Vite dev
 * server (e.g. GET /api/reviews → api/reviews.js), so `npm run dev` behaves
 * like production without the Vercel CLI. In production Vercel serves /api/*
 * natively and this plugin is inert.
 */
function localApiPlugin() {
  return {
    name: 'local-vercel-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res, next) => {
        const name = (req.url || '').split('?')[0].replace(/^\/+|\/+$/g, '');
        const file = resolve(server.config.root, 'api', `${name}.js`);
        if (!/^[\w-]+$/.test(name) || !existsSync(file)) return next();

        // Collect raw body (for POST handlers)
        let raw = '';
        for await (const chunk of req) raw += chunk;
        req.body = raw;

        // Minimal shim of Vercel's res helpers
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };

        const { default: handler } = await server.ssrLoadModule(`/api/${name}.js`);
        await handler(req, res);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Expose server-only vars (Google key) to the dev middleware — never to the client bundle.
  const env = loadEnv(mode, process.cwd(), '');
  for (const key of Object.keys(env)) {
    if (key.startsWith('GOOGLE_')) process.env[key] = env[key];
  }

  return {
    plugins: [react(), localApiPlugin()],
    css: {
      preprocessorOptions: {
        scss: {
          // Bootstrap 5.3 still uses @import / global functions internally.
          quietDeps: true,
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
        },
      },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: false,
    },
  };
});
