import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface UserInterface {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatarUrl: string;
  roles: string[];
  active: boolean;
}

const userShema = new Schema<UserInterface>(
  {
    username: { type: String, required: true, minlength: 3 },
    firstname: { type: String, required: true, minlength: 3 },
    lastname: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatarUrl: { type: String, required: false },
    roles: { type: [String], default: ["User"] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.user || mongoose.model<UserInterface>("user", userShema);

export default UserModel;
