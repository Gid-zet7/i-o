import Manager from "@/models/managerModel";
import UserModel from "@/models/userModel";
import { connectDB } from "@/lib/database";
import Employee from "@/models/employeeModel";

export const POST = async (request: Request) => {
  const { employee, team, projects } = await request.json();

  if (!employee || !Array.isArray(projects) || !projects.length) {
    return new Response("All fields are required", { status: 400 });
  }
  console.log(employee, team, projects);

  await connectDB();

  const findUser = await UserModel.findOne({ username: employee }).exec();

  if (!findUser) return new Response("Sign up first", { status: 409 });

  const findEmployee = await Employee.findOne({ user: findUser })
    .populate("user")
    .exec();

  // console.log(findEmployee);

  if (!findEmployee)
    return new Response("Register as an employee first", { status: 409 });

  const duplicate = await Manager.findOne({ employee: findEmployee })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return new Response("Manager already exists", { status: 409 });
  }

  let verifyTeam = [];
  for (const users of team) {
    const result = await UserModel.findOne({ username: users }).exec();
    // console.log(result);

    if (result) {
      const findEmployeesFromResults = await Employee.findOne({
        user: result,
      }).exec();

      if (!findEmployeesFromResults) {
        return new Response("Make sure everyone in your team is an employee");
      }

      verifyTeam.push(findEmployeesFromResults);
    } else {
      return new Response(
        "Make sure you have signed everyone in your team as a user "
      );
    }
  }

  const managerObj =
    !Array.isArray(team) || !team.length
      ? { employee: findEmployee, projects }
      : { employee: findEmployee, team: verifyTeam, projects };

  const newManager = await Manager.create(managerObj);

  if (newManager) {
    return new Response("Employee promoted succesfully");
  } else {
    return new Response("Failed to promote employee, Try again");
  }
};
