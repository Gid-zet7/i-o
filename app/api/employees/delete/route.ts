import Employee from "@/models/employeeModel";
import { connectDB } from "@/lib/database";
import Manager from "@/models/managerModel";
import { verifyJwt } from "@/lib/jwt";

export const DELETE = async (request: Request) => {
  const authHeader =
    request.headers.get("authorization") ||
    request.headers.get("Authorization");

  // console.log(authHeader);

  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      }
    );
  }

  const token = authHeader.split(" ")[1];
  // console.log(token);

  if (!token || !verifyJwt(token)) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      }
    );
  }

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
