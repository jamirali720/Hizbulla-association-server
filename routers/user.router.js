import { Router } from "express";

import { upload } from "../multer/upload.js";

import {
  handleSignUpUser,
  handleLoginUser,
  handleGetUserProfile,
  handleGetAllUsers,
  handleUpdateUserProfile,
  handleChangUserPassword,
  handleUpdateUserRole,
  handleDeleteUserFromDB,
  handleGetUsers,
  handleUpdateUserInfo,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/authentication.js";
import { userRoles } from "../utils/helper.js";

const userRouter = Router();

userRouter.route("/signup").post(
  // upload.single("image"),
  upload.none(),
  handleSignUpUser,
);

userRouter.route("/login").post(upload.none(), handleLoginUser);

userRouter.route("/profile/:userId").get(handleGetUserProfile);

userRouter
  .route("/update-profile/:userId")
  .put(
    isAuthenticated(userRoles.admin, userRoles.user),
    handleUpdateUserProfile,
  );
userRouter
  .route("/update-user-info/:userId")
  .put(
    isAuthenticated(userRoles.admin, userRoles.user),
    handleUpdateUserInfo,
  );

userRouter.route("/change-password").put(
  // isAuthenticated(roles.admin, roles.user),
  handleChangUserPassword,
);
userRouter.route("/all-users").get(handleGetAllUsers);
userRouter.route("/users").get(handleGetUsers);

userRouter
  .route("/update-role/:userId")
  .put(isAuthenticated(userRoles.admin), handleUpdateUserRole);

userRouter
  .route("/delete-user/:userId")
  .delete(isAuthenticated(userRoles.admin), handleDeleteUserFromDB);

export default userRouter;
