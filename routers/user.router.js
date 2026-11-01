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
import { isAuthenticated } from "../middleware/authentication.js";
import { userRoles } from "../utils/helper.js";

const userRouter = Router();

userRouter.route("/signup").post(
  // upload.single("image"),
  handleSignUpUser,
);

userRouter.route("/login").post(upload.none(), handleLoginUser);

userRouter.route("/profile/:userId").get(handleGetUserProfile);

userRouter
  .route("/update-profile/:userId")
  .put(isAuthenticated(userRoles[0], userRoles[1]), handleUpdateUserProfile);

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
userRouter.route("/users").get( handleGetUsers);

userRouter
  .route("/update-role/:userId")
  .put(isAuthenticated(userRoles[0]), handleUpdateUserRole);

userRouter
  .route("/delete-user/:userId")
  .delete(isAuthenticated(userRoles[0]), handleDeleteUserFromDB);

export default userRouter;
