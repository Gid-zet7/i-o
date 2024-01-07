import Department from "@/models/departmentModel";
import { connectDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectDB();

    // Fetch departments from database
    const departments = await Department.find()
      .populate("head_of_department")
      .lean();

    // If there are no departments return an error
    if (!departments?.length)
      return new Response("No departments found", { status: 400 });

    return new Response(JSON.stringify(departments), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch departments", { status: 500 });
  }
};
