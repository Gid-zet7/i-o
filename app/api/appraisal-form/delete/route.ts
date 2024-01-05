import AppraisalForm from "@/models/appraisalFormModel";
import { connectDB } from "@/lib/mongodb";

export const DELETE = async (request: Request) => {
  const { id } = await request.json();

  if (!id) {
    return new Response("An Id is required", { status: 400 });
  }

  await connectDB();
  const performance = await AppraisalForm.findById(id).exec();

  if (!performance) {
    return new Response("Performance not found", { status: 400 });
  }

  await performance.deleteOne();

  return new Response("Performance deleted successfully", { status: 200 });
};
