import Employee from "@/models/employeeModel";
import UserModel from "@/models/userModel";
import { connectDB } from "@/lib/database";
import Department from "@/models/departmentModel";
import { verifyJwt } from "@/lib/jwt";

export const POST = async (request: Request) => {
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

  // Destructure employee details from request
  const {
    username,
    firstname,
    lastname,
    bio,
    gender,
    contact,
    permanent_address,
    current_address,
    birthday,
    department,
    position,
    skills,
    experiences,
    education,
    startDate,
  } = await request.json();

  console.log(
    username,
    firstname,
    lastname,
    bio,
    gender,
    contact,
    permanent_address,
    current_address,
    birthday,
    department,
    position,
    skills,
    experiences,
    education,
    startDate
  );

  // Return an error is any these details is missing
  if (
    !username ||
    !firstname ||
    !lastname ||
    !bio ||
    !gender ||
    !contact ||
    !permanent_address ||
    !current_address ||
    !birthday ||
    !department ||
    !position ||
    !skills ||
    !experiences ||
    !education ||
    !startDate
  ) {
    return new Response("Fill all required fields", { status: 400 });
  }

  try {
    // Connecting to the database
    await connectDB();

    // Check if the 'employee to be' has signed up as a user
    const findUser = await UserModel.findOne({ username }).exec();

    if (!findUser) return new Response("Sign up first", { status: 400 });

    const findDepartment = await Department.findOne({
      name: department,
    }).exec();

    if (!findDepartment)
      return new Response("Invalid department", { status: 400 });

    // Check for duplicates
    const duplicate = await Employee.findOne({ user: findUser })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

    if (duplicate)
      return new Response("Employee already exists", {
        status: 409,
      });

    // Create employee object
    const employeeObj = {
      user: findUser,
      firstname,
      lastname,
      bio,
      gender,
      contact,
      permanent_address,
      current_address,
      birthday,
      department: findDepartment,
      position,
      skills,
      experience: experiences,
      education,
      startDate,
    };

    // Save to the database
    const newEmployee = await Employee.create(employeeObj);

    if (newEmployee) {
      return new Response("New employee added successfully", { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Error during registration ", {
      status: 500,
    });
  }
};
