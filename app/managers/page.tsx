import type { Metadata } from "next";
import { getAllManagers } from "@/lib/actions";
import ManagerCard from "@/components/ManagerCard";

export const metadata: Metadata = {
  title: "Managers",
};

export default async function ManagersPage() {
  const managersData: Promise<Manager[]> = getAllManagers();

  const managers = await managersData;

  managers.map((manager) =>
    manager.team.map((teamate) => {
      console.log(teamate.department);
    })
  );

  const content = (
    <>
      <section className="px-10">
        <h1 className="text-5xl font-extrabold grid place-content-center mt-5 ">
          Managers
        </h1>
        <div className="flex flex-wrap gap-8 mt-10">
          {managers?.length ? (
            managers.map((manager) => {
              return (
                <ManagerCard
                  id={manager._id}
                  username={manager.employee.user.username}
                  firstname={manager.employee.user.firstname}
                  lastname={manager.employee.user.lastname}
                  position={manager.employee.position}
                  image={manager.employee.user.avatarUrl}
                />
              );
            })
          ) : (
            <h1>No Managers found</h1>
          )}
        </div>
      </section>
    </>
  );

  return content;
}
