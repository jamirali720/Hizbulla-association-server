import express from "express";
import { upload } from "./../multer/upload.js";
import { handleCreateWardCommittee, handleDeletedWardCommittee, handleGetWardCommittee, handleUpdatedWardCommittee } from "../controllers/ward.controller.js";
import { userRoles } from './../utils/helper.js';
import { isAuthenticated } from './../middleware/authentication.js';


const wardRouter = express.Router();

// Get all
wardRouter.route("/").get(handleGetWardCommittee);
// create
wardRouter
  .route("/")
  .post(
    upload.none(),
    isAuthenticated(userRoles.admin),
    handleCreateWardCommittee,
  );

// update
wardRouter
  .route("/:wdcommitteeId")
  .put(isAuthenticated(userRoles.admin), handleUpdatedWardCommittee);
//delete
wardRouter
  .route("/:wdcommitteeId")
  .delete(isAuthenticated(userRoles.admin), handleDeletedWardCommittee);

export default wardRouter;
