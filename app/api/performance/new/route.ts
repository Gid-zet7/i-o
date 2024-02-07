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
  const { title, employee, date, feedback, data } = await request.json();
  console.log(title, employee, date, feedback, data);

  // Return an error is any these details is missing
  if (!title || !employee || !date || !data) {
    return new Response("Fill all required fields", { status: 400 });
  }

  try {
    // Connecting to the database
    await connectDB();

    // const findByTitle = await Performance.findOne({ title }).exec();

    const findUser = await UserModel.findOne({
      username: employee,
    }).exec();

    console.log(findUser);

    if (!findUser) return new Response("Sign up first", { status: 409 });

    const findEmployee = await Employee.findOne({ user: findUser })
      .populate("user")
      .exec();

    console.log(findEmployee);
    // if (!findByTitle)
    //   return new Response("Invalid title", {
    //     status: 409,
    //   });

    if (!findEmployee)
      return new Response("Register as an employee first", {
        status: 409,
      });

    // Create performance object
    const performanceObj = {
      title,
      employee: findEmployee,
      date,
      // feedback,
      // ratings,
      data,
    };
    console.log("saving...");
    // Save to the database
    const newPerformance = await Performance.create(performanceObj);
    if (newPerformance) {
      console.log("done");
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
