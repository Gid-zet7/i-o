import type { Metadata } from "next";
import { getEmployee } from "@/lib/actions";
import Profile from "@/components/EmployeeAndManager/Profile";
import { formatDate } from "@/helper/Util";

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

  if (!employee?.user?.username) {
    throw new Error("Employee not found");
  }

  const formattedDate = formatDate(employee.startDate);

  return (
    <>
      <Profile employee={employee} formattedDate={formattedDate} />
    </>
  );
}
