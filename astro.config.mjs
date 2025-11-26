// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    integrations: [react()],
    site: 'https://www.leeweisberger.com',

    adapter: cloudflare(),
    // https://github.com/withastro/astro/issues/12824
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
            // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
            alias: import.meta.env.PROD
                ? {
                      'react-dom/server': 'react-dom/server.edge',
                  }
                : undefined,
        },
        define: {
            // eslint-disable-next-line no-undef
            'process.env': process.env,
        },
    },
});
