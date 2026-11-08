import AppError from "../utils/errors.js";
import { uniquePosts } from "../utils/helper.js";
import Union from "./../model/union.model.js";

export const getUnionCommitteeService = async (query) => {
  const { union } = query;

  const filterUnion =
    union === "" ? {} : { unionId: { $regex: `${union}`, $options: "i" } };

  return await Union.find(filterUnion).populate("user").sort({ sorting: 1 });
};

export const CreateUnionCommitteeService = async (payload) => {
  const committees = await Union.find().populate("user");
  const filteredCommittees = committees.filter(
    (item) => item.unionId === payload.unionId,
  );

  payload.sorting = filteredCommittees.length + 1;

  committees.map((committee) => {
    if (
      committee.user._id.toString() === payload.user.toString() &&
      committee.unionId === payload.unionId
    ) {
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

  return await Union.create(payload);
};

export const updatedUnionCommitteeService = async (payload) => {
  const id = payload.uncommitteeId;
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
  const data = await Union.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  });
  return data;
};
export const deletedUnionCommitteeService = async (id) => {
  return await Union.findByIdAndDelete(id);
};
