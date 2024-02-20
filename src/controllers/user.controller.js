import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
    throw new ApiError(400, "fields are required");
  }

  //   const user = await User.findOne({ email: email }, { username: username });
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(406, "User with username or email already existed");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0].path;

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

  if (!user) {
    throw new ApiError(500, "Register User not successfull");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        user.select("-password -refreshToken"),
        "User Registered Successfully"
      )
    );

  //   console.log(typeof req.files, "this is coming");

  //   console.log(req.body);
  //   console.log(req.files);

  //   res.status(200).json({
  //     message: "ok",
  //   });
});

export { registerUser };
