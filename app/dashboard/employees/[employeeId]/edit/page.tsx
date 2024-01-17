import type { Metadata } from "next";
import { getAllDepartments, getEmployee } from "@/lib/actions";
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

  const departmentsData: Promise<Department[]> = getAllDepartments();
  const departments: Department[] = await departmentsData;

  // console.log(employee?.department.name);

  if (!employee?.user?.username) return notFound();
  // console.log(departments);

  return (
    <EditEmployeeForm
      employeeId={employee._id}
      employee={employee}
      departments={departments}
    />
  );
}
