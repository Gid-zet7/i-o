import { Performance } from "@/lib/database";
import { connectDB } from "@/lib/database";
import { verifyJwt } from "@/lib/jwt";

export const DELETE = async (request: Request) => {
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

  const { id } = await request.json();

  if (!id) {
    return new Response("An Id is required", { status: 400 });
  }

  console.log(id);

  await connectDB();
  const performance = await Performance.findById(id).exec();

  if (!performance) {
    return new Response("Performance not found", { status: 400 });
  }

  await performance.deleteOne();

  return new Response("Employee performance deleted successfully", {
    status: 200,
  });
};
