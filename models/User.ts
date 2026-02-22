import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  title: {
    type: String,
    default: "Precious Metals Analyst",
  },
  socialLinks: {
    facebook: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    pinterest: { type: String, default: "" },
    website: { type: String, default: "" },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
