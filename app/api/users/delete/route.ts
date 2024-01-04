import UserModel from "@/models/userModel";
import { connectDB } from "@/lib/database";

export const DELETE = async (request: Request) => {
  const { id } = await request.json();

  if (!id) {
    return new Response("An Id is required", { status: 400 });
  }

  await connectDB();
  const user = await UserModel.findById(id).exec();

  if (!user) {
    return new Response("User not found", { status: 400 });
  }

  await user.deleteOne();

  return new Response("User deleted successfully", { status: 200 });
};
