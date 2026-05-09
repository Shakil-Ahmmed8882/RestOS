import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  address: z.string().min(5, "Please enter your delivery address."),
  city: z.string().min(2, "Please enter your city."),
  notes: z.string().optional(),
  paymentMethod: z.enum(["card", "cash"]),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
