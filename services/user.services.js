import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import httpStatus, { status } from "http-status";
import { User } from "../model/user.model.js";
import AppError from "../utils/errors.js";
import { createAccessToken, createRefreshToken } from "../utils/helper.js";
import configs from "../configs/index.js";
import Upazila from "./../model/upazila.model.js";
import Union from "./../model/union.model.js";
import Ward from "./../model/wardCommittee.model.js";

const signupUserService = async (payload) => {
  const user = await User.findOne({ phone: payload.phone });

  if (user) {
    throw new AppError(
      httpStatus.CONFLICT,
      "এই মোবাইল নাম্বার দিয়ে রেজিষ্ট্রেশন করা আছে",
    );
  }

  payload.password = payload.phone;

  let result = await User.create(payload);
  return result;
};

const loginUserService = async (payload) => {
  const { phone, password } = payload;
  const user = await User.findOne({ phone });

  if (!user) {
    return {
      user: null,
      message: "User does not exist with given phone",
      accessToken: null,
      refreshToken: null,
    };
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
  const refreshToken = createRefreshToken(
    user,
    configs.jwtRefreshTokenSecreteKey,
    configs.jwtRefreshTokenExpiration,
  );

    return { user, accessToken, refreshToken };
};

const getUsersProfileService = async (id) => {
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
    pirvaiMuhibbin === "All" || pirvaiMuhibbin === ""
      ? {}
      : { position: { $regex: pirvaiMuhibbin, $options: "i" } };

  const filter = {
    $or: [
      { name: { $regex: searchRegExp } },
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
  return await User.find();
};

// update user profile
const updateUsersProfileService = async (id, payload) => {
  const updates = {};
  // const allowedUpdatesFields = [
  //   "name",
  //   "phone",
  //   "district",
  //   "upazila",
  //   "union",
  //   "ward",
  //   "village",
  //   "committeePost",
  //   "status",
  // ];

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
const updateUserInfoService = async (id, payload) => {
  const updates = {};
  const { phone } = payload;

  if (phone) {
    const hashedPassword = await bcrypt.hash(phone, Number(configs.saltRound));

    updates.password = hashedPassword;
  }

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

// update user role
const updateUserRoleService = async (id, payload) => {
  const user = await User.findByIdAndUpdate(id, payload, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!user) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to update user role");
  }
  return user;
};

// delete user
const deleteUserFromDBService = async (id) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await Upazila.findOneAndDelete({ user: id }, { session });
    await Union.findOneAndDelete({ user: id }, { session });
    await Ward.findOneAndDelete({ user: id }, { session });
    const userResult = await User.findByIdAndDelete(id, { session });

    await session.commitTransaction();
    await session.endSession();
    return userResult;
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const authServices = {
  signupUserService,
  loginUserService,
  getUsersProfileService,
  getAllUsersService,
  getUsersService,
  updateUsersProfileService,
  updateUserInfoService,
  updateUserProfileImage,
  changePasswordService,
  updateUserRoleService,
  deleteUserFromDBService,
};
