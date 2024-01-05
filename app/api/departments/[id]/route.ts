import Department from "@/models/departmentModel";
import { connectDB } from "@/lib/database";

type Props = {
  params: {
    id: string;
  };
};

export const GET = async (request: Request, { params: { id } }: Props) => {
  await connectDB();

  const department = await Department.findById(id).lean();

  if (!department) return new Response("Department not found", { status: 400 });

  return new Response(JSON.stringify(department), { status: 200 });
};
