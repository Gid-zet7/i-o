import type { Metadata } from "next";
import { getManager } from "@/lib/actions";
import { notFound } from "next/navigation";
import EditManagerForm from "@/components/EditManagerForm";

type Params = {
  params: {
    managerId: string;
  };
};

export const generateMetadata = async ({
  params: { managerId },
}: Params): Promise<Metadata> => {
  const managerData: Promise<Manager> = getManager(managerId);
  const manager: Manager = await managerData;

  if (!manager?.employee.user.username) {
    return {
      title: "Employee not found",
    };
  }

  return {
    title: `${manager?.employee.user.username} details`,
    description: `This page displays ${manager?.employee.user.username} details`,
  };
};

export default async function EditEmployeePage({
  params: { managerId },
}: Params) {
  const managerData: Promise<Manager> = getManager(managerId);
  const manager: Manager = await managerData;

  if (!manager?.employee.user?.username) return notFound();

  return <EditManagerForm manager={manager} />;
}
