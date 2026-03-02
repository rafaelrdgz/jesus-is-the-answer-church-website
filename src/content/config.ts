import { defineCollection, z } from 'astro:content';

const localizedString = (defaultValue: string = '') => z.union([
  z.object({
    es: z.string().default(defaultValue),
    en: z.string().default(defaultValue),
  }),
  z.string().transform(val => ({ es: val, en: val }))
]);

const optionalLocalizedString = () => z.union([
  z.object({
    es: z.string().optional(),
    en: z.string().optional(),
  }),
  z.string().transform(val => ({ es: val, en: val }))
]);

const staffCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: localizedString(),
    title: localizedString(),
    image: z.string().startsWith('/uploads/staff/'),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    bio: optionalLocalizedString(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const eventsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: localizedString(),
    date: z.date(),
    endDate: z.date().optional(),
    time: z.string().optional(),
    location: localizedString(),
    image: z.string().startsWith('/uploads/events/'),
    summary: optionalLocalizedString(),
    tags: z.array(z.string()).optional(),
    registrationLink: z.string().url().optional(),
    registrationRequired: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const sermonsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: localizedString(),
    slug: z.string().optional(),
    date: z.date(),
    speaker: localizedString(),
    series: optionalLocalizedString(),
    scripture: optionalLocalizedString(),
    audioUrl: z.string().url().optional(),
    videoUrl: z.string().url().optional(),
    image: z.string().startsWith('/uploads/sermons/').optional(),
    summary: optionalLocalizedString(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

const ministriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: localizedString(),
    logo: z.string().startsWith('/uploads/ministries/').optional(),
    summary: localizedString(),
    coordinator: optionalLocalizedString(),
    contact: optionalLocalizedString(),
    schedule: optionalLocalizedString(),
    order: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: localizedString(),
    slug: z.string().optional(),
    pubDate: z.date(),
    description: localizedString(),
    author: localizedString('Church Staff'),
    image: z.object({
      url: z.string().startsWith('/uploads/blog/'),
      alt: z.union([
        z.object({
          es: z.string(),
          en: z.string(),
        }),
        z.string().transform(val => ({ es: val, en: val }))
      ])
    }).optional(),
    tags: z.array(z.string()).default(["general"]),
    draft: z.boolean().default(false),
  }),
});

const siteInfoCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: localizedString(),
  }),
});

export const collections = {
  staff: staffCollection,
  events: eventsCollection,
  sermons: sermonsCollection,
  ministries: ministriesCollection,
  blog: blogCollection,
  siteInfo: siteInfoCollection,
};
