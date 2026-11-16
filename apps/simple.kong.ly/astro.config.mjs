// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    adapter: vercel(),
    site: 'https://simple.kong.ly',
    trailingSlash: 'never',
    vite: {
        server: {
            watch: {
                ignored: ['**/.vercel/**'],
            },
        },
    },
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: 'Inter',
            cssVariable: '--font-inter',
            weights: [400, 500, 600],
        },
    ],

    integrations: [
        sanity({
            projectId: 'mpaopctd',
            dataset: 'production',
            useCdn: false,
        }),
    ],
});
