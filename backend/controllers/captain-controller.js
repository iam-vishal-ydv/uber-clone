const captainModel = require("../models/captain-model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklist-model");

module.exports.registerCaptain = async function (req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });
  console.log(isCaptainAlreadyExist);
  if (isCaptainAlreadyExist) {
    return res.status(400).json({
      message: "Captain already exist ",
    });
  }

  const hashPassword = await captainModel.hashPassword(password);
  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });
  const token = captain.generateAuthToken();

  res.status(201).json({ message: " Create Captain", token, captain });
};

module.exports.loginCaptain = async function (req, res, next) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    token,
    captain,
    message: "Login successful",
  });
};

module.exports.captain = async function (req, res, next) {
  res
    .status(200)
    .json({ message: " Get Captain successfully", captain: req.captain });
};

module.exports.logoutCaptain = async function (req, res, next) {
  const auth = req.headers.authorization;
  const headerToken = auth ? auth.split(" ")[1] : null;
  const token = req.cookies?.token || headerToken;
  await blackListTokenModel.create({ token });
  res.clearCookie("token");

  res.status(200).json({ message: " Captain logout successfully" });
};
