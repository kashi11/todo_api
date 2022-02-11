import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    userId: String,
    isGoogleUser: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
