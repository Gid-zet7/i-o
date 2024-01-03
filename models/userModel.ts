import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface UserInter {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roles: string[];
  active: boolean;
}

const userShema = new Schema<UserInter>(
  {
    username: { type: String, required: true, minlength: 3 },
    firstname: { type: String, required: true, minlength: 3 },
    lastname: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ["User"] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.user || mongoose.model<UserInter>("user", userShema);

export default UserModel;
