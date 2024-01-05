import Employee from "@/models/employeeModel";
import { connectDB } from "@/lib/database";

export const GET = async () => {
  try {
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
