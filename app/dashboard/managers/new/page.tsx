import NewManagerForm from "@/components/NewManagerForm";
import { getAllEmployees } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function NewManager() {
  const employeesData: Promise<Employee[]> = getAllEmployees();
  const employees: Employee[] = await employeesData;

  if (!employees) return notFound();
  return <NewManagerForm employees={employees} />;
}
