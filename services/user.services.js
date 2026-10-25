import bcrypt from "bcryptjs";
import httpStatus, { status } from "http-status";
import { User } from "../model/user.model.js";
import AppError from "../utils/errors.js";
import { createAccessToken } from "../utils/helper.js";

const signupUserService = async (payload) => {
  const user = await User.findOne({ phone: payload.phone });

  if (user) {
    // Caught correctly by your global handler if passed via next(error)
    throw new AppError(
      httpStatus.CONFLICT,
      "এই মোবাইল নাম্বার দিয়ে রেজিষ্ট্রেশন করা আছে",
    );
  }

  let result = await User.create(payload);
  return result;
};

const loginUserService = async (payload) => {
  const { phone, password } = payload;
  const user = await User.findOne({ phone });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User dose not exist with email");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.CONFLICT, "Password not matched");
  }

  const accessToken = createAccessToken(
    user,
    configs.jwtAccessTokenSecretKey,
    configs.jwtAccessTokenExpiration,
  );

  return {
    user,
    accessToken,
  };
};

const getUsersProfileService = async (id) => {
  console.log("from service ", id);
  const user = await User.findById(id);
  if (!user) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "User Not Found");
  }
  return user;
};

const getAllUsersService = async (payload) => {
  const { search, union, ward, village, pirvaiMuhibbin } = payload;
  const searchRegExp = new RegExp(".*" + search + ".*", "i");

  const filterUnion =
    union === "All" ? {} : { union: { $regex: union, $options: "i" } };
  console.log("check query", union);
  const filterWard =
    ward === "All" ? {} : { ward: { $regex: ward, $options: "i" } };
  const filterVillage =
    village === "All" ? {} : { village: { $regex: village, $options: "i" } };
  const filterpirvaiMuhibbin =
    (pirvaiMuhibbin === "All" || pirvaiMuhibbin === "")
      ? {}
      : { position: { $regex: pirvaiMuhibbin, $options: "i" } };

  const filter = {
    $or: [
      { fullname: { $regex: searchRegExp } },
      { phone: { $regex: searchRegExp } },
    ],
    $and: [filterUnion, filterWard, filterVillage, filterpirvaiMuhibbin],
  };
  const users = await User.find(filter);

  if (!users) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No users Found");
  }
  return users;
};

const getUsersService = async () => {
  const users = await User.find();
  return users;
};

// update user profile
const updateUsersProfileService = async (id, payload) => {
  const updates = {};
  const allowedUpdatesFields = [
    "fullname",
    "phone",
    "district",
    "upazila",
    "union",
    "ward",
    "village",
    "committeePost",
    "status",
  ];

  // if (payload && typeof payload === "object") {
  //   for (const key in payload) {
  //     if (allowedUpdatesFields.includes(key)) {
  //       updates[key] = payload[key];
  //     }
  //   }
  // }

  Object.keys(payload).forEach((key) => {
    if (
      payload[key] !== undefined &&
      payload[key] !== null &&
      payload[key] !== ""
    ) {
      updates[key] = payload[key];
    }
  });

  const result = await User.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to update ");
  }

  return result;
};

// Update users profile image
const updateUserProfileImage = async (id, payload) => {
  const result = await User.findByIdAndUpdate(
    id,
    { ...payload },
    { returnDocument: "after", runValidators: true },
  );
  if (!result) {
    throw new ErrorHandler(
      httpStatus.BAD_REQUEST,
      "Failed to update user profile image",
    );
  }
  return result;
};

// change user password
const changePasswordService = async (id, payload) => {
  console.log(payload);
  const user = await User.findById(id);
  if (!user) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "User dose not exist");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.currentPassword,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new ErrorHandler(httpStatus.CONFLICT, "Current password not matched");
  }
  if (payload.newPassword !== payload.confirmPassword) {
    throw new ErrorHandler(httpStatus.CONFLICT, "Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(configs.saltRound),
  );
  const result = await User.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    { returnDocument: "after", runValidators: true },
  );
  if (!result) {
    throw new ErrorHandler(httpStatus.BAD_REQUEST, "Failed to change password");
  }

  return result;
};

// update user status
const updateUserRoleService = async (id, payload) => {
  const user = await User.findByIdAndUpdate(id, payload, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!user) {
    throw new ErrorHandler(
      httpStatus.NOT_FOUND,
      "Failed to update user status",
    );
  }
  return user;
};

// delete user
const deleteUserFromDBService = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const authServices = {
  signupUserService,
  loginUserService,
  getUsersProfileService,
  getAllUsersService,
  getUsersService,
  updateUsersProfileService,
  updateUserProfileImage,
  changePasswordService,
  updateUserRoleService,
  deleteUserFromDBService,
};
