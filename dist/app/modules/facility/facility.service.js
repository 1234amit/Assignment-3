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
exports.getAllFacilities = exports.deleteFacility = exports.updateFacility = exports.createFacility = void 0;
const facility_model_1 = require("./facility.model");
const createFacility = (facilityData) => __awaiter(void 0, void 0, void 0, function* () {
    const facility = new facility_model_1.Facility(facilityData);
    yield facility.save();
    return facility;
});
exports.createFacility = createFacility;
const updateFacility = (id, facilityData) => __awaiter(void 0, void 0, void 0, function* () {
    const facility = yield facility_model_1.Facility.findByIdAndUpdate(id, facilityData, {
        new: true,
    });
    if (!facility)
        throw new Error("Facility not found");
    return facility;
});
exports.updateFacility = updateFacility;
const deleteFacility = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const facility = yield facility_model_1.Facility.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!facility)
        throw new Error("Facility not found");
    return facility;
});
exports.deleteFacility = deleteFacility;
const getAllFacilities = () => __awaiter(void 0, void 0, void 0, function* () {
    return facility_model_1.Facility.find({ isDeleted: false });
});
exports.getAllFacilities = getAllFacilities;
