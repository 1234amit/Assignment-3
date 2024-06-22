"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post("/auth/signup", user_controller_1.signup);
router.post("/auth/login", user_controller_1.login);
exports.default = router;
