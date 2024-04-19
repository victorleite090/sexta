import { z } from "zod";

export const ShelfSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  code: z.string().trim().min(1).max(2).toUpperCase(),
  library: z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
  }),
  created_at: z.date(),
  updated_at: z.date(),
});

export type ShelfType = z.infer<typeof ShelfSchema>;

export const ShelfArraySchema = z.array(ShelfSchema);

export const ShelfInputSchema = ShelfSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type ShelfInputType = z.infer<typeof ShelfInputSchema>;

export const ShelfInputFilterSchema = ShelfSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type ShelfInputFilterType = z.infer<typeof ShelfInputFilterSchema>;
