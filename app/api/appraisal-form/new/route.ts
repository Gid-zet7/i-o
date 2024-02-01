import { connectDB } from "@/lib/database";
import AppraisalForm from "@/models/appraisalFormModel";
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

  const {
    employeeName,
    position,
    department,
    dateOfReview,
    typeOfReview,
    questions,
  } = await request.json();

  if (
    !employeeName ||
    !position ||
    !department ||
    !dateOfReview ||
    !typeOfReview ||
    !Array.isArray(questions) ||
    !questions.length
  ) {
    return new Response("All fields are required", { status: 400 });
  }

  await connectDB();

  const appraisalForm = await AppraisalForm.create({
    employeeName,
    position,
    department,
    dateOfReview,
    typeOfReview,
    questions: questions.map((question) => question),
  });

  if (appraisalForm) {
    return new Response("Form saved!", { status: 200 });
  } else {
    return new Response("Something went wrong!, try again", { status: 400 });
  }
};
