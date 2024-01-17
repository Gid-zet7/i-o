import type { Metadata } from "next";
import { getAllEmployees } from "@/lib/actions";
import Card from "@/components/Card";
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
      <section className="px-10 ">
        <h1 className="text-5xl font-extrabold grid place-content-center mt-5 ">
          Employees
        </h1>
        <div className="flex flex-wrap gap-8 mt-10 max-w-5xl mx-auto p-3">
          {employees.map((employee) => {
            return (
              <Card
                id={employee._id}
                // username={employee.user.username}
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
