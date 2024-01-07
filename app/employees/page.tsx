import type { Metadata } from "next";
import { getAllEmployees } from "@/lib/actions";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "Employees",
};

export default async function EmployeesPage() {
  const employeesData: Promise<Employee[]> = getAllEmployees();

  const employees = await employeesData;

  const content = (
    <>
      <section className="px-10">
        <h1 className="text-5xl font-extrabold grid place-content-center mt-5 ">
          Employees
        </h1>
        <div className="flex flex-wrap gap-8 mt-10">
          {employees.map((employee) => {
            return (
              // <div key={employee._id}>
              //   <p>{employee.user.username} </p>
              //   <p>{employee.position} </p>
              //   <p>{employee.department} </p>
              //   {/* <p>{employee.skills} </p> */}
              // </div>
              // <Link href={`http://localhost:3000/employees/${employee._id}`}>
              <Card
                id={employee._id}
                // username={employee.user.username}
                firstname={employee.user.firstname}
                lastname={employee.user.lastname}
                position={employee.position}
                image={employee.user.avatarUrl}
              />
              // </Link>
            );
          })}
        </div>
      </section>
    </>
  );

  return content;
}
