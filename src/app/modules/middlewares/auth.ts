import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request interface to include user property
export interface AuthenticatedRequest extends Request {
  user?: any; // Define the structure of your user object here
}

// export const authenticate = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Authentication required" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any; // Replace 'any' with your decoded token type
//     (req as AuthenticatedRequest).user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any; // Replace 'any' with your decoded token type
    console.log("Decoded token:", decoded); // Add this line for debugging
    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Add this line for debugging
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Authorize middleware implementation
export const authorize = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthenticatedRequest).user;
    if (user && user.role === role) {
      next();
    } else {
      res.status(403).json({ success: false, message: "Forbidden" });
    }
  };
};
