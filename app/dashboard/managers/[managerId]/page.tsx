import type { Metadata } from "next";
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

    if (!manager?.employee.user.username) {
      throw new Error("Manager not found");
    }

    return (
      <section key={manager._id} className="flex max-w-7xl mx-auto p-3">
        <div className="grid gap-5 sm:grid-rows-3 sm:grid-cols-3 sm:gap-8 p-2">
          <div className="flex-1">
            <h1 className="mb-10 text-2xl font-semibold">Manager Profile</h1>
            {manager?.employee.user?.avatarUrl ? (
              <Image
                src={manager.employee.user.avatarUrl}
                alt="manager Image"
                width={350}
                height={200}
                className="rounded-3xl mb-12"
              />
            ) : (
              <Image
                src="/undraw_male_avatar_g98d.svg"
                alt="manager Image"
                width={350}
                height={200}
                className="rounded-3xl mb-12"
              />
            )}

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">Employee Details</h1>
              <div className="details">
                <p>First name</p>
                <p className="font-semibold blue_gradient ">
                  {manager.employee.firstname}
                </p>
              </div>
              <div className="details">
                <p>Last name</p>
                <p className="font-semibold blue_gradient ">
                  {manager.employee.lastname}
                </p>
              </div>
              <div className="details">
                <p>Email</p>
                <p className="font-semibold blue_gradient ">
                  {manager.employee.user.email}
                </p>
              </div>
              <div className="details">
                <p>Department</p>
                <p className="font-semibold blue_gradient ">
                  {manager.employee.department.name}
                </p>
              </div>
              <div className="details">
                <p>Position</p>
                <p className="font-semibold blue_gradient ">
                  {manager.employee.position}
                </p>
              </div>
            </div>

            <Link href={`/dashboard/managers/${manager._id}/edit`}>
              <button>Edit details</button>
            </Link>
          </div>
          <div className="flex-1 p-3">
            <h1 className="text-2xl font-semibold mb-8">Skills</h1>

            <p className="mb-8">{manager.employee.skills}</p>

            <div>
              <h1 className="text-2xl font-semibold mb-8">Team</h1>
              <div className="flex flex-col gap-3">
                {manager.team.map((teammate) => {
                  return (
                    <li key={teammate._id} className="list-none details ">
                      {teammate.user.avatarUrl ? (
                        <div key={teammate._id} className="flex gap-4">
                          <Image
                            src={teammate.user.avatarUrl}
                            width={50}
                            height={90}
                            alt="teammate image"
                            className="rounded-full "
                          />
                          <Link
                            href={`http://localhost:3000/dashboard/employees/${teammate._id}`}
                          >
                            <p className="blue_gradient text-sm md:text-xl">
                              {teammate.user.username}
                            </p>
                          </Link>
                        </div>
                      ) : (
                        <div className="flex gap-4">
                          <Image
                            src="/undraw_male_avatar_g98d.svg"
                            width={50}
                            height={90}
                            alt="teammate image"
                            className="rounded-full "
                          />
                          <Link
                            href={`http://localhost:3000/dasboard/employees/${teammate._id}`}
                          >
                            <p className="blue_gradient">
                              {teammate.user.username}
                            </p>
                          </Link>
                        </div>
                      )}
                    </li>
                  );
                })}{" "}
              </div>
            </div>
          </div>
          <div className="flex-1 p-3">
            <h1 className="text-2xl font-semibold mb-8">Performance</h1>

            <p className="mb-8">
              {manager?.employee.performance.length
                ? manager?.employee.performance.map((perf) => {
                    return <li> {perf.feedback}</li>;
                  })
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
