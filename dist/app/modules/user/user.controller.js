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
exports.login = exports.signup = void 0;
const user_service_1 = require("./user.service");
const user_validator_1 = require("./user.validator");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationResult = user_validator_1.userSignupSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errorMessages: validationResult.error.errors,
            });
        }
        const user = yield (0, user_service_1.createUser)(req.body);
        res.status(201).json({ success: true, data: user });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationResult = user_validator_1.userLoginSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errorMessages: validationResult.error.errors,
            });
        }
        const { email, password } = req.body;
        const { user, token } = yield (0, user_service_1.loginUser)(email, password);
        res.status(200).json({ success: true, data: { user, token } });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
    }
});
exports.login = login;
