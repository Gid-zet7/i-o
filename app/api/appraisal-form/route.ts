import AppraisalForm from "@/models/appraisalFormModel";
import { connectDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectDB();

    const appraisalForms = await AppraisalForm.find().lean();

    if (!appraisalForms?.length)
      return new Response("No forms found", { status: 400 });

    return new Response(JSON.stringify(appraisalForms), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch appraisal forms", { status: 500 });
  }
};
