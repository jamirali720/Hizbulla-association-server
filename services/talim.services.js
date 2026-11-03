import { Talim } from './../model/talim.model.js';

// get ward committees
export const getTalimsService = async () => {
  return await Talim.find()    
};

// create new ward committee
export const CreateTalimService = async (payload) => {
  return await Talim.create(payload);
};

// update ward by ID
export const updatedTalimService = async (payload) => {
  const id = payload.talimId;
  console.log(id);
  const updates = {};
  Object.keys(payload).forEach((key) => {
    if (
      payload[key] !== undefined &&
      payload[key] !== null &&
      payload[key] !== ""
    ) {
      updates[key] = payload[key];
    }
  });
  const data = await Talim.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  });
  return data;
};

// delete ward by ID
export const deletedTalimService = async (id) => {
  console.log(id);
  return await Talim.findByIdAndDelete(id);
};
