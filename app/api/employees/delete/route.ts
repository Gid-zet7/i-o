import Employee from "@/models/employeeModel";
import { connectDB } from "@/lib/database";
import Manager from "@/models/managerModel";

export const DELETE = async (request: Request) => {
  const { id } = await request.json();

  if (!id) {
    return new Response("An Id is required", { status: 400 });
  }

  await connectDB();
  const employee = await Employee.findById(id).exec();

  const manager = await Manager.findOne({ employee: employee._id });

  if (!employee) {
    return new Response("Employee not found", { status: 400 });
  }

  if (manager)
    return new Response(
      "Make sure to demote employee from manager status first",
      {
        status: 400,
      }
    );

  await employee.deleteOne();

  return new Response("Employee deleted successfully", { status: 200 });
};
