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
        <div className="flex-1">
          <Image
            src={employee.user.avatarUrl}
            alt="employee Image"
            width={500}
            height={200}
            className="rounded-3xl"
          />
          {/* <p>{employee?.user?.username} </p>
          <p>{employee.user.firstname} </p>
          <p>{employee.user.lastname} </p>
          <p>{employee.user.email} </p> */}
          <Link href={`/employees/${employee._id}/edit`}>
            <button>Edit details</button>
          </Link>
        </div>
        <div className="flex-1 p-3">
          <h1 className="text-2xl">{employee.user.username}</h1>
          <hr />
          <h3>First name: {employee.user.firstname}</h3>
          <h3>Last name: {employee.user.lastname}</h3>
          <h3>Email: {employee.user.email}</h3>
          <h3>Department: {employee.department.name}</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            ea adipisci deserunt iste eos eaque est rerum voluptatem dolores
            sunt explicabo, molestias amet corporis nam doloremque vitae a
            inventore aliquam? Ex labore ipsa, nesciunt ipsum quasi alias fuga
            aliquid fugit? Laboriosam officiis quia inventore ducimus a dicta
            saepe. Ea, similique! Voluptatibus accusamus veritatis eos explicabo
            qui accusantium unde, numquam ex amet eum cum in quod dolores sit
            reiciendis doloremque! Assumenda perferendis doloribus ad
            doloremque. Consequuntur necessitatibus distinctio omnis.
            Perferendis illum dolores, molestiae debitis quod consectetur
            dolorum vero quidem obcaecati nihil saepe ipsum mollitia numquam
            eveniet repudiandae laborum explicabo provident tenetur cupiditate
            dicta amet laboriosam tempora expedita? Quis non in repellat quia
            quo obcaecati cupiditate amet similique accusantium nam? Aut
            provident hic, velit fugiat libero temporibus dolore, amet, est unde
            dolorum deleniti nemo numquam molestiae blanditiis voluptatem. Natus
            sapiente delectus a, provident libero eligendi at omnis et aperiam,
            sed, totam quod perspiciatis quidem animi necessitatibus. Dolores
            in, corporis tempore dicta architecto, voluptatibus ratione omnis
            autem cum reprehenderit porro laboriosam consectetur saepe dolor,
            aliquid dolore? Molestias in provident ratione sapiente fugiat
            deleniti esse praesentium dolore enim perspiciatis voluptatum,
            impedit nihil numquam culpa quaerat soluta dolor ducimus commodi
            quam. Nihil fugit at libero.
          </p>
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
