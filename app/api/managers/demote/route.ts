import { connectDB } from "@/lib/database";
import Manager from "@/models/managerModel";
import { verifyJwt } from "@/lib/jwt";

export const DELETE = async (request: Request) => {
  const authHeader = request.headers.get("authorization");
  request.headers.get("Authorization");

  console.log(authHeader);

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
