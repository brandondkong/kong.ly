/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare global {
    interface ImportMetaEnv {
        readonly UMAMI_WEBSITE_ID?: string;
        readonly UMAMI_SRC?: string;
    }

    interface Window {
        __updateCursorSize?: (text: string) => void;
    }
}

export {};
