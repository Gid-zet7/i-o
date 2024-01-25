import type { Metadata } from "next";
import { getEmployee } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Details from "@/components/Details";
import SkillsCard from "@/components/SkillsCard";
import Paper from "@mui/material/Paper";

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
        {/* <Navbar /> */}
        <section key={employee._id} className="flex max-w-7xl mx-auto p-3">
          <div className="grid gap-5 sm:grid-rows-3 sm:grid-cols-3 sm:gap-8 p-2">
            <div className="flex-1">
              <h1 className="mb-10 text-2xl font-semibold">Employee Profile</h1>
              {employee?.user?.avatarUrl ? (
                <Image
                  src={employee.user.avatarUrl}
                  alt="employee Image"
                  width={350}
                  height={200}
                  className="rounded-3xl mb-12"
                />
              ) : (
                <Image
                  src="/undraw_male_avatar_g98d.svg"
                  alt="employee Image"
                  width={350}
                  height={200}
                  className="rounded-3xl mb-12"
                />
              )}
              <h1 className="text-2xl mb-3">Details</h1>
              <Details
                id={employee._id}
                username={employee.user.username}
                firstname={employee.firstname}
                lastname={employee.lastname}
                email={employee.user.email}
                department={employee.department.name}
                position={employee.position}
                startDate={formattedDate}
              />

              <Tooltip title="edit employee details">
                <Link href={`/dashboard/employees/${employee._id}/edit`}>
                  <IconButton>
                    <Edit color="secondary" />
                  </IconButton>
                </Link>
              </Tooltip>
            </div>
            <Paper className="flex-1 p-3 h-min">
              <h1 className="text-2xl font-semibold mb-8">Skills</h1>
              {employee.skills.map((skill, i) => {
                return (
                  <Typography fontSize={"h6"} className="blue_gradient">
                    {skill.skill}
                  </Typography>
                );
              })}
            </Paper>
            <div className="flex-1 p-3">
              <h1 className="text-2xl font-semibold mb-8">Performance</h1>

              <p className="mb-8">
                {employee?.performance.length
                  ? employee.performance.map((perf) => {
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
      </>
    );
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
}
