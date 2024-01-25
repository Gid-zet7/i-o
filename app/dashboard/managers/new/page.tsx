import NewManagerForm from "@/components/NewManagerForm";
import { getAllEmployees, getAllProjects } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function NewManager() {
  const employeesData: Promise<Employee[]> = getAllEmployees();
  const employees: Employee[] = await employeesData;

  const projectsData: Promise<Project[]> = getAllProjects();
  const projects: Project[] = await projectsData;

  if (!employees) return notFound();
  if (!projects) return notFound();
  return <NewManagerForm employees={employees} projects={projects} />;
}
