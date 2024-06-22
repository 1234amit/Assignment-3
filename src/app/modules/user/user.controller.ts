import { Request, Response } from "express";
import { createUser, loginUser } from "./user.service";
import { userSignupSchema, userLoginSchema } from "./user.validator";

export const signup = async (req: Request, res: Response) => {
  try {
    const validationResult = userSignupSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errorMessages: validationResult.error.errors,
      });
    }

    const user = await createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validationResult = userLoginSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errorMessages: validationResult.error.errors,
      });
    }

    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ success: true, data: { user, token } });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};
