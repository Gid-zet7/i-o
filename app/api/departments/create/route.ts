import UserModel from "@/models/userModel";
import Employee from "@/models/employeeModel";
import Manager from "@/models/managerModel";
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

  // Check if the 'head of deparment to be' is a user
  const findUser = await UserModel.findOne({
    username: head_of_department,
  }).exec();

  //   If not return an error
  if (!findUser) return new Response("Sign up first", { status: 409 });

  //   Check if the 'head of deparment to be' is an employee
  const findEmployee = await Employee.findOne({ user: findUser })
    .populate("user")
    .exec();

  if (!findEmployee)
    return new Response("Register as an employee first", { status: 409 });

  //   Check if the 'head of deparment to be' is a manager
  const findManager = await Manager.findOne({ employee: findEmployee }).exec();

  if (!findManager)
    return new Response("Only managers can be head of deparment ", {
      status: 409,
    });

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
    head_of_department: findManager,
    description,
  };

  // Save to the database
  const newDepartment = await Department.create(departmentObj);

  if (newDepartment) {
    return new Response("New department added successfully", { status: 200 });
  }
};
