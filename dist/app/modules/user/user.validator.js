"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userSignupSchema = void 0;
const zod_1 = require("zod");
exports.userSignupSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(30),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    phone: zod_1.z.string().regex(/^[0-9]+$/),
    role: zod_1.z.enum(["admin", "user"]),
    address: zod_1.z.string().min(10),
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
