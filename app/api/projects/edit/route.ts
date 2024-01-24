import { connectDB } from "@/lib/database";
import { verifyJwt } from "@/lib/jwt";
import Project from "@/models/projectModel";

export const PATCH = async (request: Request) => {
  const authHeader =
    request.headers.get("authorization") ||
    request.headers.get("Authorization");

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

  const { id, title, description, startDate, tasks } = await request.json();

  if (!id) return new Response("Id is required", { status: 400 });

  if (
    !title ||
    !startDate ||
    !description ||
    !Array.isArray(tasks) ||
    !tasks.length
  ) {
    return new Response("Fill all required fields", { status: 400 });
  }

  await connectDB();

  const project = await Project.findById(id).exec();

  if (!project) return new Response("Project not found", { status: 400 });

  project.title = title;
  project.description = description;
  project.startDate = startDate;
  project.tasks = tasks;

  await project.save();

  return new Response("Project updated successfully", { status: 200 });
};
