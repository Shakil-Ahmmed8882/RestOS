import { z } from "zod";

export const foodCreateSchema = z.object({
  foodName: z.string().min(2, "Food name must be at least 2 characters"),
  foodCategory: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  quantity: z.string().min(1, "Quantity is required"),
  made_by: z.string().min(1, "Chef/Cook name is required"),
  food_origin: z.string().min(1, "Food origin is required"),
  description: z.string().optional(),
});

export type FoodCreateInput = z.infer<typeof foodCreateSchema>;
