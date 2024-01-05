import { connectDB } from "@/lib/database";
import AppraisalForm from "@/models/appraisalFormModel";

export const POST = async (request: Request) => {
  const { form_title, form_desc, questions } = await request.json();

  if (
    !form_title ||
    !form_desc ||
    !Array.isArray(questions) ||
    !questions.length
  ) {
    return new Response("All fields are required", { status: 400 });
  }

  await connectDB();

  const appraisalForm = await AppraisalForm.create({
    form_title,
    form_desc,
    questions: questions.map((question) => question),
  });

  if (!appraisalForm) {
    return new Response("Form saved!", { status: 200 });
  } else {
    return new Response("Something went wrong!, try again", { status: 400 });
  }
};
