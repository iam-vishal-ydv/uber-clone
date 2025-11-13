const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: { type: String, required: true, minlength: 3 },
      lastname: { type: String, minlength: 3 },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 5,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6,
    },
    socketId: { type: String },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model("User", userSchema);
