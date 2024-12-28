// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    integrations: [react(), tailwind()],
    site: 'https://www.leeweisberger.com',

    adapter: cloudflare(),
    // https://github.com/withastro/astro/issues/12824
    vite: {
        resolve: {
            // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
            // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
            // @ts-expect-error vite config type is incomplete
            alias: import.meta.env.PROD && {
                'react-dom/server': 'react-dom/server.edge',
            },
        },
    },
});
