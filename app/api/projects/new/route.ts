import { connectDB } from "@/lib/database";
import Project from "@/models/projectModel";
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

  // Destructure project details from request
  const { title, description, startDate, tasks } = await request.json();

  // Return an error is any of these details is missing
  if (
    !title ||
    !startDate ||
    !description ||
    !Array.isArray(tasks) ||
    !tasks.length
  ) {
    return new Response("Fill all required fields", { status: 400 });
  }

  // Connecting to the database
  await connectDB();

  // Create project object
  const projectObj = {
    title,
    description,
    startDate,
    tasks,
  };

  // Save to the database
  const newProject = await Project.create(projectObj);

  if (newProject) {
    return new Response("New project added successfully", { status: 200 });
  }
};
