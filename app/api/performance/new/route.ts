import { Employee, UserModel, connectDB } from "@/lib/database";
import Performance from "@/models/performanceModel";
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

  // Destructure performance details from request
  const { employee, date, feedback, data } = await request.json();
  console.log(employee, date, feedback, data);

  // Return an error is any these details is missing
  if (!employee || !date || !feedback || !data) {
    return new Response("Fill all required fields", { status: 400 });
  }

  try {
    // Connecting to the database
    await connectDB();

    const findUser = await UserModel.findOne({
      username: employee,
    }).exec();

    if (!findUser) return new Response("Sign up first", { status: 409 });

    const findEmployee = await Employee.findOne({ user: findUser })
      .populate("user")
      .exec();

    // console.log(findEmployee);

    if (!findEmployee)
      return new Response("Register as an employee first", {
        status: 409,
      });
    //        for (const newData of data) {
    //          const result = await ResearchData.findOne({
    //            "data.question": newData.question,
    //            "data.response": newData.response,
    //          });
    //          if (result) {
    //            await ResearchData.updateOne(
    //              {
    //                "data.question": newData.question,
    //                "data.response": newData.response,
    //              },
    //              { $set: { "data.value": result.data.value + 1 } }
    //            );
    //            console.log("Document updated successfully.");
    //          } else {
    //            await ResearchData.create({
    //              data: {
    //                question: newData.question,
    //                response: newData.response,
    //                value: 1,
    //              },
    //            });
    //            console.log("Document inserted successfully.");
    //          }
    //        }
    // Create performance object
    const performanceObj = {
      employee: findEmployee,
      date,
      feedback,
      // ratings,
      data,
    };
    // Save to the database
    const newPerformance = await Performance.create(performanceObj);
    if (newPerformance) {
      return new Response("Performance appraised successfully", {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response("Error during registration ", {
      status: 500,
    });
  }
};
