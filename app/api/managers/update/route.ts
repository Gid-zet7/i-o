import Employee from "@/models/employeeModel";
import { connectDB } from "@/lib/database";
import UserModel from "@/models/userModel";
import Manager from "@/models/managerModel";
import { verifyJwt } from "@/lib/jwt";

export const PATCH = async (request: Request) => {
  const authHeader = request.headers.get("authorization");
  request.headers.get("Authorization");

  console.log(authHeader);

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

  const { id, team, projects, meetings } = await request.json();

  if (!id) return new Response("Id is required", { status: 400 });

  if (
    !Array.isArray(team) ||
    !team.length ||
    !Array.isArray(projects) ||
    !projects.length
  ) {
    return new Response("Fill all required fields", { status: 400 });
  }

  await connectDB();

  const manager = await Manager.findById(id).exec();

  if (!manager) return new Response("Manager not found", { status: 400 });

  let verifyTeam = [];
  for (const users of team) {
    const result = await UserModel.findOne({ username: users }).exec();

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

  manager.team = verifyTeam;
  manager.projects = projects;

  if (meetings) {
    manager.meetings = meetings;
  }

  await manager.save();

  return new Response("Manager updated successfully", { status: 200 });
};
