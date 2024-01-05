import Employee from "@/models/employeeModel";
import { connectDB } from "@/lib/database";

export const DELETE = async (request: Request) => {
  const { id } = await request.json();

  if (!id) {
    return new Response("An Id is required", { status: 400 });
  }

  await connectDB();
  const employee = await Employee.findById(id).exec();

  if (!employee) {
    return new Response("Employee not found", { status: 400 });
  }

  await employee.deleteOne();

  return new Response("Employee deleted successfully", { status: 200 });
};
