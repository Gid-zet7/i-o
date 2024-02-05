import type { Metadata } from "next";
import { getEmployee } from "@/lib/actions";
import Profile from "@/components/EmployeeAndManager/Profile";

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

  console.log(employee.performance);

  let date = new Date(employee.startDate);
  let fullDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).toString();

  const day = fullDate.split(" ")[0];
  const month = fullDate.split(" ")[1];
  const year = fullDate.split(" ")[3];

  const formattedDate = `${day} ${month} ${year}`;

  return (
    <>
      <Profile employee={employee} formattedDate={formattedDate} />
    </>
  );
}
