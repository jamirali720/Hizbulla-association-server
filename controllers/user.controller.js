
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "../multer/upload";
import httpStatus from "http-status";
import { uploadImageToCloudinary } from "../multer/upload";
import { catchAsync } from "../utils/errors";
import { User } from "../model/user.model";






export const handleSignUpUser = catchAsync(async (req, res) => {
  const resp = (await uploadImageToCloudinary(
    req.file.path,
    req.file.filename
  )) 

  const result = await authServices.signupauthServices({
    ...req.body,
    image: { url: resp.secure_url, public_id: resp.public_id },
  });

  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

export const handleLoginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginauthServices(req.body);
  const {user, accessToken, refreshToken} = result;
  

  res.cookie("refreshToken", refreshToken, {
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days;
    httpOnly: true,
    secure: configs.NODE_ENV === "production",
    // sameSite: "none",
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 201,
    message: "User logged in successfully",
    token: accessToken,
    data: user,
  });
});





const handleGetUserProfile = catchAsync(async(req, res) => {   
    const id = req.user.userId; 
    const result = await authServices.getUsersProfileService(id);   
    successResponse(res, {
        success:true, 
        statusCode: 200, 
        message: "Your profile retrieved successfully",
        data: result
    })
})
const handleGetAllUsers = catchAsync(async(req, res) => {     
    const result = await authServices.getAllUsersService();   
    successResponse(res, {
        success:true, 
        statusCode: 200, 
        message: "users  retrieved successfully",
        data: result
    })
})
const handleUpdateUserProfile = catchAsync(async(req, res) => {    
    const id = req.user.userId;
    const updateData = req.body;

    const result = await authServices.updateUsersProfileService(id, updateData);
    successResponse(res, {
        success:true, 
        statusCode: 200, 
        message: "Your profile updated successfully",
        data: result
    })
})

// update user status  
const handleUpdateUserRole = catchAsync(async(req, res) => {    
    const id = req.params.userId; 
    const role = req.body;
    const result = await authServices.updateUserRoleService(id, role);
    successResponse(res, {
        success:true, 
        statusCode: 200, 
        message: "User role updated successfully",
        data: result
    })
})
// delete user from database;
const handleDeleteUserFromDB = catchAsync(async(req, res) => {    
    const id = req.params.userId;   

    const result = await authServices.deleteUserFromDBService(id);
    successResponse(res, {
        success:true, 
        statusCode: 200, 
        message: "User deleted successfully",
        data: result
    })
})

// update user profile image 
const handleUpdateUserProfileImage = catchAsync(async (req, res) => {
  const id = req.user.userId;
  const user = await User.findById(id);
  if (!user) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "User not found with this ID");
  }

 await deleteImageFromCloudinary(user.image.public_id);
  
  
   const resp = (await uploadImageToCloudinary(
     req.file.path,
     req.file.filename
   )) 

  const result = await authServices.updateUserProfileImage(id, {   
    image: { url: resp.secure_url, public_id: resp.public_id },
  });

  

  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your profile image updated successfully",
    data: result,
  });
});

const handleChangUserPassword = catchAsync(async (req, res) => {
  const id = req.user.userId;
  const result = await authServices.changePasswordService(id, { ...req.body });


  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your password changed successfully",
    data: result,
  });
});


export const userController = {
  handleSignUpUser,
  handleLoginUser,
  handleGetUserProfile,
  handleGetAllUsers,
  handleUpdateUserProfile,
  handleUpdateUserProfileImage,
  handleChangUserPassword,
  handleUpdateUserRole,
  handleDeleteUserFromDB,
};



