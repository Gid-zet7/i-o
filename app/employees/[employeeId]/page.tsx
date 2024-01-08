import type { Metadata } from "next";
import { getAllEmployees } from "@/lib/actions";
import { getEmployee } from "@/lib/actions";
import Image from "next/image";
// import { notFound } from "next/navigation";
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
  try {
    const employeeData: Promise<Employee> = getEmployee(employeeId);
    const employee: Employee = await employeeData;

    if (!employee?.user?.username) {
      throw new Error("Employee not found");
    }

    return (
      <section key={employee._id} className="flex max-w-7xl mx-auto p-3">
        <div className="grid gap-5 sm:grid-rows-3 sm:grid-cols-3 sm:gap-8 p-2">
          <div className="flex-1">
            <h1 className="mb-10 text-2xl font-semibold">Employee Profile</h1>
            <Image
              src={employee.user.avatarUrl}
              alt="employee Image"
              width={350}
              height={200}
              className="rounded-3xl mb-12"
            />

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">Employee Details</h1>
              <div className="details">
                <p>First name</p>
                <p className="font-semibold text-black ">
                  {employee.user.firstname}
                </p>
              </div>
              <div className="details">
                <p>Last name</p>
                <p className="font-semibold text-black ">
                  {employee.user.lastname}
                </p>
              </div>
              <div className="details">
                <p>Email</p>
                <p className="font-semibold text-black ">
                  {employee.user.email}
                </p>
              </div>
              <div className="details">
                <p>Department</p>
                <p className="font-semibold text-black ">
                  {employee.department.name}
                </p>
              </div>
              <div className="details">
                <p>Position</p>
                <p className="font-semibold text-black ">{employee.position}</p>
              </div>
            </div>

            <Link href={`/employees/${employee._id}/edit`}>
              <button>Edit details</button>
            </Link>
          </div>
          <div className="flex-1 p-3">
            <h1 className="text-2xl font-semibold mb-8">Skills</h1>

            <p className="mb-8">{employee.skills}</p>
          </div>
          <div className="flex-1 p-3">
            <h1 className="text-2xl font-semibold mb-8">Performance</h1>

            <p className="mb-8">
              {employee.performance.length
                ? employee.performance
                : "Performance not appraised yet"}
            </p>

            <p className="leading-7">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto ea adipisci deserunt iste eos eaque est rerum
              voluptatem dolores sunt explicabo, molestias amet corporis nam
              doloremque vitae a inventore aliquam? Ex labore ipsa, nesciunt
              ipsum quasi alias fuga aliquid fugit? Laboriosam officiis quia
              inventore ducimus a dicta saepe. Ea, similique! Voluptatibus
              quidem obcaecati nihil saepe ipsum mollitia numquam eveniet
              repudiandae laborum explicabo provident tenetur cupiditate dicta
              amet laboriosam tempora
            </p>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
}

export async function generateStaticParams() {
  const employeesData: Promise<Employee[]> = getAllEmployees();
  const employees = await employeesData;

  return employees.map((employee) => ({
    params: {
      employeeId: employee._id.toString(),
    },
  }));
}
