import { Types } from "mongoose";

export interface IBooking {
  date: Date;
  startTime: Date;
  endTime: Date;
  user: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount: number;
  isBooked: "confirmed" | "unconfirmed" | "canceled";
}
