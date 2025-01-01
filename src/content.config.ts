import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({ 
    loader: glob({ pattern: "**/*.md", base: "./src/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        tags: z.array(z.string())
    })
 });

export const collections = { blog };