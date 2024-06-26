"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const facility_controller_1 = require("./facility.controller");
const router = (0, express_1.Router)();
router.post("/", auth_1.authenticate, (0, auth_1.authorize)("admin"), facility_controller_1.create);
router.put("/:id", auth_1.authenticate, (0, auth_1.authorize)("admin"), facility_controller_1.update);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)("admin"), facility_controller_1.remove);
// router.get("/", authenticate, authorize("admin"), getAll);
router.get("/", facility_controller_1.getAll);
exports.default = router;
