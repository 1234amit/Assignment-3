import { z } from "zod";

// Define time regex for HH:MM format validation
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const bookingSchema = z
  .object({
    facility: z.string(),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    startTime: z.string().regex(timeRegex, "Invalid start time format"),
    endTime: z.string().regex(timeRegex, "Invalid end time format"),
  })
  .refine(
    (data) => {
      const startTime = new Date(`1970-01-01T${data.startTime}:00Z`);
      const end = new Date(`1970-01-01T${data.endTime}:00Z`);
      return end > startTime;
    },
    {
      message: "endTime must be greater than startTime",
      path: ["endTime"], // specify the path of the error
    }
  );
