import UserModel from "@/models/userModel";
import { connectDB } from "@/lib/database";

type Props = {
  params: {
    id: string;
  };
};

// Get user by id
export const GET = async (request: Request, { params: { id } }: Props) => {
  await connectDB();

  const user = await UserModel.findById(id).select("-password").lean();

  if (!user) return new Response("User not found", { status: 400 });

  return new Response(JSON.stringify(user), { status: 200 });
};
