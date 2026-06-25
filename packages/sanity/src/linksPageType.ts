import { defineField, defineType } from 'sanity';
import type { SanityDocument } from '@sanity/client';
import type { SanityImageRef } from './siteSettingsType';

export interface ProfileSocial {
    label: string;
    icon: string;
    url: string;
}

export interface ProfileLink {
    label: string;
    url: string;
    icon?: string;
}

export interface FeaturedLink {
    title: string;
    description?: string;
    url: string;
    image: SanityImageRef;
}

export interface LinksPage extends SanityDocument {
    name: string;
    tagline?: string;
    flags?: string[];
    avatar?: SanityImageRef;
    socials?: ProfileSocial[];
    links?: ProfileLink[];
    featured?: FeaturedLink[];
}

const ICON_HELP =
    'Icon name from the icon set (e.g. brands/github, brands/linkedin, brands/x, brands/instagram, brands/youtube, mail, globe).';

export const linksPageType = defineType({
    name: 'linksPage',
    title: 'Links Page',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            description: 'Display name shown under the avatar.',
            type: 'string',
            validation: (rule) => rule.required().max(40),
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            description: 'Short bio shown beneath the name.',
            type: 'text',
            rows: 2,
            validation: (rule) => rule.max(160),
        }),
        defineField({
            name: 'flags',
            title: 'Heritage flags',
            description:
                'Country flags shown next to the name. Use 2-letter ISO codes, lowercase (e.g. cn, pk). Country names are derived automatically.',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (rule) =>
                rule.unique().max(5).custom((codes?: string[]) => {
                    const invalid = (codes ?? []).filter(
                        (code) => !/^[a-z]{2}$/.test(code),
                    );
                    return invalid.length
                        ? `Use 2-letter lowercase ISO codes (invalid: ${invalid.join(', ')})`
                        : true;
                }),
        }),
        defineField({
            name: 'avatar',
            title: 'Avatar',
            description: 'Profile photo. 1:1 square recommended (min 480x480).',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'socials',
            title: 'Social icons',
            description: 'Compact row of icon links shown under the bio.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Label',
                            description:
                                'Accessible label (e.g. GitHub). Not shown visually.',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'icon',
                            title: 'Icon',
                            description: ICON_HELP,
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            validation: (rule) =>
                                rule
                                    .required()
                                    .uri({ scheme: ['http', 'https', 'mailto'] }),
                        }),
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'url' },
                    },
                },
            ],
        }),
        defineField({
            name: 'links',
            title: 'Link buttons',
            description: 'Vertical stack of tappable buttons.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            validation: (rule) => rule.required().max(50),
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            validation: (rule) =>
                                rule
                                    .required()
                                    .uri({ scheme: ['http', 'https', 'mailto'] }),
                        }),
                        defineField({
                            name: 'icon',
                            title: 'Icon',
                            description: `Optional leading icon. ${ICON_HELP}`,
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'url' },
                    },
                },
            ],
        }),
        defineField({
            name: 'featured',
            title: 'Featured cards',
            description: 'Larger highlighted cards with a thumbnail.',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            validation: (rule) => rule.required().max(60),
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 2,
                            validation: (rule) => rule.max(160),
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            validation: (rule) =>
                                rule.required().uri({ scheme: ['http', 'https'] }),
                        }),
                        defineField({
                            name: 'image',
                            title: 'Thumbnail',
                            description: '16:9 landscape recommended.',
                            type: 'image',
                            options: { hotspot: true },
                            validation: (rule) => rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'description',
                            media: 'image',
                        },
                    },
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Links Page' };
        },
    },
});
