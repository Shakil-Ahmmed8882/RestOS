import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contactNumber: z.string().optional().default(""),
  location: z.string().optional().default(""),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
