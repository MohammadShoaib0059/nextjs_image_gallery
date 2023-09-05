import { z } from "zod";

const BasicImageSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  prev_page: z.string().optional(),
  next_page: z.string().optional(),
  total_results: z.number(),
});

const PhotoSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  photographer: z.string(),
  src: z.object({
    large: z.string(),
    medium: z.string(),
  }),
  alt: z.string(),
});

export const ImageSchemaWithPhotos = BasicImageSchema.extend({
  photos: z.array(PhotoSchema),
});

export type Photo = z.infer<typeof PhotoSchema>;
export type ImageResults = z.infer<typeof ImageSchemaWithPhotos>;
