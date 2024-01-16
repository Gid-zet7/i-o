import Employee from "@/models/employeeModel";
import { connectDB } from "@/lib/database";
import Department from "@/models/departmentModel";

export const PATCH = async (request: Request) => {
  // Destructure employee details from request
  const {
    id,
    firstname,
    lastname,
    department,
    position,
    skills,
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
  employee.position = position;
  employee.skills = skills;
  employee.startDate = startDate;

  if (performance) {
    employee.performance = performance;
  }

  if (endDate) {
    employee.endDate = endDate;
  }

  // Save employee
  await employee.save();

  return new Response("Employee updated successfully", { status: 200 });
};
