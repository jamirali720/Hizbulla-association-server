import Upazila from "../model/upazila.model.js";
import AppError from "../utils/errors.js";
import { uniquePosts } from "../utils/helper.js";

export const getUpazilaCommitteeService = async () => {
  const data = await Upazila.find().populate("user").sort({ sorting: 1 });
  return data;
};
export const CreateUpazilaCommitteeService = async (payload) => {
  const committees = await Upazila.find().populate("user");

  payload.sorting = committees.length + 1;

  committees.map((committee) => {
    if (committee.user._id.toString() === payload.user.toString()) {
      throw new AppError(
        400,
        `এই ${committee.user.name} - ${committee.position} পদে ${committee.committee}তে যুক্ত আছেন। ${payload.position} পদে যুক্ত হতে পারেন না`,
      );
    }
    
    if (uniquePosts.includes(payload.position)) {
      const existingPosition = committee.position.includes(payload.position);

      if (existingPosition) {
        throw new AppError(
          400,
          `${committee.user.name} - ${payload.position} পদে ইতিমধ্যে নিয়োজিত আছেন। ডাবল এন্ট্রি সম্ভব নয়।`,
        );
      }
    }
  });

  const result = await Upazila.create(payload);

  return result;
};

export const updatedUpazilaCommitteeService = async (payload) => {
  const id = payload.upcommitteeId;
  console.log(payload);
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
  const data = await Upazila.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  });
  return data;
};
export const deletedUpazilaCommitteeService = async (id) => {
  return await Upazila.findByIdAndDelete(id);
};
