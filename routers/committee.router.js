import { Router } from "express";
import {
  handleCreateCommittee,
  handleGetCommittees,
  handleGetSingleCommittee,
  handleDeleteCommittee,
  handleUpdatedCommittee,
} from "../controllers/committee.controller.js";
const committeRouter = Router();



committeRouter.route("/create-committee").post(handleCreateCommittee);
committeRouter.route("/all-committees").get(handleGetCommittees);
committeRouter.route("/single/:committeeId").get(handleGetSingleCommittee);
committeRouter.route("/delete/:committeeId").delete(handleDeleteCommittee);
committeRouter.route("/update-committee/:committeeId").delete(handleUpdatedCommittee);


export default committeRouter;