const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required."],
      // match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    nationality: String,
    aboutMe: String,
    profilePicture: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum:["male", "female"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
