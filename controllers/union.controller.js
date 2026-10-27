import {
  CreateUnionCommitteeService,
  deletedUnionCommitteeService,
  getUnionCommitteeService,
  updatedUnionCommitteeService,
} from "../services/union.services.js";
import { catchAsync } from "../utils/errors.js";
import { successResponse } from "./../utils/success.js";

export const handleGetUnionCommittee = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await getUnionCommitteeService(query);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Union committees retrieved successfully",
    data: result,
  });
});

export const handleCreateUnionCommittee = catchAsync(async (req, res) => {
 
  const result = await CreateUnionCommitteeService(req.body);
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Union committee created successfully",
    data: result,
  });
});

export const handleUpdatedUnionCommittee = catchAsync(async (req, res) => {
  const result = await updatedUnionCommitteeService({
    ...req.body,
    uncommitteeId: req.params.uncommitteeId,
  });
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Union committee updated successfully",
    data: result,
  });
});

export const handleDeletedUnionCommittee = catchAsync(async (req, res) => {
  const result = await deletedUnionCommitteeService(req.params.uncommitteeId);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Union committee deleted successfully",
    data: result,
  });
});
