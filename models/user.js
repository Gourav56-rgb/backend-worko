import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter Email"],
      unique: [true, "Email already exists"],
      validate: validator.default.isEmail
    },
    age: {
      type: Number,
      required: [true, "Please enter Age"],
    },
    city: {
      type: String,
      required: [true, "Please enter City"],
    },
    zipcode: {
      type: String,
      required: [true, "Please enter Zipcode"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
