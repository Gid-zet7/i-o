import { connectDB } from "@/lib/database";
import { verifyJwt } from "@/lib/jwt";
import Project from "@/models/projectModel";

export const DELETE = async (request: Request) => {
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
  const { id } = await request.json();

  if (!id) {
    return new Response("An Id is required", { status: 400 });
  }

  console.log(id);

  await connectDB();
  const project = await Project.findById(id).exec();

  console.log(project);

  if (!project) {
    return new Response("Project not found", { status: 400 });
  }

  await project.deleteOne();

  return new Response("Project deleted successfully", {
    status: 200,
  });
};
