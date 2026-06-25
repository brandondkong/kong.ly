import type { ProfileSocial, ProfileLink } from '@kong/sanity';

export const STUDIO_LINK = 'https://kong.ly';
export const GITHUB_LINK = 'https://github.com/brandondkong';
export const LINKEDIN_LINK = 'https://linkedin.com/in/brandondkong';
export const CONTACT_EMAIL = 'kongbrandon0@gmail.com';

export const SITE = {
    name: 'Brandon Kong',
    url: 'https://links.kong.ly',
    title: 'Brandon Kong — Links',
    description:
        'Every link from Brandon Kong in one place — portfolio, writing, projects, and socials.',
    locale: 'en_US',
} as const;

/**
 * Rendered when the Sanity `linksPage` document has not been created or a
 * given block is empty, so the page is always presentable.
 */
export const FALLBACK = {
    name: 'Brandon Kong',
    tagline:
        'Software developer building auth infrastructure and modern web apps.',
    socials: [
        { label: 'GitHub', icon: 'brands/github', url: GITHUB_LINK },
        { label: 'LinkedIn', icon: 'brands/linkedin', url: LINKEDIN_LINK },
        { label: 'Email', icon: 'mail', url: `mailto:${CONTACT_EMAIL}` },
    ] satisfies ProfileSocial[],
    links: [
        { label: 'Portfolio', url: 'https://kong.ly', icon: 'globe' },
        { label: 'Writing', url: 'https://kong.ly/blog', icon: undefined },
        { label: 'Works', url: 'https://kong.ly/works', icon: undefined },
        { label: 'Get in touch', url: 'https://kong.ly/contact', icon: 'mail' },
    ] satisfies ProfileLink[],
} as const;
