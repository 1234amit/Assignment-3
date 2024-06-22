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
exports.getAll = exports.remove = exports.update = exports.create = void 0;
const facility_service_1 = require("./facility.service");
const facility_validator_1 = require("./facility.validator");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationResult = facility_validator_1.facilitySchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errorMessages: validationResult.error.errors,
            });
        }
        const facility = yield (0, facility_service_1.createFacility)(req.body);
        res.status(201).json({ success: true, data: facility });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationResult = facility_validator_1.facilitySchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errorMessages: validationResult.error.errors,
            });
        }
        const facility = yield (0, facility_service_1.updateFacility)(req.params.id, req.body);
        res.status(200).json({ success: true, data: facility });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const facility = yield (0, facility_service_1.deleteFacility)(req.params.id);
        res.status(200).json({ success: true, data: facility });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
    }
});
exports.remove = remove;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const facilities = yield (0, facility_service_1.getAllFacilities)();
        res.status(200).json({ success: true, data: facilities });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
    }
});
exports.getAll = getAll;
