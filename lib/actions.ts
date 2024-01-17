import { getServerSession } from "next-auth";
import { authOptions } from "./session";
import { useSession } from "next-auth/react";

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
  username: string,
  firstname: string,
  lastname: string,
  department: string,
  position: string,
  skills: string,
  startDate: string
) => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/employees`;

  let res = await fetch(endpoint, {
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

export const updateEmployee = async (
  id: string,
  firstname: string,
  lastname: string,
  department: string,
  position: string,
  skills: string[],
  performance: Performance[],
  startDate: string
) => {
  // const session: SessionInterface | null = await getServerSession(authOptions);

  const endpoint = `${apiUrl}/employees/update`;
  let res = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      // Authorization: `Bearer ${session?.user?.accessToken}`,
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

export const deleteEmployee = async (id: string) => {
  const endpoint = `${apiUrl}/employees/delete`;

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
  employee: string,
  team: string[],
  projects: string
) => {
  const session: SessionInterface | null = await getServerSession(authOptions);

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
