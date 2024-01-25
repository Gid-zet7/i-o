import { getServerSession } from "next-auth";
import { authOptions } from "./session";

const apiUrl = process.env.API_URL || "http://localhost:3000/api";

// ---------------Users----------------------
export const getAllUsers = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);
  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/users`;
  const result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch users. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const getUser = async (userId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/users/${userId}`;

  const result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch user. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

// ---------------Employees----------------------
export const getAllEmployees = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/employees`;

  const result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch employees. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const getEmployee = async (employeeId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/employees/${employeeId}`;

  let result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch employee. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const createEmployee = async (
  session: any,
  username: string,
  firstname: string,
  lastname: string,
  department: string,
  position: string,
  // skills: string
  skills: { skill: string }[],
  startDate: string
) => {
  // const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/employees/new`;

  let res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
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

export const updateEmployee = async (
  session: any,
  id: string,
  firstname: string,
  lastname: string,
  department: string,
  position: string,
  skills: {}[],
  performance: Performance[],
  startDate: string
) => {
  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }
  const endpoint = `${apiUrl}/employees/update`;
  let res = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      firstname,
      lastname,
      department,
      position,
      skills,
      performance,
      startDate,
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

export const deleteEmployee = async (session: any, id: string) => {
  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }
  const endpoint = `${apiUrl}/employees/delete`;

  let res = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

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

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/managers`;

  let result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  // console.log(res);

  if (!result.ok) {
    const errorMessage = `Failed to fetch managers. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const getManager = async (managerId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/managers/${managerId}`;
  let result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch manager. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const createManager = async (
  session: any,
  employee: string,
  team: string[],
  projects: any
) => {
  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/managers/new`;
  let res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      employee,
      team: team,
      projects,
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

export const updateManager = async (
  session: any,
  id: string,
  employee: string,
  team: string[],
  projects: string[],
  meeting?: Meeting[]
) => {
  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }
  const endpoint = `${apiUrl}/managers/update`;
  let res = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      employee,
      team,
      projects,
      meeting,
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

export const deleteManager = async (id: string) => {
  const endpoint = `${apiUrl}/managers/demote`;

  let res = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

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

// --------------------------Projects---------------------------
export const getAllProjects = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/projects`;

  let result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  // console.log(res);

  if (!result.ok) {
    const errorMessage = `Failed to fetch projects. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const getProject = async (projectId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/projects/${projectId}`;
  let result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch project. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const createProject = async (
  title: string,
  description: string,
  startDate: string,
  tasks: Task[]
) => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/projects/new`;
  let res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      startDate,
      tasks,
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

export const deleteProject = async (id: string) => {
  const endpoint = `${apiUrl}/projects/delete`;

  let res = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

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

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/departments`;
  let result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch departments. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const getDepartment = async (departmentId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/departments/${departmentId}`;
  let result = await fetch(
    `http://localhost:3000/api/departments/${departmentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );

  if (!result.ok) {
    const errorMessage = `Failed to fetch departments. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

// -----------------------------Forms----------------------
export const getAllForms = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/appraisal-form`;
  let result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch departments. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};
