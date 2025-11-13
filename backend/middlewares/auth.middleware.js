const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blacklist-model");
const captainModel = require("../models/captain-model");

module.exports.authUser = async (req, res, next) => {
  const auth = req.headers.authorization || "";
  const header = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
  const token = req.cookies.token || header;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token: token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports.authCaptain = async function (req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const headerToken = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
    const cookieToken = req.cookies?.token;
    const token = cookieToken || headerToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized Captain" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ message: "Unauthorized captain" });
    }

    const isBlackListed = await blackListTokenModel
      .findOne({ token })
      .select("_id")
      .lean();

    if (isBlackListed) {
      return res.status(401).json({ message: "Unauthorized Captain" });
    }

    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: "Unauthorized captain" });
    }

    req.captain = captain;
    return next();
  } catch (err) {
    console.error("authCaptain error:", err);
    return res.status(401).json({ message: "Unauthorized captain" });
  }
};
