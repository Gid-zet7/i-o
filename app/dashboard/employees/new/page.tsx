import NewEmployeeForm from "@/components/EmployeeAndManager/NewEmployeeForm";
import { getAllDepartments, getAllUsers } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function AddEmployee() {
  const usersData: Promise<User[]> = getAllUsers();
  const users: User[] = await usersData;

  const departmentsData: Promise<Department[]> = getAllDepartments();
  const departments: Department[] = await departmentsData;

  if (!users) return notFound();
  if (!departments) return notFound();
  return <NewEmployeeForm departments={departments} users={users} />;
}
