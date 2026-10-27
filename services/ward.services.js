import WardCommittee from "../model/wardCommittee.model.js";
import AppError from "../utils/errors.js";
import { committeePosts } from "../utils/helper.js";

// get ward committees
export const getWardCommitteeService = async (query) => {
  const { ward } = query;
  console.log(ward);
  const filterWard =
    ward === "" ? {} : { wardName: { $regex: `${ward}`, $options: "i" } };

  return await WardCommittee.find(filterWard)
    .populate("user")
    .sort({ sorting: 1 });
};

// create new ward committee
export const CreateWardCommitteeService = async (payload) => {
  const committees = await WardCommittee.find().populate("user");

  const filteredCommittees = committees.filter(
    (item) => item.wardId === payload.wardId,
  );
  payload.sorting = filteredCommittees.length + 1;

  committees.map((committee) => {
    const isSameUser =
      committee.user?._id?.toString() === payload.user?.toString() ||
      committee.user?.toString() === payload.user?.toString(); // fallback if not populated

    if (
      isSameUser &&
      committee.unionId?.toString() === payload.unionId?.toString() && // safe string comparison for all IDs
      committee.wardId?.toString() === payload.wardId?.toString() &&
      committee.position === payload.position
    ) {
      throw new AppError(
        400,
        `এই ${committee.user?.fullname || "ব্যবহারকারী"} - ${committee.position} পদে ${committee.committeeName}তে যুক্ত আছেন। ${payload.position} পদে যুক্ত হতে পারবেন না`,
      );
    } else if (
      committee.unionId?.toString() === payload.unionId?.toString() && // safe string comparison for all IDs
      committee.wardId?.toString() === payload.wardId?.toString() &&
      committee.position === payload.position
    ) {
      throw new AppError(
        400,
        `এই ${committee.user?.fullname || "ব্যবহারকারী"} - ${committee.position} পদে ${committee.committeeName}তে যুক্ত আছেন। ${payload.position} পদে যুক্ত হতে পারবেন না`,
      );
    } else if (
      isSameUser &&
      committee.unionId?.toString() === payload.unionId?.toString() && // safe string comparison for all IDs
      committee.wardId?.toString() === payload.wardId?.toString() &&
      committeePosts.includes(payload.position)
    ) {
      throw new AppError(
        400,
        ` ${committee.user?.fullname} ইতিমধ্যে ${committee.committeeName}তে ${committee.position} পদে যুক্ত আছেন। 
        ${payload.position} পদে আর ‍যুক্ত হতে পারবেন না ।`,
      );
    }
  });

  return await WardCommittee.create(payload);
};

// update ward by ID
export const updatedWardCommitteeService = async (payload) => {
  const id = payload.wdcommitteeId;
  console.log(id)
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
  const data = await WardCommittee.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  });
  return data;
};

// delete ward by ID
export const deletedWardCommitteeService = async (id) => {
  console.log(id)
  return await WardCommittee.findByIdAndDelete(id);
};
