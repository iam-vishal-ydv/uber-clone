const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: { type: String, required: true, minlength: 3 },
      lastname: { type: String, required: true, minlength: 3 },
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
      minlength: 5,
    },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String, required: true, select: false, minlength: 6 },
    socketId: { type: String }, // fixed typo
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    vehicle: {
      color: { type: String, required: true, minlength: 3 },
      plate: { type: String, required: true, minlength: 3 },
      capacity: { type: Number, required: true, min: 1 },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "motorcycle", "auto"],
      },
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

captainSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

captainSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
captainSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model("Captain", captainSchema);
