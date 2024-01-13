import NewEmployeeForm from "@/components/NewEmployeeForm";
import { getAllDepartments } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function AddEmployee() {
  const departmentsData: Promise<Department> = getAllDepartments();
  const departments: Department = await departmentsData;

  if (!departments) return notFound();
  return <NewEmployeeForm departments={departments} />;
}
