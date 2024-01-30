const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../modal/userModal");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");

//Create new User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role, avatar } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
    avatar,
  });

  sendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // finding the user from database

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email", 401));
  }

  if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid password", 401));
  }

  sendToken(user, 201, res);
});

//Logout user
exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logout successfully",
    });
};
