import { z } from "zod";

// Zod schema for the form
const foodSchema = z.object({
  foodName: z.string().min(1, { message: "Food name is required" }),
  status: z.string().min(1, { message: "Status name is required" }),
  description: z.string().min(1, { message: "Food description is required" }),
  foodCategory: z.string().min(1, { message: "Food category is required" }),
  price: z.string().min(1,({ message: "Price must be positive" })),
  quantity: z.string().min(1, { message: "Quantity must be greater than 0" }),
  made_by: z.string().min(1, { message: "Chef's name is required" }),
  food_origin: z.string().min(1, { message: "Food origin is required" }),
});

export { foodSchema };
