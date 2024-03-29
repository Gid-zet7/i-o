import Employee from "@/models/employeeModel";
import { connectDB, Performance, UserModel } from "@/lib/database";
import Department from "@/models/departmentModel";
import { verifyJwt } from "@/lib/jwt";

export const PATCH = async (request: Request) => {
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
    id,
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
    performance,
    startDate,
    endDate,
  } = await request.json();

  if (!id) return new Response("Id is required", { status: 400 });

  if (
    !department ||
    !firstname ||
    !lastname ||
    !position ||
    !Array.isArray(skills) ||
    !skills.length ||
    !startDate
  ) {
    return new Response("Fill all required fields", { status: 400 });
  }

  // Connecting to the database
  await connectDB();

  // Find employee by id
  const employee = await Employee.findById(id).exec();

  if (!employee) return new Response("Employee not found", { status: 400 });

  // Check if department name is valid
  const findDepartment = await Department.findOne({ name: department }).exec();

  if (!findDepartment)
    return new Response("Invalid department name", { status: 409 });

  // Update employee details
  employee.department = findDepartment;
  employee.firstname = firstname;
  employee.lastname = lastname;
  employee.bio = bio;
  employee.gender = gender;
  employee.contact = contact;
  employee.permanent_address = permanent_address;
  employee.current_address = current_address;
  employee.birthday = birthday;
  employee.position = position;
  employee.skills = skills;
  employee.experience = experiences;
  employee.education = education;
  employee.startDate = startDate;

  if (performance) {
    const findPerformance = await Performance.findOne({ title: performance });
    if (!findPerformance) return new Response("Invalid title", { status: 400 });

    employee.performance = findPerformance;
  }

  if (endDate) {
    employee.endDate = endDate;
  }

  // Save employee
  await employee.save();

  return new Response("Employee updated successfully", { status: 200 });
};
