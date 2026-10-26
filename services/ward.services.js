import WardCommittee from "../model/wardCommittee.model.js";
import AppError from "../utils/errors.js";

// get ward committees
export const getWardCommitteeService = async (query) => {
console.log(query)
  const { ward } = query;
  const filterWard =
    ward === "" ? {} : { wardName: { $regex: ward, $options: "i" } };

  return await WardCommittee.find(filterWard)
    .populate("user")
    .sort({ sorting: 1 });
};

// create new ward committee
export const CreateWardCommitteeService = async (payload) => {
  const committees = await WardCommittee.find().populate("user");
  console.log("from service", payload);

  const filteredCommittees = committees.filter(
    (item) => item.wardId === payload.wardId,
  );
  payload.sorting = filteredCommittees.length + 1;

  committees.map((committee) => {
    if (
      committee.user._id.toString() === payload.user.toString() &&
      committee.unionId === payload.unionId &&
      committee.wardId.toString() === payload.wardId.toString() &&
      committee.position === payload.position
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

  const result = await WardCommittee.create(payload);

  return result;
};


// update ward by ID
export const updatedWardCommitteeService = async (payload) => {
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
  const data = await Ward.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  });
  return data;
};

// delete ward by ID
export const deletedWardCommitteeService = async (id) => {
  return await Ward.findByIdAndDelete(id);
};
