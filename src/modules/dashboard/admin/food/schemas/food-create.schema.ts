import { z } from "zod";

export const foodCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  isAvailable: z.boolean().default(true),
});

export type FoodCreateInput = z.infer<typeof foodCreateSchema>;
