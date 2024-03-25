import AppraisalForm from "@/models/appraisalFormModel";
import { connectDB } from "@/lib/database";
import { verifyJwt } from "@/lib/jwt";

export const GET = async (request: Request) => {
  try {
    const authHeader =
      request.headers.get("authorization") ||
      request.headers.get("Authorization");

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

    const appraisalForms = await AppraisalForm.find().lean();

    if (!appraisalForms?.length)
      return new Response("No forms found", { status: 400 });

    return new Response(JSON.stringify(appraisalForms), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch appraisal forms", { status: 500 });
  }
};
