import { connectDB } from "@/lib/database";
import Department from "@/models/departmentModel";

export const POST = async (request: Request) => {
  // Destructure department details from request
  const { name, head_of_department, description } = await request.json();

  // Return an error is any of these details is missing
  if (!name || !head_of_department || !description) {
    return new Response("Fill all required fields", { status: 400 });
  }

  // Connecting to the database
  await connectDB();

  // Watchout for duplicate departments
  const duplicate = await Department.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate)
    return new Response("Department already exists", {
      status: 409,
    });

  // Create department object
  const departmentObj = {
    name,
    head_of_department,
    description,
  };

  // Save to the database
  const newDepartment = await Department.create(departmentObj);

  if (newDepartment) {
    return new Response("New department added successfully", { status: 200 });
  }
};
