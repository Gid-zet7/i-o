import NewEmployeeForm from "@/components/EmployeeAndManager/NewEmployeeForm";
import { getAllDepartments, getAllUsers } from "@/lib/actions";

export default async function AddEmployee() {
  const usersData: Promise<User[]> = getAllUsers();
  const users: User[] = await usersData;

  const departmentsData: Promise<Department[]> = getAllDepartments();
  const departments: Department[] = await departmentsData;

  const errorMessage = `something went wrong. `;

  if (!users || !departments) throw new Error(errorMessage);
  return <NewEmployeeForm departments={departments} users={users} />;
}
