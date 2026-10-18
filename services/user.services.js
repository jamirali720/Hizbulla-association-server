import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { User } from "../model/user.model";
import { AppError } from "../utils/errors";
import { createAccessToken } from "../utils/helper";

const signupUserService = async (payload) => {
  const user = await User.findOne({ phone: payload.phone });

  if (user) {
    throw new ErrorHandler(httpStatus.CONFLICT, "User Already exist");
  }

  let result = await User.create(payload);

  return result;
};

const loginUserService = async (payload) => {
  const { phone, password } = payload;
  const user = await User.findOne({ phone });
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User dose not exist with email"
    );
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.CONFLICT, "Password not matched");
  }

  const accessToken = createAccessToken(
    user,
    configs.jwtAccessTokenSecretKey ,
    configs.jwtAccessTokenExpiration 
  );

  return {
    user,
    accessToken,    
  };
};



const getUsersProfileService = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No Data Found");
  }
  return user;
};
const getAllUsersService = async () => {
  const users = await User.find();
  if (!users) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No users Found");
  }
  return users;
};

// update user profile
const updateUsersProfileService = async (id,payload) => {
  const updates= {};
  const allowedUpdatesFields = ["name", "phone", "email", "address"];

  if (payload && typeof payload === "object") {
    for (const key in payload) {
      if (allowedUpdatesFields.includes(key)) {
        updates[key] = payload[key];
      }
    }
  }

  const result = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to update ");
  }

  return result;
};

// Update users profile image
const updateUserProfileImage = async ( id, payload ) => {
  const result = await User.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true, runValidators: true }
  );
  if (!result) {
    throw new ErrorHandler(
      httpStatus.BAD_REQUEST,
      "Failed to update user profile image"
    );
  }
  return result;
};

// change user password
const changePasswordService = async ( id, payload) => {
  console.log(payload);
  const user = await User.findById(id);
  if (!user) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "User dose not exist");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.currentPassword,
    user.password
  );
  if (!isPasswordMatched) {
    throw new ErrorHandler(httpStatus.CONFLICT, "Current password not matched");
  }
  if (payload.newPassword !== payload.confirmPassword) {
    throw new ErrorHandler(httpStatus.CONFLICT, "Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(configs.saltRound)
  );
  const result = await User.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    { new: true, runValidators: true }
  );
  if (!result) {
    throw new ErrorHandler(httpStatus.BAD_REQUEST, "Failed to change password");
  }

  return result;
};

// update user status
const updateUserRoleService = async (id, payload) => {  
  const user = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new ErrorHandler(
      httpStatus.NOT_FOUND,
      "Failed to update user status"
    );
  }
  return user;
};

// delete user
const deleteUserFromDBService = async (id) => {
  console.log(id)
  return await User.findByIdAndDelete(id);
};


export const authServices = {
  signupUserService,
  loginUserService,
  getUsersProfileService,
  getAllUsersService,
  updateUsersProfileService,
  updateUserProfileImage,
  changePasswordService,
  updateUserRoleService,
  deleteUserFromDBService,  
};