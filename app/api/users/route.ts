import UserModel from "@/models/userModel";
import { connectDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectDB();

    // Get user details excluding password from database
    const users = await UserModel.find().select("-password").lean();

    // If there are no users return an error
    if (!users?.length) return new Response("No users found", { status: 400 });

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch users", { status: 500 });
  }
};
