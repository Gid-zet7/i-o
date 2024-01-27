import { connectDB } from "@/lib/database";
import Meeting from "@/models/meetingModel";
import UserModel from "@/models/userModel";
import Employee from "@/models/employeeModel";
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

  // Destructure employee details from request
  const { title, date, startTime, endTime, participants, agenda } =
    await request.json();
  console.log(title, date, startTime, endTime, participants, agenda);

  // Return an error is any these details is missing
  if (!title || !date || !startTime || !endTime || !participants || !agenda) {
    return new Response("Fill all required fields", { status: 400 });
  }

  try {
    // Connecting to the database
    await connectDB();

    let verifyParticipants = [];
    for (const employee of participants) {
      const result = await UserModel.findOne({ username: employee }).exec();
      // console.log(result);

      if (result) {
        const findEmployeesFromResults = await Employee.findOne({
          user: result,
        }).exec();

        if (!findEmployeesFromResults) {
          return new Response("Make sure every participant is an employee");
        }

        verifyParticipants.push(findEmployeesFromResults);
      } else {
        return new Response(
          "Make sure you have signed every participant as a user "
        );
      }
    }

    // Create meeting object
    const meetingObj = {
      title,
      date,
      startTime,
      endTime,
      participants: verifyParticipants,
      agenda,
    };

    // Save to the database
    const newMeeting = await Meeting.create(meetingObj);

    if (newMeeting) {
      return new Response("New meeting added successfully", { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Error during registration ", {
      status: 500,
    });
  }
};
