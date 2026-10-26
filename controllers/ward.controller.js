import { CreateWardCommitteeService, deletedWardCommitteeService, getWardCommitteeService, updatedWardCommitteeService } from "../services/ward.services.js";
import { catchAsync } from "../utils/errors.js";
import { successResponse } from './../utils/success.js';

export const handleGetWardCommittee = catchAsync(async (req, res) => {
  const result = await getWardCommitteeService(req.query);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Ward committees retrieved successfully",
    data: result,
  });
});
export const handleCreateWardCommittee = catchAsync(async (req, res) => {
  // console.log("from contro", req.body) 
  const result = await CreateWardCommitteeService(req.body);
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "ওয়ার্ড কমিটিতে সফলভাবে অ্যাড করা হয়েছে।",
    data: result,
  });
});
export const handleUpdatedWardCommittee = catchAsync(async (req, res) => {
  const result = await updatedWardCommitteeService({
    ...req.body,
    wdcommitteeId: req.params.wdcommitteeId,
  });
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "ওয়ার্ড কমিটি সফলভাবে আপডেট হয়েছে।",
    data: result,
  });
});
export const handleDeletedWardCommittee = catchAsync(async (req, res) => {
  const result = await deletedWardCommitteeService(req.params.wdcommitteeId);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "ওয়ার্ড কমিটি সফলভাবে ডিলিট হয়েছে।",
    data: result,
  });
});
