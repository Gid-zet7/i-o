import Employee from "@/models/employeeModel";
import { connectDB } from "@/lib/database";
import { verifyJwt } from "@/lib/jwt";

export const GET = async (request: Request) => {
  try {
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
    await connectDB();

    const employees = await Employee.find()
      .populate("user")
      .populate("department")
      .lean();

    if (!employees?.length)
      return new Response("No employees found", { status: 400 });

    return new Response(JSON.stringify(employees), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch employees", { status: 500 });
  }
};
