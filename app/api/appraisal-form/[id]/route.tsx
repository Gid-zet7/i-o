import AppraisalForm from "@/models/appraisalFormModel";
import { connectDB } from "@/lib/database";
// import { verifyJwt } from "@/lib/jwt";

type Props = {
  params: {
    id: string;
  };
};

export const GET = async (request: Request, { params: { id } }: Props) => {
  // const authHeader =
  //   request.headers.get("authorization") ||
  //   request.headers.get("Authorization");

  // // console.log(authHeader);

  // if (!authHeader?.startsWith("Bearer ")) {
  //   return new Response(
  //     JSON.stringify({
  //       error: "unauthorized",
  //     }),
  //     {
  //       status: 401,
  //     }
  //   );
  // }

  // const token = authHeader.split(" ")[1];
  // // console.log(token);

  // if (!token || !verifyJwt(token)) {
  //   return new Response(
  //     JSON.stringify({
  //       error: "unauthorized",
  //     }),
  //     {
  //       status: 401,
  //     }
  //   );
  // }

  await connectDB();

  const appraisalForm = await AppraisalForm.findById(id).lean();

  if (!appraisalForm) return new Response("Form not found", { status: 400 });

  return new Response(JSON.stringify(appraisalForm), { status: 200 });
};
