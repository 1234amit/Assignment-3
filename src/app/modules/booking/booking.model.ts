import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    facility: { type: Schema.Types.ObjectId, ref: "Facility", required: true },
    payableAmount: { type: Number, required: true },
    isBooked: {
      type: String,
      enum: ["confirmed", "unconfirmed", "canceled"],
      default: "unconfirmed",
    },
  },
  { timestamps: true }
);

export const Booking = model<IBooking>("Booking", bookingSchema);
