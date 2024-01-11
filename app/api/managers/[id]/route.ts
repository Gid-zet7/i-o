import { connectDB } from "@/lib/database";
import Manager from "@/models/managerModel";
import { verifyJwt } from "@/lib/jwt";

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

    const manager: any = await Manager.findById(id)
      .populate({
        path: "employee",
        populate: {
          path: "user",
          model: "user",
        },
      })
      .populate({
        path: "team",
        populate: {
          path: "user",
          model: "user",
        },
      })
      .lean()
      .exec();

    if (!manager) return new Response("Manager not found", { status: 400 });

    return new Response(JSON.stringify(manager), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch manager", { status: 500 });
  }
};
