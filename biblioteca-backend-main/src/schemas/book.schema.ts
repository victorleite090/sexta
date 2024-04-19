import { z } from "zod";

export const BookSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullish(),
  publishingCompany: z.string(),
  shelf: z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
    code: z.string().optional(),
  }),
  created_at: z.date(),
  updated_at: z.date(),
});

export type BookType = z.infer<typeof BookSchema>;

export const BookArraySchema = z.array(BookSchema);

export const BookInputSchema = BookSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type BookInputType = z.infer<typeof BookInputSchema>;

export const BookInputFilterSchema = BookSchema.omit({
  id: true,
  description: true,
  shelf: true,
  created_at: true,
  updated_at: true,
});

export type BookInputFilterType = z.infer<typeof BookInputFilterSchema>;
