const userModel = require("../models/user-model");
const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const blackListToken = require("../models/blacklist-model");
module.exports.registerUser = async function (req, res, next) {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { firstname, lastname } = req.body.fullname;
    const { email, password } = req.body;
    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
      return res.status(400).json({
        message: " User already exits",
      });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    return res.status(201).json({
      token,
      user: {
        _id: user._id,
        firstname,
        lastname,
        email,
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server Error", error: err.message });
  }
};

module.exports.login = async function (req, res, next) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password " });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password " });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    token,
    user,
  });
};

module.exports.getUserProfile = async function (req, res, next) {
  res.status(200).json({ message: "Get user successfully", user: req.user });
};

module.exports.logoutUser = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const headerToken = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
    const token = req.cookies?.token || headerToken;

    if (!token) return res.status(400).json({ message: "No token provided" });

    await blackListToken.create({ token });

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
    return res.status(200).json({ message: "Logged Out" });
  } catch (error) {
    next(error);
  }
};
