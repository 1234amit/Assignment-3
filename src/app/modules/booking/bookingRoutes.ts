import { Router, RequestHandler } from "express";
import {
  createBookingController,
  getAvailability,
  updateBookingController,
  cancelBookingController,
} from "./booking.controller";
import { authenticate, AuthenticatedRequest } from "./../middlewares/auth";

const router = Router();

router.get("/check-availability", authenticate, getAvailability);
router.post("/", authenticate, createBookingController);
router.put("/:id", authenticate, updateBookingController);
router.delete("/:id", authenticate, cancelBookingController);
export default router;
