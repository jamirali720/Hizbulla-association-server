import express from "express";
import { upload } from "./../multer/upload.js";
import { userRoles } from './../utils/helper.js';
import { isAuthenticated } from './../middleware/authentication.js';
import { handleCreateTalim, handleDeletedTalim, handleGetTalims, handleUpdatedTalim } from "../controllers/talim.controller.js";


const talimRouter = express.Router();

// Get all
talimRouter.route("/").get(handleGetTalims);
// create
talimRouter
  .route("/")
  .post(
    upload.none(),
    isAuthenticated(userRoles.admin),
    handleCreateTalim,
  );

// update
talimRouter
  .route("/:talimId")
  .put(isAuthenticated(userRoles.admin), handleUpdatedTalim);
//delete
talimRouter
  .route("/:talimId")
  .delete(isAuthenticated(userRoles.admin), handleDeletedTalim);

export default talimRouter;
