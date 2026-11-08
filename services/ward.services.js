import Ward from "../model/wardCommittee.model.js";
import AppError from "../utils/errors.js";
import { committeePosts, uniquePosts } from "../utils/helper.js";

// get ward committees
export const getWardCommitteeService = async (query) => {
  console.log(query)
  const {union, ward } = query;
  const filterWard =
    ward === "" ? {} : { wardId: { $regex: `${ward}`, $options: "i" } };
  const filterUnion =
    union === "" ? {} : { unionId: { $regex: `${union}`, $options: "i" } };

  return await Ward.find({$and:[filterUnion, filterWard]}).populate("user").sort({ sorting: 1 });
};

// create new ward committee
export const CreateWardCommitteeService = async (payload) => {
  const committees = await Ward.find().populate("user");

  const filteredCommittees = committees.filter(
    (item) => item.wardId === payload.wardId,
  );
  payload.sorting = filteredCommittees.length + 1;

  committees.map((committee) => {
    const isSameUser =
      committee.user?._id?.toString() === payload.user?.toString() ||
      committee.user?.toString() === payload.user?.toString();

    if (
      isSameUser &&
      committee.unionId === payload.unionId &&
      committee.wardId?.toString() === payload.wardId?.toString()
    ) {
      throw new AppError(
        400,
        `এই ${committee.user.name} - ${committee.position} পদে ${committee.committee}তে যুক্ত আছেন। ${payload.position} পদে যুক্ত হতে পারেন না`,
      );
    }

    if (
      committee.unionId?.toString() === payload.unionId?.toString() &&
      committee.wardId?.toString() === payload.wardId?.toString() &&
      uniquePosts.includes(payload.position)
    ) {
      const existingPosition = committee.position.includes(payload.position);

      if (existingPosition) {
        throw new AppError(
          400,
          `${committee.user.name} - ${payload.position} পদে ইতিমধ্যে নিয়োজিত আছেন। ডাবল এন্ট্রি সম্ভব নয়।`,
        );
      }
    }
  });

  return await Ward.create(payload);
};

// update ward by ID
export const updatedWardCommitteeService = async (payload) => {
  const id = payload.wdcommitteeId;
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
  const data = await Ward.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  });
  return data;
};

// delete ward by ID
export const deletedWardCommitteeService = async (id) => {
  console.log(id);
  return await Ward.findByIdAndDelete(id);
};
