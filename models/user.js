"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = new Schema({
  uuid: String,
  email: { type: String, unique: true, lowercase: true },
  username: String,
  phone: String,
  avatar: String,
  dni: String,
  publicidad: Boolean,
  role: String,
  password: String,
  resetCode: String,
  resetExpiryTime: Date,
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
});

UserSchema.pre("save", function(next) {
  let user = this;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.methods.gravatar = function() {
  if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`;

  const md5 = crypto
    .createHash("md5")
    .update(this.email)
    .digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
};

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, res) {
    cb(null, res);
  });
};

module.exports = mongoose.model("User", UserSchema);
