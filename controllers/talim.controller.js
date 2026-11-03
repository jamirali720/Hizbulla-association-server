import {
  CreateTalimService,
  deletedTalimService,
  getTalimsService,
} from "../services/talim.services.js";
import { catchAsync } from "../utils/errors.js";
import { successResponse } from "./../utils/success.js";

export const handleGetTalims = catchAsync(async (req, res) => {
  const result = await getTalimsService();
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "All talims has been retrieved successfully",
    data: result,
  });
});
export const handleCreateTalim = catchAsync(async (req, res) => {
  const userId = req.userId;
  const result = await CreateTalimService({ ...req.body, user: userId });
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "নতুন তালিম সফলভাবে তৈরী করা হয়েছে",
    data: result,
  });
});

export const handleDeletedTalim = catchAsync(async (req, res) => {
  const result = await deletedTalimService(req.params.talimId);
  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "তালিম সফলভাবে ডিলিট হয়েছে।",
    data: result,
  });
});
