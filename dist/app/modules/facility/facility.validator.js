"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilitySchema = void 0;
const zod_1 = require("zod");
exports.facilitySchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(50),
    description: zod_1.z.string().min(10).max(500),
    pricePerHour: zod_1.z.number().min(0),
    location: zod_1.z.string().min(5),
});
