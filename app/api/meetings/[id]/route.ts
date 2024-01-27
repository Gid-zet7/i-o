import Meeting from "@/models/meetingModel";
import { connectDB } from "@/lib/database";
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

    const meeting = await Meeting.findById(id).lean();

    if (!meeting) return new Response("Meeting not found", { status: 400 });

    return new Response(JSON.stringify(meeting), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
