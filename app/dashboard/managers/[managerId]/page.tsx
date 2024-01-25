import type { Metadata } from "next";
import { getManager } from "@/lib/actions";
import Image from "next/image";
// import { notFound } from "next/navigation";
import Link from "next/link";
import { IconButton, Paper } from "@mui/material";
import { Description, Edit } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Project from "@/models/projectModel";
import Details from "@/components/Details";
import ProjectsCard from "@/components/ProjectsCard";
import { title } from "process";
import TeamCard from "@/components/TeamCard";

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

    // console.log(manager.employee);

    if (!manager?.employee.user.username) {
      throw new Error("Manager not found");
    }

    return (
      <section className="flex max-w-7xl mx-auto p-3">
        <div className="grid gap-5 sm:grid-rows-3 sm:grid-cols-3 sm:gap-8 p-2">
          <div className="flex-1">
            <h1 className="mb-10 text-2xl font-semibold">Manager Profile</h1>
            {manager?.employee.user?.avatarUrl ? (
              <Image
                src={manager.employee.user.avatarUrl}
                alt="manager Image"
                width={350}
                height={200}
                className="rounded-3xl mb-12 w-auto h-auto"
                key={manager._id}
                priority
              />
            ) : (
              <Image
                src="/undraw_male_avatar_g98d.svg"
                alt="manager Image"
                width={350}
                height={200}
                className="rounded-3xl mb-12 w-auto h-auto"
                key={manager._id}
                priority
              />
            )}
            <h1 className="text-2xl mb-3">Details</h1>
            <Details
              id={manager._id}
              username={manager.employee.user.username}
              firstname={manager.employee.firstname}
              lastname={manager.employee.lastname}
              email={manager.employee.user.email}
              department={manager.employee.department.name}
              position={manager.employee.position}
            />

            <Link href={`/dashboard/managers/${manager._id}/edit`}>
              <Typography fontSize={"h6"} color={"lightslategrey"}>
                Update Manager
              </Typography>
              <IconButton aria-label="edit">
                <Edit color="secondary" />
              </IconButton>
            </Link>
          </div>
          <div className="flex-1 p-3">
            <div>
              <h1 className="text-2xl font-semibold mb-8">Team</h1>
              <div className="flex flex-col gap-3">
                {manager.team.map((teammate) => {
                  return (
                    <TeamCard
                      id={teammate._id}
                      avartar={teammate.user.avatarUrl}
                      username={teammate.user.username}
                    />
                    // <li
                    //   key={teammate.user.username}
                    //   className="list-none details "
                    // >
                    //   {teammate.user.avatarUrl ? (
                    //     <div
                    //       // key={teammate.user.username}
                    //       className="flex gap-4"
                    //     >
                    //       <Image
                    //         src={teammate.user.avatarUrl}
                    //         width={50}
                    //         height={90}
                    //         alt="teammate image"
                    //         className="rounded-full "
                    //       />
                    //       <Link
                    //         href={`http://localhost:3000/dashboard/employees/${teammate._id}`}
                    //       >
                    //         <p className="blue_gradient text-sm md:text-xl">
                    //           {teammate.user.username}
                    //         </p>
                    //       </Link>
                    //     </div>
                    //   ) : (
                    //     <div
                    //       // key={teammate.user.username}
                    //       className="flex gap-4"
                    //     >
                    //       <Image
                    //         src="/undraw_male_avatar_g98d.svg"
                    //         width={50}
                    //         height={90}
                    //         alt="teammate image"
                    //         className="rounded-full "
                    //       />
                    //       <Link
                    //         href={`http://localhost:3000/dasboard/employees/${teammate._id}`}
                    //       >
                    //         <p className="blue_gradient">
                    //           {teammate.user.username}
                    //         </p>
                    //       </Link>
                    //     </div>
                    //   )}
                    // </li>
                  );
                })}{" "}
              </div>
            </div>
          </div>
          <div className="flex-1 p-3">
            <h1 className="text-2xl font-semibold mb-8">Projects</h1>

            {manager.projects.map((project, i) => {
              return (
                <ProjectsCard
                  id={i}
                  title={project.title}
                  description={project.description}
                  tasks={project.tasks}
                />
                // <div key={project.title}>
                //   <h1>
                //     Project Title: {i + 1}. {project.title}{" "}
                //   </h1>

                //   <h1>Project description</h1>
                //   <p>{project.description} </p>
                //   <div key={i}>
                //     <h1>Tasks</h1>
                //     {project.tasks.map((task, j) => {
                //       return (
                //         <>
                //           <div key={j}>
                //             <p>
                //               {j + 1}. {task.description}{" "}
                //             </p>
                //           </div>
                //         </>
                //       );
                //     })}
                //   </div>
                // </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching manager data:", error);
  }
}
