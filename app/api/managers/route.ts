import Manager from "@/models/managerModel";
import { connectDB } from "@/lib/database";
import Employee from "@/models/employeeModel";
import UserModel from "@/models/userModel";

export const GET = async () => {
  try {
    await connectDB();

    const managers = await Manager.find()
      .populate("employee")
      .populate("team")
      .populate("team.user")
      .lean();

    if (!managers?.length)
      return new Response("No Managers found", { status: 400 });

    const managersWithUser = await Promise.all(
      managers.map(async (manager) => {
        const employee: any = await Employee.findById(manager.employee)
          .lean()
          .exec();
        const user: any = await UserModel.findById(employee?.user)
          .lean()
          .exec();

        return {
          ...manager,
          username: user?.username,
          firstname: user?.firstname,
          lastname: user?.lastname,
        };
      })
    );
    return new Response(JSON.stringify(managersWithUser), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch managers", { status: 500 });
  }
};
