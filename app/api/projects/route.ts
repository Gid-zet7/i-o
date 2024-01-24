import Project from "@/models/projectModel";
import { connectDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectDB();

    // Fetch projects from database
    const projects = await Project.find().lean();

    // If there are no projects return an error
    if (!projects?.length)
      return new Response("No projects found", { status: 400 });

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch projects", { status: 500 });
  }
};
