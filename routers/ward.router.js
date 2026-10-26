import express from "express";
import { upload } from "./../multer/upload.js";
import { handleCreateWardCommittee, handleDeletedWardCommittee, handleGetWardCommittee, handleUpdatedWardCommittee } from "../controllers/ward.controller.js";


const wardRouter = express.Router();

// Get all
wardRouter.route("/").get(handleGetWardCommittee);
// create
wardRouter.route("/").post(upload.none(), handleCreateWardCommittee);

// update
wardRouter.route("/:wdcommitteeId").put(handleUpdatedWardCommittee);
//delete
wardRouter.route("/:wdcommitteeId").delete(handleDeletedWardCommittee);

export default wardRouter;
