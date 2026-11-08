import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../multer/upload.js";
import httpStatus from "http-status";
// import  catchAsync  from "../utils/errors.js";
import { User } from "../model/user.model.js";
import { catchAsync } from "../utils/errors.js";
import { authServices } from "../services/user.services.js";
import { successResponse } from "../utils/success.js";
import { generateUserId } from "../utils/helper.js";
import configs from "../configs/index.js";

const handleSignUpUser = catchAsync(async (req, res, next) => {
  const lastUserId = await generateUserId();
  const result = await authServices.signupUserService({
    ...req.body,
    userId: lastUserId,
  });

  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "You have registered successfully",
    data: result,
  });
});

const handleLoginUser = catchAsync(async (req, res) => { 
  const result = await authServices.loginUserService(req.body);
  const { user, accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days;
    httpOnly: true,
    secure: configs.NODE_ENV === "production",
    // sameSite: "none",
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 201,
    message: "You have logged in successfully",
    token: accessToken,
    data: user,
  });
});

const handleGetUserProfile = catchAsync(async (req, res) => {
  const result = await authServices.getUsersProfileService(req.params.userId);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your profile retrieved successfully",
    data: result,
  });
});
const handleGetAllUsers = catchAsync(async (req, res) => {    
  const result = await authServices.getAllUsersService(req.query);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "users  retrieved successfully",
    data: result,
  });
});
const handleGetUsers = catchAsync(async (req, res) => {    
  const result = await authServices.getUsersService();
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "users  retrieved successfully",
    data: result,
  });
});
const handleUpdateUserProfile = catchAsync(async (req, res) => {
  // const id = req.user.userId;
  const userId = req.params.userId;
  const updateData = req.body;

  const result = await authServices.updateUsersProfileService(userId, updateData);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your profile updated successfully",
    data: result,
  });
});
const handleUpdateUserInfo = catchAsync(async (req, res) => {
  // const id = req.user.userId;
  const userId = req.params.userId;
  const updateData = req.body;

  const result = await authServices.updateUserInfoService(userId, updateData);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your information updated successfully",
    data: result,
  });
});

// update user status
const handleUpdateUserRole = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const role = req.body;
  const result = await authServices.updateUserRoleService(id, role);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "User role updated successfully",
    data: result,
  });
});
// delete user from database;
const handleDeleteUserFromDB = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const result = await authServices.deleteUserFromDBService(id);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "User deleted successfully",
    data: result,
  });
});

const handleChangUserPassword = catchAsync(async (req, res) => {
  const id = req.user.userId;
  const result = await authServices.changePasswordService(id, { ...req.body });

  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your password changed successfully",
    data: result,
  });
});

export {
  handleSignUpUser,
  handleLoginUser,
  handleGetUserProfile,
  handleUpdateUserInfo,
  handleGetAllUsers,
  handleGetUsers,
  handleUpdateUserProfile, 
  handleChangUserPassword,
  handleUpdateUserRole,
  handleDeleteUserFromDB,
};
