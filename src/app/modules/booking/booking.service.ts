import { IBooking } from "./booking.interface";
import { startSession } from "mongoose";
import { Booking } from "./booking.model";

export const createBooking = async (bookingData: IBooking) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const existingBookings = await Booking.find({
      facility: bookingData.facility,
      date: bookingData.date,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime,
    }).session(session);

    if (existingBookings.length > 0)
      throw new Error("Time slot already booked");

    const booking = new Booking(bookingData);
    await booking.save({ session });
    await session.commitTransaction();
    session.endSession();

    return booking;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const updateBooking = async (
  id: string,
  bookingData: Partial<IBooking>,
  userId: string
) => {
  const booking = await Booking.findById(id);
  if (!booking) throw new Error("Booking not found");
  if (booking.user.toString() !== userId) throw new Error("Unauthorized");

  Object.assign(booking, bookingData);
  await booking.save();
  return booking;
};

export const cancelBooking = async (id: string, userId: string) => {
  const booking = await Booking.findById(id);
  if (!booking) throw new Error("Booking not found");
  if (booking.user.toString() !== userId) throw new Error("Unauthorized");

  booking.isBooked = "canceled";
  await booking.save();
  return booking;
};

// Check availability of time slots for a given date
export const checkAvailability = async (date: string) => {
  const bookings = await Booking.find({ date });
  const totalSlots = generateTimeSlots("08:00", "20:00"); // Assuming facilities are available from 8 AM to 8 PM

  const availableSlots = totalSlots.filter((slot) => {
    return !bookings.some((booking) => {
      const bookingStartTime = new Date(`1970-01-01T${booking.startTime}:00Z`);
      const bookingEndTime = new Date(`1970-01-01T${booking.endTime}:00Z`);
      const slotStartTime = new Date(`1970-01-01T${slot.startTime}:00Z`);
      const slotEndTime = new Date(`1970-01-01T${slot.endTime}:00Z`);

      return (
        (slotStartTime >= bookingStartTime && slotStartTime < bookingEndTime) ||
        (slotEndTime > bookingStartTime && slotEndTime <= bookingEndTime)
      );
    });
  });

  return availableSlots;
};

// Helper function to calculate payable amount
const calculatePayableAmount = (
  startTime: string,
  endTime: string,
  pricePerHour: number
) => {
  const start = new Date(`1970-01-01T${startTime}:00Z`).getTime();
  const end = new Date(`1970-01-01T${endTime}:00Z`).getTime();
  const durationHours = (end - start) / (1000 * 60 * 60);
  return durationHours * pricePerHour;
};

// Helper function to generate time slots
const generateTimeSlots = (start: string, end: string, interval = 60) => {
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
