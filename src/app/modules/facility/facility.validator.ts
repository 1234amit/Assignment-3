import { z } from "zod";

export const facilitySchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(500),
  pricePerHour: z.number().min(0),
  location: z.string().min(5),
});
