import { z } from 'zod';


export const ContentAddSchema = z.object({
    type:z.string(),
    link:z.string(),
    title:z.string(),
    tags:z.array(z.string()).optional(),
})

export const UpdateContentSchema = z.object({
    type:z.string().optional(),
    link:z.string().optional(),
    title:z.string().optional(),
    tags:z.array(z.string()).optional(),
})