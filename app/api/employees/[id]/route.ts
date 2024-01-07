import Employee from "@/models/employeeModel";
import { connectDB } from "@/lib/database";

type Props = {
  params: {
    id: string;
  };
};

export const GET = async (request: Request, { params: { id } }: Props) => {
  try {
    await connectDB();

    const employee = await Employee.findById(id)
      .populate("user")
      .populate("department")
      .lean();

    if (!employee) return new Response("Employee not found", { status: 400 });

    return new Response(JSON.stringify(employee), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
