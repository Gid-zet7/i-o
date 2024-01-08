import { connectDB } from "@/lib/database";
import Employee from "@/models/employeeModel";
import Manager from "@/models/managerModel";
import UserModel from "@/models/userModel";

type Props = {
  params: {
    id: string;
  };
};

export const GET = async (request: Request, { params: { id } }: Props) => {
  try {
    await connectDB();

    const manager: any = await Manager.findById(id)
      .populate({
        path: "employee",
        populate: {
          path: "user",
          model: "user",
        },
      })
      .populate({
        path: "team",
        populate: {
          path: "user",
          model: "user",
        },
      })
      .lean()
      .exec();

    if (!manager) return new Response("Manager not found", { status: 400 });

    return new Response(JSON.stringify(manager), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch manager", { status: 500 });
  }
};
