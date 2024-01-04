import Department from "@/models/departmentModel";
import { connectDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectDB();

    // Fetch departments from database
    const deparments = await Department.find()
      .populate("head_of_department")
      .lean();

    // If there are no deparments return an error
    if (!deparments?.length)
      return new Response("No deparments found", { status: 400 });

    return new Response(JSON.stringify(deparments), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch deparments", { status: 500 });
  }
};
