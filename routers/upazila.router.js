import express from "express";
import {
  handleCreateUpazilaCommittee,
  handleDeletedUpazilaCommittee,
  handleGetUpazilaCommittee,
  handleUpdatedUpazilaCommittee,
} from "../controllers/upazila.controller.js";
import { upload } from "./../multer/upload.js";
import { isAuthenticated } from './../middleware/authentication.js';
import { userRoles } from "../utils/helper.js";

const upazilaRouter = express.Router();

// Get all
upazilaRouter.route("/").get(handleGetUpazilaCommittee);
// create
upazilaRouter
  .route("/")
  .post(
    upload.none(),
    isAuthenticated(userRoles[0]),
    handleCreateUpazilaCommittee,
  );

// update
upazilaRouter
  .route("/:upcommitteeId")
  .put(isAuthenticated(userRoles[0]), handleUpdatedUpazilaCommittee);
//delete
upazilaRouter
  .route("/:upcommitteeId")
  .delete(isAuthenticated(userRoles[0]), handleDeletedUpazilaCommittee);

export default upazilaRouter;
