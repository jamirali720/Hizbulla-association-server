import AppError from "../utils/errors.js";
import httpStatus from "http-status";
import  jwt  from 'jsonwebtoken';

const verifyToken = (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      error.message || "Invalid token or expired, please login and try again",
    );
  }
};
export default verifyToken;
