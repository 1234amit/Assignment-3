import { Request, Response } from "express";
import {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacilities,
} from "./facility.service";
import { facilitySchema } from "./facility.validator";

export const create = async (req: Request, res: Response) => {
  try {
    const validationResult = facilitySchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errorMessages: validationResult.error.errors,
      });
    }

    const facility = await createFacility(req.body);
    res.status(201).json({ success: true, data: facility });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const validationResult = facilitySchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errorMessages: validationResult.error.errors,
      });
    }

    const facility = await updateFacility(req.params.id, req.body);
    res.status(200).json({ success: true, data: facility });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const facility = await deleteFacility(req.params.id);
    res.status(200).json({ success: true, data: facility });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const facilities = await getAllFacilities();
    res.status(200).json({ success: true, data: facilities });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};
