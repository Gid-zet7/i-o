import type { Metadata } from "next";
import { getAllEmployees } from "@/lib/actions";
import { getEmployee } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";

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

export default async function EmployeePage({ params: { employeeId } }: Params) {
  const employeeData: Promise<Employee> = getEmployee(employeeId);
  const employee: Employee = await employeeData;

  //   console.log(employee?.user.username);

  if (!employee?.user?.username) return notFound();

  return (
    <div key={employee._id}>
      <p>{employee?.user?.username} </p>
      <p>{employee.user.firstname} </p>
      <p>{employee.user.lastname} </p>
      <p>{employee.user.email} </p>
      <Link href={`/employees/${employee._id}/edit`}>
        <button>Edit details</button>
      </Link>
    </div>
  );
}

export async function generateStaticParams() {
  const employeesData: Promise<Employee[]> = getAllEmployees();
  const employees = await employeesData;

  return employees.map((employee) => ({
    employeeId: employee._id.toString(),
  }));
}
