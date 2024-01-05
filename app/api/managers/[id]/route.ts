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
      .populate("employee")
      .populate("team")
      .lean();

    if (!manager) return new Response("Manager not found", { status: 400 });

    const employee: any = await Employee.findById(manager.employee)
      .lean()
      .exec();
    const user: any = await UserModel.findById(employee?.user).lean().exec();

    const managerWithUser = {
      ...manager,
      username: user?.username,
      firstname: user?.firstname,
      lastname: user?.lastname,
    };

    return new Response(JSON.stringify(managerWithUser), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch manager", { status: 500 });
  }
};
