import { connectDB } from "@/lib/database";
import Manager from "@/models/managerModel";

export const DELETE = async (request: Request) => {
  const { id } = await request.json();

  if (!id) {
    return new Response("An Id is required", { status: 400 });
  }

  await connectDB();
  const manager = await Manager.findById(id).exec();

  if (!manager) {
    return new Response("Manager not found", { status: 400 });
  }

  await manager.deleteOne();

  return new Response("Manager demoted successfully", {
    status: 200,
  });
};
