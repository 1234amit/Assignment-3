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
exports.checkAvailability = exports.cancelBooking = exports.updateBooking = exports.createBooking = void 0;
const mongoose_1 = require("mongoose");
const booking_model_1 = require("./booking.model");
const createBooking = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        const existingBookings = yield booking_model_1.Booking.find({
            facility: bookingData.facility,
            date: bookingData.date,
            startTime: bookingData.startTime,
            endTime: bookingData.endTime,
        }).session(session);
        if (existingBookings.length > 0)
            throw new Error("Time slot already booked");
        const booking = new booking_model_1.Booking(bookingData);
        yield booking.save({ session });
        yield session.commitTransaction();
        session.endSession();
        return booking;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.createBooking = createBooking;
const updateBooking = (id, bookingData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findById(id);
    if (!booking)
        throw new Error("Booking not found");
    if (booking.user.toString() !== userId)
        throw new Error("Unauthorized");
    Object.assign(booking, bookingData);
    yield booking.save();
    return booking;
});
exports.updateBooking = updateBooking;
const cancelBooking = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findById(id);
    if (!booking)
        throw new Error("Booking not found");
    if (booking.user.toString() !== userId)
        throw new Error("Unauthorized");
    booking.isBooked = "canceled";
    yield booking.save();
    return booking;
});
exports.cancelBooking = cancelBooking;
// Check availability of time slots for a given date
const checkAvailability = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.Booking.find({ date });
    const totalSlots = generateTimeSlots("08:00", "20:00"); // Assuming facilities are available from 8 AM to 8 PM
    const availableSlots = totalSlots.filter((slot) => {
        return !bookings.some((booking) => {
            const bookingStartTime = new Date(`1970-01-01T${booking.startTime}:00Z`);
            const bookingEndTime = new Date(`1970-01-01T${booking.endTime}:00Z`);
            const slotStartTime = new Date(`1970-01-01T${slot.startTime}:00Z`);
            const slotEndTime = new Date(`1970-01-01T${slot.endTime}:00Z`);
            return ((slotStartTime >= bookingStartTime && slotStartTime < bookingEndTime) ||
                (slotEndTime > bookingStartTime && slotEndTime <= bookingEndTime));
        });
    });
    return availableSlots;
});
exports.checkAvailability = checkAvailability;
// Helper function to calculate payable amount
const calculatePayableAmount = (startTime, endTime, pricePerHour) => {
    const start = new Date(`1970-01-01T${startTime}:00Z`).getTime();
    const end = new Date(`1970-01-01T${endTime}:00Z`).getTime();
    const durationHours = (end - start) / (1000 * 60 * 60);
    return durationHours * pricePerHour;
};
// Helper function to generate time slots
const generateTimeSlots = (start, end, interval = 60) => {
    const slots = [];
    const startTime = new Date(`1970-01-01T${start}:00Z`).getTime();
    const endTime = new Date(`1970-01-01T${end}:00Z`).getTime();
    for (let time = startTime; time < endTime; time += interval * 60 * 1000) {
        const startTimeString = new Date(time).toISOString().substr(11, 5);
        const endTimeString = new Date(time + interval * 60 * 1000)
            .toISOString()
            .substr(11, 5);
        slots.push({ startTime: startTimeString, endTime: endTimeString });
    }
    return slots;
};
