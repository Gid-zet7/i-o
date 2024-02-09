import type { Metadata } from "next";
import { getUser } from "@/lib/actions";
import { notFound } from "next/navigation";
import EditUserForm from "@/components/User/EditUserForm";

type Params = {
  params: {
    userId: string;
  };
};

export const generateMetadata = async ({
  params: { userId },
}: Params): Promise<Metadata> => {
  const userData: Promise<User> = getUser(userId);
  const user: User = await userData;

  if (!user?.username) {
    return {
      title: "User not found",
    };
  }

  return {
    title: `${user?.username} details`,
    description: `This page displays ${user?.username} details`,
  };
};

export default async function EditEmployeePage({ params: { userId } }: Params) {
  const user = await getUser(userId);

  console.log(user);

  if (!user?.username) return notFound();

  return <EditUserForm user={user} />;
}
