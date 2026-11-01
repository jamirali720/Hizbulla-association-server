import express from "express";

import { upload } from "./../multer/upload.js";
import { handleCreateUnionCommittee, handleDeletedUnionCommittee, handleGetUnionCommittee, handleUpdatedUnionCommittee } from "../controllers/union.controller.js";
import { userRoles } from "../utils/helper.js";
import { isAuthenticated } from "../middleware/authentication.js";

const unionRouter = express.Router();

// Get all
unionRouter.route("/").get(handleGetUnionCommittee);
// create
unionRouter
  .route("/")
  .post(
    upload.none(),
    isAuthenticated(userRoles[0]),
    handleCreateUnionCommittee,
  );

// update
unionRouter
  .route("/:uncommitteeId")
  .put(isAuthenticated(userRoles[0]), handleUpdatedUnionCommittee);
//delete
unionRouter
  .route("/:uncommitteeId")
  .delete(isAuthenticated(userRoles[0]), handleDeletedUnionCommittee);

export default unionRouter;
