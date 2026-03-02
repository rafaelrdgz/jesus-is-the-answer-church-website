import { defineCollection, z } from 'astro:content';

// Helper: converts empty strings from Decap CMS to undefined so
// that Zod's .optional() treats them as missing values.
const emptyToUndefined = (val: unknown) =>
  typeof val === 'string' && val.trim() === '' ? undefined : val;

// Optional string that gracefully handles empty strings from the CMS
const optionalString = () =>
  z.preprocess(emptyToUndefined, z.string().optional());

// Optional URL that handles empty strings from the CMS
const optionalUrl = () =>
  z.preprocess(emptyToUndefined, z.string().url().optional());

// Optional email that handles empty strings from the CMS
const optionalEmail = () =>
  z.preprocess(emptyToUndefined, z.string().email().optional());

// Optional image path (no strict prefix validation — the CMS widget
// already controls the upload folder via its `folder` property)
const optionalImage = () =>
  z.preprocess(emptyToUndefined, z.string().optional());

// Required image path (allows any non-empty path)
const requiredImage = () => z.string().min(1);

const staffCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    image: z.preprocess(emptyToUndefined, requiredImage().optional()),
    email: optionalEmail(),
    phone: optionalString(),
    bio: optionalString(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const eventsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    endDate: z.date().optional(),
    time: optionalString(),
    location: z.string(),
    image: z.preprocess(emptyToUndefined, requiredImage().optional()),
    summary: optionalString(),
    tags: z.array(z.string()).optional(),
    registrationLink: optionalUrl(),
    registrationRequired: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const sermonsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: optionalString(),
    date: z.date(),
    speaker: z.string(),
    series: optionalString(),
    scripture: optionalString(),
    audioUrl: optionalUrl(),
    videoUrl: optionalUrl(),
    image: optionalImage(),
    summary: optionalString(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

const ministriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    logo: optionalImage(),
    summary: z.string(),
    coordinator: optionalString(),
    contact: optionalString(),
    schedule: optionalString(),
    order: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: optionalString(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string().default('Church Staff'),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }).optional(),
    tags: z.array(z.string()).default(["general"]),
    draft: z.boolean().default(false),
  }),
});

const siteInfoCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
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
