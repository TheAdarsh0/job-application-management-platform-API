import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchem.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return next(
      new ErrorHandler("Please fill out the full registration form!", 400)
    );
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already exists!", 400));
  }

  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });

  sendToken(user, 200, res, "User registered successfully!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(
      new ErrorHandler("Please provide email, password, and role.", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password.", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password.", 400));
  }

  if (user.role !== role) {
    return next(
      new ErrorHandler(
        `User with provided email and role ${role} not found!`,
        404
      )
    );
  }

  sendToken(user, 200, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logged out successfully!",
    });
});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
