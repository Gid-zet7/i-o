import { connectDB } from "@/lib/database";
import Department from "@/models/departmentModel";

export const PATCH = async (request: Request) => {
  // Destructure department details from request
  const { id, name, head_of_department, description } = await request.json();

  if (!id) return new Response("Id is required", { status: 400 });

  if (!name || !head_of_department || !description) {
    return new Response("Fill all required fields", { status: 400 });
  }

  // Connecting to the database
  await connectDB();

  // Find department by id
  const department = await Department.findById(id).exec();

  if (!department) return new Response("Department not found", { status: 400 });

  // Update department details
  department.name = name;
  department.head_of_department = head_of_department;
  department.description = description;

  // Save department
  await department.save();

  return new Response("Department updated successfully", { status: 200 });
};
