import Employee from "@/models/employeeModel";
import { connectDB } from "@/lib/database";
import { verifyJwt } from "@/lib/jwt";

type Props = {
  params: {
    id: string;
  };
};

export const GET = async (request: Request, { params: { id } }: Props) => {
  try {
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
    await connectDB();

    const employee = await Employee.findById(id)
      .populate("user")
      .populate("department")
      .populate("performance")
      .populate({
        path: "performance",
        populate: {
          path: "employee",
          model: "employee",
        },
      })
      .lean();

    if (!employee) return new Response("Employee not found", { status: 400 });

    return new Response(JSON.stringify(employee), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
