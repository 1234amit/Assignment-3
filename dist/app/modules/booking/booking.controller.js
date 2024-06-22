"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBookingController = exports.updateBookingController = exports.createBookingController = exports.getAvailability = void 0;
const booking_service_1 = require("./booking.service");
const booking_validator_1 = require("./booking.validator");
// Check availability of time slots
const getAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const date = ((_a = req.query.date) === null || _a === void 0 ? void 0 : _a.toString()) || new Date().toISOString().split("T")[0];
        const availableSlots = yield (0, booking_service_1.checkAvailability)(date);
        res.status(200).json({
            success: true,
            message: "Availability checked successfully",
            data: availableSlots,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getAvailability = getAvailability;
// Create a new booking
const createBookingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationResult = booking_validator_1.bookingSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errorMessages: validationResult.error.errors,
            });
        }
        const booking = yield (0, booking_service_1.createBooking)(req.body);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.createBookingController = createBookingController;
// Update an existing booking
// export const updateBookingController = async (
//   req: AuthenticatedRequest,
//   res: Response
// ) => {
//   try {
//     const { id } = req.params;
//     const bookingData = req.body;
//     const userId = req.user.id; // Accessing user id from req.user object
//     const booking = await updateBooking(id, bookingData, userId);
//     res.status(200).json({
//       success: true,
//       message: "Booking updated successfully",
//       data: booking,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: (error as Error).message });
//   }
// };
const updateBookingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const bookingData = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Assuming user object has an id property
        const booking = yield (0, booking_service_1.updateBooking)(id, bookingData, userId);
        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: booking,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.updateBookingController = updateBookingController;
// Cancel an existing booking
// export const cancelBookingController = async (
//   req: AuthenticatedRequest,
//   res: Response
// ) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id; // Accessing user id from req.user object
//     const booking = await cancelBooking(id, userId);
//     res.status(200).json({
//       success: true,
//       message: "Booking canceled successfully",
//       data: booking,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: (error as Error).message });
//   }
// };
const cancelBookingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Assuming user object has an id property
        const booking = yield (0, booking_service_1.cancelBooking)(id, userId);
        res.status(200).json({
            success: true,
            message: "Booking canceled successfully",
            data: booking,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.cancelBookingController = cancelBookingController;
