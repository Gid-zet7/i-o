import Manager from "@/models/managerModel";
import { connectDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectDB();

    const managers = await Manager.find()
      .populate({
        path: "employee",
        populate: {
          path: "user",
          model: "user",
        },
      })
      .populate({
        path: "team",
        populate: {
          path: "user",
          model: "user",
        },
      })
      .lean()
      .exec();

    if (!managers?.length)
      return new Response("No Managers found", { status: 400 });

    return new Response(JSON.stringify(managers), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch managers", { status: 500 });
  }
};
