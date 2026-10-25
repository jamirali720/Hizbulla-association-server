import { Router } from "express";

import { upload } from "../multer/upload.js";

import {
  handleSignUpUser,
  handleLoginUser,
  handleGetUserProfile,
  handleGetAllUsers,
  handleUpdateUserProfile,
  handleUpdateUserProfileImage,
  handleChangUserPassword,
  handleUpdateUserRole,
  handleDeleteUserFromDB,
  handleGetUsers,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/signup").post(
  // upload.single("image"),
  handleSignUpUser,
);

userRouter.route("/login").post(upload.none(), handleLoginUser);

userRouter.route("/profile/:userId").get(handleGetUserProfile);

userRouter.route("/update-profile/:userId").put(handleUpdateUserProfile);

userRouter.route("/update-profile-image").put(
  upload.single("image"),
  // isAuthenticated(roles.admin, roles.user),
  handleUpdateUserProfileImage,
);
userRouter.route("/change-password").put(
  // isAuthenticated(roles.admin, roles.user),
  handleChangUserPassword,
);
userRouter.route("/all-users").get(handleGetAllUsers);
userRouter.route("/users").get(handleGetUsers);

userRouter.route("/update-role/:userId").put(handleUpdateUserRole);

userRouter.route("/delete-user/:userId").delete(handleDeleteUserFromDB);

export default userRouter;
