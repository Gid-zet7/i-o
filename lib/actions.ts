// ---------------Users----------------------
export const getAllUsers = async () => {
  const users = await fetch("http://localhost:3000/api/users", {
    next: { revalidate: 10 },
  });

  if (!users.ok) throw new Error("Failed to fetch users");

  return users.json();
};

export const getUser = async (userId: string) => {
  const user = await fetch(`http://localhost:3000/api/users/${userId}`, {
    next: { revalidate: 10 },
  });

  if (!user.ok) return undefined;

  return user.json();
};

// ---------------Employees----------------------
export const getAllEmployees = async () => {
  const employees = await fetch("http://localhost:3000/api/employees", {
    next: { revalidate: 10 },
  });

  if (!employees.ok) throw new Error("Failed to fetch employees");

  return employees.json();
};

export const getEmployee = async (employeeId: string) => {
  const employee = await fetch(
    `http://localhost:3000/api/employees/${employeeId}`,
    {
      next: { revalidate: 10 },
    }
  );

  if (!employee.ok) return undefined;

  return employee.json();
};

// ---------------Managers----------------------
export const getAllManagers = async () => {
  const managers = await fetch("http://localhost:3000/api/managers", {
    next: { revalidate: 10 },
  });

  if (!managers.ok) throw new Error("Failed to fetch managers");

  return managers.json();
};

export const getManger = async (managerId: string) => {
  const manager = await fetch(
    `http://localhost:3000/api/managers/${managerId}`,
    {
      next: { revalidate: 10 },
    }
  );

  if (!manager.ok) return undefined;

  return manager.json();
};

// --------------------------Department---------------------------

export const getAllDepartments = async () => {
  const departments = await fetch("http://localhost:3000/api/departments", {
    next: { revalidate: 10 },
  });

  if (!departments.ok) throw new Error("Failed to fetch departments");

  return departments.json();
};

export const getDepartment = async (departmentId: string) => {
  const department = await fetch(
    `http://localhost:3000/api/departments/${departmentId}`,
    {
      next: { revalidate: 10 },
    }
  );

  if (!department.ok) return undefined;

  return department.json();
};

// -----------------------------Forms----------------------
export const getAllForms = async () => {
  const forms = await fetch("http://localhost:3000/api/appraisal-form", {
    next: { revalidate: 30 },
  });

  if (!forms.ok) throw new Error("Failed to fetch forms");

  return forms.json();
};
