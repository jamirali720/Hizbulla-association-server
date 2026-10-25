import {
  createCommitteService,
  deleteCommitteeService,
  getAllCommitteesService,
  getSingleCommitteeService,
  updatedCommitteeService,
} from "../services/committee.service.js";
import { catchAsync } from "../utils/errors.js";
import { successResponse } from "../utils/success.js";

export const handleCreateCommittee = catchAsync(async (req, res) => {
  const result = await createCommitteService({ ...req.body });

  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Committe has been created successfully",
    data: result,
  });
});


export const handleGetCommittees = catchAsync(async (req, res) => {
  const result = await getAllCommitteesService();

  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Committes has been retrived successfully",
    data: result,
  });
});
export const handleGetSingleCommittee = catchAsync(async (req, res) => {
  const result = await getSingleCommitteeService(req.params.committeeId);

  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Committes has been retrived successfully",
    data: result,
  });
});
export const handleUpdatedCommittee = catchAsync(async (req, res) => {
  const result = await updatedCommitteeService({
    ...req.body,
    committeeId: req.params.committeeId,
  });

  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Committes has been updated successfully",
    data: result,
  });
});


// delete user from database;
export const handleDeleteCommittee = catchAsync(async (req, res) => {
  const id = req.params.committeeId;
  const result = await deleteCommitteeService(id);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "This committee member has been deleted successfully",
    data: result,
  });
});