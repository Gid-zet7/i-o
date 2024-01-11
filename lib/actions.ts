"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./session";

// ---------------Users----------------------
export const getAllUsers = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  const res = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
};

export const getUser = async (userId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!res.ok) return undefined;

  return res.json();
};

// ---------------Employees----------------------
export const getAllEmployees = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  let res = await fetch("http://localhost:3000/api/employees", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch employees");

  return res.json();
};

export const getEmployee = async (employeeId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  let res = await fetch(`http://localhost:3000/api/employees/${employeeId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!res.ok) return undefined;

  return res.json();
};

export const createEmployee = async (
  username: string,
  firstname: string,
  lastname: string,
  department: string,
  position: string,
  skills: string,
  startDate: string
) => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  let res = await fetch(`http://localhost:3000/api/employees/new`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      firstname,
      lastname,
      department,
      position,
      skills,
      startDate,
    }),
  });

  // console.log("Response status:", res.status);
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    try {
      const jsonResponse = await res.json();
      console.log("Json response:", jsonResponse);
      return jsonResponse;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return undefined;
    }
  } else {
    // If the content type is not JSON, handle it differently
    const responseText = await res.text();
    console.log("Response body:", responseText);

    if (!res.ok) return undefined;

    // Handle the non-JSON response accordingly
    return responseText;
  }
};

// ---------------Managers----------------------
export const getAllManagers = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  let res = await fetch("http://localhost:3000/api/managers", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  // console.log(res);

  if (!res.ok) throw new Error("Failed to fetch managers");

  return res.json();
};

export const getManager = async (managerId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  let res = await fetch(`http://localhost:3000/api/managers/${managerId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!res.ok) return undefined;

  return res.json();
};

export const createManager = async (
  employee: string,
  team: string[],
  projects: string
) => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  let res = await fetch(`http://localhost:3000/api/managers/new`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      employee,
      team: team,
      projects: [projects],
    }),
  });

  console.log("Response status:", res.status);
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    try {
      const jsonResponse = await res.json();
      console.log("Json response:", jsonResponse);
      return jsonResponse;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return undefined;
    }
  } else {
    // If the content type is not JSON, handle it differently
    const responseText = await res.text();
    console.log("Response body:", responseText);

    if (!res.ok) return undefined;

    // Handle the non-JSON response accordingly
    return responseText;
  }
};

// --------------------------Department---------------------------

export const getAllDepartments = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  let res = await fetch("http://localhost:3000/api/departments", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch departments");

  return res.json();
};

export const getDepartment = async (departmentId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  let res = await fetch(
    `http://localhost:3000/api/departments/${departmentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );

  if (!res.ok) return undefined;

  return res.json();
};

// -----------------------------Forms----------------------
export const getAllForms = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  let res = await fetch("http://localhost:3000/api/appraisal-form", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch forms");

  return res.json();
};
