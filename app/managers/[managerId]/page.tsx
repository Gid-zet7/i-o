import type { Metadata } from "next";
import { getAllManagers } from "@/lib/actions";
import { getManager } from "@/lib/actions";
import Image from "next/image";
// import { notFound } from "next/navigation";
import Link from "next/link";

type Params = {
  params: {
    managerId: string;
  };
};

export const generateMetadata = async ({
  params: { managerId },
}: Params): Promise<Metadata> => {
  const managerData: Promise<Manager> = getManager(managerId);
  const manager: Manager = await managerData;

  if (!manager?.employee.user.username) {
    return {
      title: "Manager not found",
    };
  }

  return {
    title: `${manager?.employee.user.username} details`,
    description: `This page displays ${manager?.employee.user.username} details`,
  };
};

export default async function ManagerPage({ params: { managerId } }: Params) {
  try {
    const managerData: Promise<Manager> = getManager(managerId);
    const manager: Manager = await managerData;

    // console.log(manager.teamusernames);

    if (!manager?.employee.user.username) {
      throw new Error("Manager not found");
    }

    return (
      <section key={manager._id} className="flex max-w-7xl mx-auto p-3">
        <div className="grid gap-5 sm:grid-rows-3 sm:grid-cols-3 sm:gap-8 p-2">
          <div className="flex-1">
            <h1 className="mb-10 text-2xl font-semibold">Manager Profile</h1>
            <Image
              src={manager.employee.user.avatarUrl}
              alt="manager Image"
              width={350}
              height={200}
              className="rounded-3xl mb-12"
            />

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">Employee Details</h1>
              <div className="details">
                <p>First name</p>
                <p className="font-semibold text-black ">
                  {manager.employee.user.firstname}
                </p>
              </div>
              <div className="details">
                <p>Last name</p>
                <p className="font-semibold text-black ">
                  {manager.employee.user.lastname}
                </p>
              </div>
              <div className="details">
                <p>Email</p>
                <p className="font-semibold text-black ">
                  {manager.employee.user.email}
                </p>
              </div>
              <div className="details">
                <p>Department</p>
                <p className="font-semibold text-black ">
                  {manager.employee.department.name}
                </p>
              </div>
              <div className="details">
                <p>Position</p>
                <p className="font-semibold text-black ">
                  {manager.employee.position}
                </p>
              </div>
            </div>

            <Link href={`/managers/${manager._id}/edit`}>
              <button>Edit details</button>
            </Link>
          </div>
          <div className="flex-1 p-3">
            <h1 className="text-2xl font-semibold mb-8">Skills</h1>

            <p className="mb-8">{manager.employee.skills}</p>

            <div>
              <h1 className="text-2xl font-semibold mb-8">Team</h1>
              <div>
                <p>
                  {manager.team.map((teammate) => {
                    return <li>{teammate.user.username} </li>;
                  })}{" "}
                </p>
                {/* <ul>
                  {manager.teamusernames.map((teamusername) => {
                    return <li>{teamusername} </li>;
                  })}
                </ul> */}
              </div>
            </div>
          </div>
          <div className="flex-1 p-3">
            <h1 className="text-2xl font-semibold mb-8">Performance</h1>

            <p className="mb-8">
              {manager?.employee.performance.length
                ? manager?.employee.performance
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
    console.error("Error fetching manager data:", error);
  }
}

export async function generateStaticParams() {
  const managersData: Promise<Manager[]> = getAllManagers();
  const managers = await managersData;

  return managers.map((manager) => ({
    params: {
      managerId: manager._id.toString(),
    },
  }));
}
