import { Performance, connectDB } from "@/lib/database";
import { verifyJwt } from "@/lib/jwt";

export const GET = async (request: Request) => {
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

    const performances = await Performance.find()
      .populate("employee")
      .populate({
        path: "employee",
        populate: {
          path: "user",
          model: "user",
        },
      })
      .lean();

    if (!performances?.length)
      return new Response("No performances found", { status: 400 });

    return new Response(JSON.stringify(performances), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch performances", { status: 500 });
  }
};
