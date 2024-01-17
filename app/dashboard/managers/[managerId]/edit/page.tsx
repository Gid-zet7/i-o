import type { Metadata } from "next";
import { getManager } from "@/lib/actions";
import { notFound } from "next/navigation";
import EditManagerForm from "@/components/EditManagerForm";
import { getAllEmployees } from "@/lib/actions";

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

  const employeesData: Promise<Employee[]> = getAllEmployees();
  const employees: Employee[] = await employeesData;

  if (!manager?.employee.user?.username) return notFound();
  if (!employees?.length) return notFound();

  return (
    <EditManagerForm
      managerId={manager._id}
      manager={manager}
      employees={employees}
    />
  );
}
