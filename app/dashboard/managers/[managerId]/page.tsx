import type { Metadata } from "next";
import { getManager } from "@/lib/actions";
// import { notFound } from "next/navigation";
import Profile from "@/components/Profile";

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

    // console.log(manager.meetings);

    if (!manager?.employee.user.username) {
      throw new Error("Manager not found");
    }

    return <Profile manager={manager} />;
  } catch (error) {
    console.error("Error fetching manager data:", error);
  }
}
