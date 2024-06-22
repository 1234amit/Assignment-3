import { IFacility } from "./facility.interface";
import { Facility } from "./facility.model";

export const createFacility = async (facilityData: IFacility) => {
  const facility = new Facility(facilityData);
  await facility.save();
  return facility;
};

export const updateFacility = async (
  id: string,
  facilityData: Partial<IFacility>
) => {
  const facility = await Facility.findByIdAndUpdate(id, facilityData, {
    new: true,
  });
  if (!facility) throw new Error("Facility not found");
  return facility;
};

export const deleteFacility = async (id: string) => {
  const facility = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!facility) throw new Error("Facility not found");
  return facility;
};

export const getAllFacilities = async () => {
  return Facility.find({ isDeleted: false });
};
