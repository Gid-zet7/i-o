import { connectDB } from "@/lib/database";
import { verifyJwt } from "@/lib/jwt";
import Project from "@/models/projectModel";

type Props = {
  params: {
    id: string;
  };
};

export const GET = async (request: Request, { params: { id } }: Props) => {
  try {
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
    await connectDB();

    const project: any = await Project.findById(id).lean().exec();

    if (!project) return new Response("Project not found", { status: 400 });

    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch project", { status: 500 });
  }
};
