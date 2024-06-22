"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Authentication required" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); // Replace 'any' with your decoded token type
        console.log("Decoded token:", decoded); // Add this line for debugging
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Token verification error:", error); // Add this line for debugging
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};
exports.authenticate = authenticate;
// Authorize middleware implementation
const authorize = (role) => {
    return (req, res, next) => {
        const user = req.user;
        if (user && user.role === role) {
            next();
        }
        else {
            res.status(403).json({ success: false, message: "Forbidden" });
        }
    };
};
exports.authorize = authorize;
