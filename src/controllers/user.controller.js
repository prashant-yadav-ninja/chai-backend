import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { checkEmailValidation } from "../validation.js";

const registerUser = asyncHandler(async (req, res) => {
  // user details aa rhi hai unko mongodb me save kara

  // get user details from frontend part
  // validataion - empty to nhi fields
  // check user not already present

  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName = "", email = "", username = "", password = "" } = req.body; // if fields not coming from req.body means they undefined and if i directly apply trim on them this will lead to cannot read properties of undefined

  //   if (!fullname) {
  //     throw new ApiError(400, "fullname is required");
  //   }

  if (
    [fullName, email, username, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "fields are required and must have correct syntax");
  }
  // if (
  //   [fullName, email, username, password].some(
  //     (field) => field.trim() === ""
  //   ) ||
  //   !checkEmailValidation(email)
  // ) {
  //   throw new ApiError(400, "fields are required and must have correct syntax");
  // }

  //   const user = await User.findOne({ email: email }, { username: username });
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(406, "User with username or email already existed");
  }

  // console.log('this is from userController.js',req.files)

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath   // if u not intiallize with empty string cloudinary handle it 

  if(req.files && req.files.coverImage && req.files.coverImage[0]){
    coverImageLocalPath = req.files.coverImage[0].path
  }
  

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }

  const avatar = await uploadonCloudinary(avatarLocalPath);
  const coverImage = await uploadonCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Reupload avatar file");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));

  //   if (!user) {
  //     throw new ApiError(500, "Register User not successfull");
  //   }

  //   user.select("-password -refreshToken");

  //   return res
  //     .status(201)
  //     .json(
  //       new ApiResponse(
  //         200,
  //         user,
  //         "User Registered Successfully"
  //       )
  //     );

  //   return res
  //     .status(201)
  //     .json(
  //       new ApiResponse(
  //         200,
  //         user.select("-password -refreshToken"),
  //         "User Registered Successfully"
  //       )
  //     );

  //   console.log(typeof req.files, "this is coming");

  //   console.log(req.body);
  //   console.log(req.files);

  //   res.status(200).json({
  //     message: "ok",
  //   });
});

export { registerUser };

// The `select` method is used here to specify which document fields to include or exclude. The `-` sign before `password` and `refreshToken` means that these fields will be excluded from the results. This is done for security reasons, as you typically don't want to send sensitive information like passwords or refresh tokens back to the client.

// In this case, after the user is created, the code is fetching the user again from the database but excluding the `password` and `refreshToken` fields. The `select` method is part of Mongoose, a MongoDB object modeling tool designed to work in an asynchronous environment. It provides a straight-forward, schema-based solution to model your application data and includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
