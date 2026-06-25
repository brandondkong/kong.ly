/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare global {
    interface Window {
        __updateCursorSize?: (text: string) => void;
    }
}

export {};
