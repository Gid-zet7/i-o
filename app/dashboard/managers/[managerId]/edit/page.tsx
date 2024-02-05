import type { Metadata } from "next";
import { getAllMeetings, getManager } from "@/lib/actions";
import { notFound } from "next/navigation";
import EditManagerForm from "@/components/EmployeeAndManager/EditManagerForm";
import { getAllEmployees, getAllProjects } from "@/lib/actions";

type Params = {
  params: {
    managerId: string;
  };
};

export const generateMetadata = async ({
  params: { managerId },
}: Params): Promise<Metadata> => {
  try {
    const managerData: Promise<Manager> = getManager(managerId);
    const manager: Manager = await managerData;

    if (!manager?.employee.user.username) {
      return {
        title: "Employee not found",
      };
    }

    return {
      title: `${manager?.employee.user.username} details`,
      description: `This page displays ${manager?.employee.user.username} details`,
    };
  } catch (error) {
    console.error("Error fetching manager data:", error);
    return {
      title: "Error",
    };
  }
};

export default async function EditManagerPage({
  params: { managerId },
}: Params) {
  try {
    const [manager, employees, projects, meetings] = await Promise.all([
      getManager(managerId),
      getAllEmployees(),
      getAllProjects(),
      getAllMeetings(),
    ]);

    console.log(meetings);

    if (
      !manager?.employee.user?.username ||
      !employees?.length ||
      !projects?.length
    ) {
      return notFound();
    }

    return (
      <EditManagerForm
        managerId={manager._id}
        manager={manager}
        employees={employees}
        projects={projects}
        meetings={meetings}
      />
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return notFound();
  }
}
