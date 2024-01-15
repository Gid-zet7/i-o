import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userShema = new Schema<User>(
  {
    username: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatarUrl: { type: String, required: false },
    roles: {
      type: [String],
      default: ["User"],
      enum: ["User", "Employee", "Manager", "Admin"],
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.user || mongoose.model<User>("user", userShema);

export default UserModel;
