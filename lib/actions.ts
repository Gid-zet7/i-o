import { getServerSession } from "next-auth";
import { authOptions } from "./session";

// ---------------Users----------------------
export const getAllUsers = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  const users = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!users.ok) throw new Error("Failed to fetch users");

  return users.json();
};

export const getUser = async (userId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  const user = await fetch(`http://localhost:3000/api/users/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!user.ok) return undefined;

  return user.json();
};

// ---------------Employees----------------------
export const getAllEmployees = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  const employees = await fetch("http://localhost:3000/api/employees", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!employees.ok) throw new Error("Failed to fetch employees");

  return employees.json();
};

export const getEmployee = async (employeeId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  const employee = await fetch(
    `http://localhost:3000/api/employees/${employeeId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );

  if (!employee.ok) return undefined;

  return employee.json();
};

// ---------------Managers----------------------
export const getAllManagers = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  const managers = await fetch("http://localhost:3000/api/managers", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!managers.ok) throw new Error("Failed to fetch managers");

  return managers.json();
};

export const getManager = async (managerId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  const manager = await fetch(
    `http://localhost:3000/api/managers/${managerId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );

  if (!manager.ok) return undefined;

  return manager.json();
};

// --------------------------Department---------------------------

export const getAllDepartments = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  const departments = await fetch("http://localhost:3000/api/departments", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!departments.ok) throw new Error("Failed to fetch departments");

  return departments.json();
};

export const getDepartment = async (departmentId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  const department = await fetch(
    `http://localhost:3000/api/departments/${departmentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );

  if (!department.ok) return undefined;

  return department.json();
};

// -----------------------------Forms----------------------
export const getAllForms = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  const forms = await fetch("http://localhost:3000/api/appraisal-form", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!forms.ok) throw new Error("Failed to fetch forms");

  return forms.json();
};
