import { z } from "zod";

export const userSignupSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().regex(/^[0-9]+$/),
  role: z.enum(["admin", "user"]),
  address: z.string().min(10),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
