// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const sanityProjectId = 'mpaopctd';
const sanityDataset = 'production';

// https://astro.build/config
export default defineConfig({
    adapter: vercel(),
    site: 'https://links.kong.ly',
    trailingSlash: 'never',
    vite: {
        plugins: [tailwindcss()],
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
            weights: [300, 400, 500, 600, 700, 800, 900],
        },
        {
            provider: fontProviders.fontsource(),
            name: 'Lora',
            cssVariable: '--font-lora',
            weights: [400, 500, 600, 700],
        },
    ],

    image: {
        domains: ['cdn.sanity.io'],
    },

    prefetch: {
        prefetchAll: true,
    },

    integrations: [
        icon(),
        sanity({
            projectId: sanityProjectId,
            dataset: sanityDataset,
            useCdn: false,
        }),
        sitemap(),
    ],
});
