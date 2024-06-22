"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./app/modules/user/userRoutes"));
const facilityRoutes_1 = __importDefault(require("./app/modules/facility/facilityRoutes"));
const bookingRoutes_1 = __importDefault(require("./app/modules/booking/bookingRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsConfig = {
    origin: "*", // Allow requests from all origins, you can specify specific origins if needed
    credentials: true, // Allow credentials like cookies, authorization headers, etc.
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specified HTTP methods
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsConfig));
// Preflight request handling for CORS
app.options("*", (0, cors_1.default)(corsConfig));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log("Headers:", req.headers);
    next();
});
app.use("/api/users", userRoutes_1.default);
app.use("/api/facility", facilityRoutes_1.default);
app.use("/api/bookings", bookingRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Sports Facility Booking Platform server.");
});
exports.default = app;
