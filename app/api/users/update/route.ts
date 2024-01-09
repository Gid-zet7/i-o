import UserModel from "@/models/userModel";
import { connectDB } from "@/lib/database";
import bcrypt from "bcrypt";

export const PATCH = async (request: Request) => {
  const { id, username, email, password, avatarUrl, roles, active } =
    await request.json();

  // Check if and id is provided
  if (!id) return new Response("Id is required", { status: 400 });

  // All fields are required
  if (
    !username ||
    !email ||
    !password ||
    !Array.isArray(roles) ||
    !roles.length ||
    !active
  ) {
    return new Response("All fields are required", { status: 400 });
  }

  // Connect database
  await connectDB();

  // Find user with the id provided
  const user = await UserModel.findById(id).exec();

  if (!user) return new Response("User not found", { status: 400 });

  const duplicate: any = await UserModel.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Check if username is already taken but make sure the duplicate user does not include the target user
  if (duplicate && duplicate?._id.toString() !== id) {
    return new Response("Username already taken", { status: 409 });
  }

  // update user details
  user.username = username;
  user.email = email;
  user.avatarUrl = avatarUrl;
  user.roles = roles;
  user.active = active;

  // If password was changed, encrypt and update password
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  // Save changes
  const updateUser = await user.save();

  return new Response(`${updateUser.username} updated successfully`, {
    status: 200,
  });
};
