import type { Metadata } from "next";
import { getAllManagers } from "@/lib/actions";
import ManagerCard from "@/components/ManagerCard";
import SideMenu from "@/stories/SideMenu/SideMenu";

export const metadata: Metadata = {
  title: "Managers",
};

export default async function ManagersPage() {
  const managersData: Promise<Manager[]> = getAllManagers();

  const managers = await managersData;

  const content = (
    <>
      <SideMenu />
      <section className="mx-auto max-w-6xl p-3 md:ml-64">
        <h1 className="text-5xl font-extrabold grid place-content-center mt-5 ">
          Managers
        </h1>
        <div className="flex flex-wrap gap-8 mt-10 max-w-5xl mx-auto p-3">
          {managers?.length ? (
            managers.map((manager) => {
              return (
                <ManagerCard
                  key={manager._id}
                  id={manager._id}
                  username={manager.employee.user.username}
                  firstname={manager.employee.firstname}
                  lastname={manager.employee.lastname}
                  position={manager.employee.position}
                  image={manager.employee.user.avatarUrl}
                  department={manager.employee.department.name}
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
