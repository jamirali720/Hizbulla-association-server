import { ObjectId } from "mongodb";
import CommitteeUser from "./../model/committee.model.js";
import AppError from "../utils/errors.js";
import { committeePosts } from "../utils/helper.js";
// import {ObjectId} from 'mongodb'
export const createCommitteService = async (payload) => {
  const { user, designation, committeeLevel, upazila, union, ward } = payload;

  
  const committees = await CommitteeUser.find().populate(
    "user",
    "fullname phone status",
  );

  committees.map((committee) => {
    if (
      committee.designation === designation &&
      committee.committeeLevel === committeeLevel
    ) {
      throw new AppError(
        400,
        `এই ${committee.user.status} ${committee.designation} পদে ${committee.committeeLevel} লেভেলে আগেই কমিটিতে যুক্ত আছেন`,
      );
    } else if (
      committee.user._id.toString() === user.toString() &&
      // committee.committeeLevel === committeeLevel &&
      committee.union === union &&
      committee.ward === ward &&
      committeePosts.includes(designation)
    ) {
      throw new AppError(
        400,
        `এই পীরভাই ইতিমধ্যে ${committee.designation} পদে ${committee.committeeLevel} কমিটিতে যুক্ত আছেন`,
      );
    }
  });

  const result = await CommitteeUser.create(payload);

  return result;
};

export const getAllCommitteesService = async () => {
  const result = await CommitteeUser.find().populate(
    "user",
    "fullname village phone",
  );

  return result;
};

export const getSingleCommitteeService = async (id) => {
  const result = await CommitteeUser.findOne({
    user: new ObjectId(id),
  }).populate("user", "fullname  phone");

  return result;
};
export const updatedCommitteeService = async (payload) => {
  const updates = {};
  const { committeeId } = payload;
  Object.keys(payload).forEach((key) => {
    if (
      payload[key] !== undefined &&
      payload[key] !== null &&
      payload[key] !== ""
    ) {
      updates[key] = payload[key];
    }
  });

  const result = await CommitteeUser.findByIdAndUpdate(committeeId, updates, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to update committee ");
  }

  return result;
};

// delete user
export const deleteCommitteeService = async (id) => {
  return await CommitteeUser.findByIdAndDelete(id);
};
