import Meeting from "@/models/meetingModel";
import { connectDB } from "@/lib/database";
import { verifyJwt } from "@/lib/jwt";

export const PATCH = async (request: Request) => {
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

  // Destructure meeting details from request
  const { id, title, date, startTime, endTime, participants, agenda } =
    await request.json();

  if (!id) return new Response("Id is required", { status: 400 });

  if (!title || !date || !startTime || !endTime || !participants || !agenda) {
    return new Response("Fill all required fields", { status: 400 });
  }

  // Connecting to the database
  await connectDB();

  // Find meeting by id
  const meeting = await Meeting.findById(id).exec();

  if (!meeting) return new Response("Meeting not found", { status: 400 });

  // Update meeting details
  meeting.title = title;
  meeting.date = date;
  meeting.startTime = startTime;
  meeting.endTime = endTime;
  meeting.participants = participants;
  meeting.agenda = agenda;

  // Save employee
  await meeting.save();

  return new Response("Employee updated successfully", { status: 200 });
};
