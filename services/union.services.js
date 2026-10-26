import AppError from "../utils/errors.js";
import Union from "./../model/union.model.js";


export const getUnionCommitteeService = async (query) => {

  const { union } = query;
  const filterUnion =
    union === "" ? {} : { unionName: { $regex: union, $options: "i" } };
  


  return await Union.find(filterUnion).populate("user").sort({sorting: 1});
};

export const CreateUnionCommitteeService = async (payload) => {
  const committees = await Union.find().populate("user");
  const filteredCommittees = committees.filter(item => item.unionId === payload.unionId);
  payload.sorting = filteredCommittees.length + 1;
  committees.map((committee) => {
    if (
      committee.user._id.toString() === payload.user.toString() &&
      committee.unionId === payload.unionId
    ) {
      throw new AppError(
        400,
        `এই ${committee.user.fullname} - ${committee.position} পদে ${committee.committeeName}তে যুক্ত আছেন। ${payload.position} পদে যুক্ত হতে পারেন না`,
      );
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
