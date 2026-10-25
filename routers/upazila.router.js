import express from "express";
import {
  handleCreateUpazilaCommittee,
  handleDeletedUpazilaCommittee,
  handleGetUpazilaCommittee,
  handleUpdatedUpazilaCommittee,
} from "../controllers/upazila.controller.js";
import { upload } from "./../multer/upload.js";

const upazilaRouter = express.Router();

// Get all
upazilaRouter.route("/").get(handleGetUpazilaCommittee);
// create
upazilaRouter.route("/").post( upload.none(),handleCreateUpazilaCommittee);

// update
upazilaRouter.route("/:committeeId").put(handleUpdatedUpazilaCommittee);
//delete
upazilaRouter.route("/:committeeId").delete(handleDeletedUpazilaCommittee);

export default upazilaRouter;
