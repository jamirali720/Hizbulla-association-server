import { Router } from "express";
import { userController } from "./user.controllers";
import { isAuthenticated } from "../middleware/authentication";
import { upload } from "../multer/upload";




const userRouter = Router();

userRouter
  .route("/signup")
  .post(
    upload.single("image"),   
    userController.handleSignUpUser,
  );

userRouter
  .route("/login")
  .post(
    upload.none(), 
    userController.handleLoginUser,
  );

userRouter.route("/refresh-token").get(userController.handleRefreshToken);




userRouter
  .route("/profile")
  .get(
    // isAuthenticated(roles.admin, roles.user),
    userController.handleGetUserProfile,
  );

userRouter
  .route("/update-profile")
  .put(
    // isAuthenticated(roles.admin, roles.user),
    
    userController.handleUpdateUserProfile,
  );

userRouter
  .route("/update-profile-image")
  .put(
    upload.single("image"),
    isAuthenticated(roles.admin, roles.user),
    userController.handleUpdateUserProfileImage,
  );
userRouter
  .route("/change-password")
  .put(
    // isAuthenticated(roles.admin, roles.user),
    userController.handleChangUserPassword,
  );
userRouter
  .route("/all-users")
  .get( userController.handleGetAllUsers);
userRouter
  .route("/update-role/:userId")
  .put( userController.handleUpdateUserRole);

userRouter
  .route("/delete-user-from-db/:userId")
  .delete( userController.handleDeleteUserFromDB);



module.exports = userRouter;
