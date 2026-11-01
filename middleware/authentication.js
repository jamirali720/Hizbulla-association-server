import configs from "../configs/index.js";
import { User } from "../model/user.model.js";
import AppError, { catchAsync } from "../utils/errors.js";
import verifyToken from "./verifyToken.js";
import httpStatus from "http-status";

export const isAuthenticated = (...roles) => {
  return catchAsync(async (req, res, next) => {
    const token =
      req.headers?.authorization?.split("Bearer ")[1] ||
      req.rawHeaders[1].split("Bearer ")[1];

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are un-authenticated. Please Login first",
      );
    }

    const decoded = verifyToken(token, configs.jwtAccessTokenSecretKey);

    if (!decoded) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized or your token has been expired. Please Login first ",
      );
    }

    const { userId, role } = decoded;

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if (roles && !roles.includes(role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You have no access to this route",
      );
    }

    req.userId = userId;
    next();
  });
};
