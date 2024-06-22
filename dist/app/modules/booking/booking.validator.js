"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSchema = void 0;
const zod_1 = require("zod");
// Define time regex for HH:MM format validation
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
exports.bookingSchema = zod_1.z
    .object({
    facility: zod_1.z.string(),
    date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    startTime: zod_1.z.string().regex(timeRegex, "Invalid start time format"),
    endTime: zod_1.z.string().regex(timeRegex, "Invalid end time format"),
})
    .refine((data) => {
    const startTime = new Date(`1970-01-01T${data.startTime}:00Z`);
    const end = new Date(`1970-01-01T${data.endTime}:00Z`);
    return end > startTime;
}, {
    message: "endTime must be greater than startTime",
    path: ["endTime"], // specify the path of the error
});
