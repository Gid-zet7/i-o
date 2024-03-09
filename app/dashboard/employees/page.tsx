// "use client";
import type { Metadata } from "next";
import { getAllEmployees } from "@/lib/actions";
import Card from "@/components/EmployeeAndManager/Card";
import SideMenu from "@/stories/SideMenu/SideMenu";

export const metadata: Metadata = {
  title: "Employees",
};

export default async function EmployeesPage() {
  const employeesData: Promise<Employee[]> = getAllEmployees();

  const employees = await employeesData;

  const content = (
    <>
      <SideMenu />
      <section className="mx-auto max-w-6xl p-3 md:ml-64">
        <h1 className="text-3xl lg:text-5xl font-extrabold grid place-content-center mt-5 ">
          Employees
        </h1>
        <div className="flex flex-wrap justify-center gap-8 mt-10 max-w-5xl mx-auto p-3">
          {employees?.map((employee) => {
            return (
              <Card
                key={employee._id}
                id={employee._id}
                firstname={employee.firstname}
                lastname={employee.lastname}
                position={employee.position}
                image={employee.user.avatarUrl}
                department={employee.department.name}
              />
            );
          })}
        </div>
      </section>
    </>
  );

  return content;
}
