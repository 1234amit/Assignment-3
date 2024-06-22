import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRoutes from "./app/modules/user/userRoutes";
import facilityRoutes from "./app/modules/facility/facilityRoutes";
import bookingRoutes from "./app/modules/booking/bookingRoutes";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();

const corsConfig = {
  origin: "*", // Allow requests from all origins, you can specify specific origins if needed
  credentials: true, // Allow credentials like cookies, authorization headers, etc.
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specified HTTP methods
};

app.use(express.json());
app.use(cors(corsConfig));

// Preflight request handling for CORS
app.options("*", cors(corsConfig));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log("Headers:", req.headers);
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/facility", facilityRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Sports Facility Booking Platform server.");
});

export default app;
