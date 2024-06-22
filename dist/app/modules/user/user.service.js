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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("./user.model");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
    const user = new user_model_1.User(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
    yield user.save();
    return user;
});
exports.createUser = createUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    if (!user)
        throw new Error("Invalid email or password");
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid email or password");
    // const token = jwt.sign({ userId: user._id, role: user.role }, "secret", {
    //   expiresIn: "30d",
    // });
    // Use process.env.JWT_SECRET
    const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    return { user, token };
});
exports.loginUser = loginUser;
