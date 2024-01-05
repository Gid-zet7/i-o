import Department from "@/models/departmentModel";
import { connectDB } from "@/lib/database";

export const DELETE = async (request: Request) => {
  const { id } = await request.json();

  if (!id) {
    return new Response("An Id is required", { status: 400 });
  }

  await connectDB();
  const department = await Department.findById(id).exec();

  if (!department) {
    return new Response("Department not found", { status: 400 });
  }

  await department.deleteOne();

  return new Response("Department deleted successfully", { status: 200 });
};
