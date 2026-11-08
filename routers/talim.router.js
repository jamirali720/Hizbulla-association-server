import express from "express";
import { upload } from "./../multer/upload.js";
import { userRoles } from "./../utils/helper.js";
import { isAuthenticated } from "./../middleware/authentication.js";
import {
  handleAutoDeletedTalim,
  handleCreateTalim,
  handleDeletedTalim,
  handleGetTalims,
} from "../controllers/talim.controller.js";

const talimRouter = express.Router();

// Get all
talimRouter.route("/").get(handleGetTalims);
// create
talimRouter
  .route("/")
  .post(upload.none(), isAuthenticated(userRoles.admin), handleCreateTalim);

//delete
talimRouter
  .route("/:talimId")
  .delete(isAuthenticated(userRoles.admin), handleDeletedTalim);

  // ‍automatically delete talim
talimRouter
  .route("/auto-delete/:talimId")
  .delete(handleAutoDeletedTalim);

export default talimRouter;
