import { Talim } from "./../model/talim.model.js";

// get ward committees
export const getTalimsService = async () => {
  return await Talim.find().sort({ date: 1 });
};

// create new ward committee
export const CreateTalimService = async (payload) => {
  return await Talim.create(payload);
};

// delete ward by ID
export const deletedTalimService = async (id) => {
  return await Talim.findByIdAndDelete(id);
};
// delete ward by ID automatically
export const deletedTalimAutoService = async (id) => {
  return await Talim.findByIdAndDelete(id);
};
