import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking {
  date: string;
  startTime: string;
  endTime: string;
  user: mongoose.Schema.Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount: number;
  isBooked: "confirmed" | "unconfirmed" | "canceled";
}
