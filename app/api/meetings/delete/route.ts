import { connectDB } from "@/lib/database";
import Meeting from "@/models/meetingModel";
import { verifyJwt } from "@/lib/jwt";

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

  await connectDB();
  const meeting = await Meeting.findById(id).exec();

  if (!meeting) return new Response("Meeting not found", { status: 400 });

  await meeting.deleteOne();

  return new Response("Meeting deleted successfully", { status: 200 });
};
