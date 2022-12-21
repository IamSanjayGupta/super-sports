// Schema for user

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
