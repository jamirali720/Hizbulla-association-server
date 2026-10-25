// const upazila = await UpazilaCommittee.create({
//   upazilaId: "barura",
//   upazilaName: "Barura",
//   committeeName: "Barura Upazila Committee",
//   members: [
//     {
//       name: "Rahim Uddin",                                // upazila inserting data example
//       position: "President",
//     },
//     {
//       name: "Karim Ahmed",
//       position: "General Secretary",
//     },
//   ],
//   createdBy: userId,
// });

import Upazila from "../model/upazila.model.js";
import AppError from "../utils/errors.js";
import httpStatus from "http-status";
import { User } from "./../model/user.model.js";
import { committeePosts } from "../../client/src/utils/helper.js";

export const getUpazilaCommitteeService = async () => {
  const data = await Upazila.find().populate("user");
  return data;
};
export const CreateUpazilaCommitteeService = async (payload) => {
  const committees = await Upazila.find().populate("user");
console.log( "from service", payload)

  committees.map((committee) => {    
    if (committee.user._id.toString() === payload.user.toString()) {
      throw new AppError(
          400,
          `এই ${committee.user.fullname} - ${committee.position} পদে ${committee.committeeName}তে যুক্ত আছেন। ${payload.position} পদে যুক্ত হতে পারেন না`,)
    }
      if (
        committee.committeeName === payload.committeeName &&
        committee.position.includes(payload.position)
      ) {
        throw new AppError(
          400,
          ` ${payload.position} পদ ${committee.committeeName}তে শূন্য নয়!, অন্য কোন পদে যুক্ত করুন`,
        );
      } 
  });

  const result = await Upazila.create(payload);

  return result;

  
};

export const updatedUpazilaCommitteeService = async (payload) => {
  const id = req.params.committeeId;
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
