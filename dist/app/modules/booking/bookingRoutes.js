"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const auth_1 = require("./../middlewares/auth");
const router = (0, express_1.Router)();
router.get("/check-availability", auth_1.authenticate, booking_controller_1.getAvailability);
router.post("/", auth_1.authenticate, booking_controller_1.createBookingController);
router.put("/:id", auth_1.authenticate, booking_controller_1.updateBookingController);
router.delete("/:id", auth_1.authenticate, booking_controller_1.cancelBookingController);
exports.default = router;
