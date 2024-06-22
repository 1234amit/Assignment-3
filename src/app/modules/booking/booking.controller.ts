import { Request, Response } from "express";
import {
  createBooking,
  updateBooking,
  cancelBooking,
  checkAvailability,
} from "./booking.service";
import { bookingSchema } from "./booking.validator";

// Define an interface extending Request to include user property
interface AuthenticatedRequest extends Request {
  user: { id: string }; // Define the structure of your user object here
}

// Check availability of time slots
export const getAvailability = async (req: Request, res: Response) => {
  try {
    const date =
      req.query.date?.toString() || new Date().toISOString().split("T")[0];
    const availableSlots = await checkAvailability(date);
    res.status(200).json({
      success: true,
      message: "Availability checked successfully",
      data: availableSlots,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Create a new booking
export const createBookingController = async (req: Request, res: Response) => {
  try {
    const validationResult = bookingSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errorMessages: validationResult.error.errors,
      });
    }
    const booking = await createBooking(req.body);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

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

export const updateBookingController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookingData = req.body;
    const userId = (req as AuthenticatedRequest).user?.id; // Assuming user object has an id property
    const booking = await updateBooking(id, bookingData, userId);
    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

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

export const cancelBookingController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as AuthenticatedRequest).user?.id; // Assuming user object has an id property
    const booking = await cancelBooking(id, userId);
    res.status(200).json({
      success: true,
      message: "Booking canceled successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
