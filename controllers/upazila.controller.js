
import { CreateUpazilaCommitteeService, deletedUpazilaCommitteeService, getUpazilaCommitteeService, updatedUpazilaCommitteeService } from "../services/upazila.services.js";
import { catchAsync } from "../utils/errors.js";
import { successResponse } from './../utils/success.js';

export const handleGetUpazilaCommittee = catchAsync(async (req, res) => {
  const result = await getUpazilaCommitteeService();
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Upazila committees retrieved successfully",
    data: result,
  });
});
export const handleCreateUpazilaCommittee = catchAsync(async (req, res) => {
  // console.log("from contro", req.body)
  const result = await CreateUpazilaCommitteeService(req.body);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Upazila committee created successfully",
    data: result,
  });
});
export const handleUpdatedUpazilaCommittee = catchAsync(async (req, res) => {
  const result = await updatedUpazilaCommitteeService({...req.body, upcommitteeId: req.params.upcommitteeId});
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Upazila committee updated successfully",
    data: result,
  });
});
export const handleDeletedUpazilaCommittee = catchAsync(async (req, res) => {
  const result = await deletedUpazilaCommitteeService(req.params.upcommitteeId);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Upazila committee deleted successfully",
    data: result,
  });
});
