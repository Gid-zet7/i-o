import type { Metadata } from "next";
import { getEmployee } from "@/lib/actions";
import { notFound } from "next/navigation";
import EditEmployeeForm from "@/components/EditEmployeeForm";

type Params = {
  params: {
    employeeId: string;
  };
};

export const generateMetadata = async ({
  params: { employeeId },
}: Params): Promise<Metadata> => {
  const employeeData: Promise<Employee> = getEmployee(employeeId);
  const employee: Employee = await employeeData;

  if (!employee?.user?.username) {
    return {
      title: "Employee not found",
    };
  }

  return {
    title: `${employee?.user?.username} details`,
    description: `This page displays ${employee?.user?.username} details`,
  };
};

export default async function EditEmployeePage({
  params: { employeeId },
}: Params) {
  const employeeData: Promise<Employee> = getEmployee(employeeId);
  const employee: Employee = await employeeData;

  // console.log(employee?.department.name);

  if (!employee?.user?.username) return notFound();
  // console.log(employee);

  return <EditEmployeeForm employee={employee} />;
}