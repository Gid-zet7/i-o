import UserModel from "@/models/userModel";
import { connectDB } from "@/lib/database";
import Employee from "@/models/employeeModel";
import Manager from "@/models/managerModel";

export const DELETE = async (request: Request) => {
  const { id } = await request.json();

  if (!id) {
    return new Response("An Id is required", { status: 400 });
  }

  await connectDB();
  const [user, employee] = await Promise.all([
    UserModel.findById(id).lean().exec(),
    Employee.findOne({ user: id }).lean().exec(),
  ]);

  const manager = await Manager.findOne({ employee: employee?._id })
    .lean()
    .exec();

  if (!user) {
    return new Response("User not found", { status: 400 });
  }

  if (employee)
    return new Response("Make sure to remove user as an employee first ", {
      status: 400,
    });

  if (manager)
    return new Response(
      "Make sure to demote user from manager status and remove user as an employee ",
      { status: 400 }
    );

  await user.deleteOne();

  return new Response("User deleted successfully", { status: 200 });
};
