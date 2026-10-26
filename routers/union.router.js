import express from "express";

import { upload } from "./../multer/upload.js";
import { handleCreateUnionCommittee, handleDeletedUnionCommittee, handleGetUnionCommittee, handleUpdatedUnionCommittee } from "../controllers/union.controller.js";

const unionRouter = express.Router();

// Get all
unionRouter.route("/").get(handleGetUnionCommittee);
// create
unionRouter.route("/").post(upload.none(), handleCreateUnionCommittee);

// update
unionRouter.route("/:uncommitteeId").put(handleUpdatedUnionCommittee);
//delete
unionRouter.route("/:uncommitteeId").delete(handleDeletedUnionCommittee);

export default unionRouter;
