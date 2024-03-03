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

export const updateUser = async (
  session: any,
  id: string,
  username: string,
  email: string,
  avatarUrl: string,
  roles: string[],
  active: boolean,
  password?: string
) => {
  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }
  const endpoint = `${apiUrl}/users/update`;
  let res = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      username,
      email,
      password,
      avatarUrl,
      roles,
      active,
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

export const deleteUser = async (session: any, id: string) => {
  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }
  const endpoint = `${apiUrl}/users/delete`;

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

// -------------------TABLE DATA------------------
export const getData = async (session: any) => {
  // const session: SessionInterface | null = await getServerSession(authOptions);

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

export const getEmployee = async (employeeId: string): Promise<Employee> => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/employees/${employeeId}`;

  try {
    // Fetch employee data from the API
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      // If the response is not ok, throw an error with details
      const errorMessage = `Failed to fetch employee. Status: ${response.status}, ${response.statusText}`;
      throw new Error(errorMessage);
    }

    // Parse the JSON response and return the employee data
    return await response.json();
  } catch (error) {
    // Catch and handle any errors that occur during the fetch operation
    console.error("Error fetching employee data:", error);
    throw new Error("Failed to fetch employee data");
  }
};

export const createEmployee = async (
  session: any,
  username: string,
  firstname: string,
  lastname: string,
  bio: string,
  gender: string,
  contact: string,
  permanent_address: string,
  current_address: string,
  birthday: string,
  department: string,
  position: string,
  skills: { skill: string }[],
  experiences: { position: string; startDate: string; endDate: string }[],
  education: {
    school: string;
    certificate: string;
    startDate: string;
    endDate: string;
  }[],
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
      bio,
      gender,
      contact,
      permanent_address,
      current_address,
      birthday,
      department,
      position,
      skills,
      experiences,
      education,
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
  bio: string,
  gender: string,
  contact: string,
  permanent_address: string,
  current_address: string,
  birthday: string,
  department: string,
  position: string,
  skills: {}[],
  experiences: { position: string; startDate: string; endDate: string }[],
  education: {
    school: string;
    certificate: string;
    startDate: string;
    endDate: string;
  }[],
  performance: string[],
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
      bio,
      gender,
      contact,
      permanent_address,
      current_address,
      birthday,
      department,
      position,
      skills,
      experiences,
      education,
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

  if (result.status === 400) {
    return result.json;
  }

  if (!result?.ok) {
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
  meetings?: string[]
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
      meetings,
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
  const endpoint = `${apiUrl}/appraisal-form`;
  let result = await fetch(endpoint, {
    method: "GET",
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch forms. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const getForm = async (formId: string) => {
  // const session: SessionInterface | null = await getServerSession(authOptions);

  // if (!session?.user?.accessToken) {
  //   throw new Error("User not authenticated or access token missing");
  // }

  const endpoint = `${apiUrl}/appraisal-form/${formId}`;

  let result = await fetch(endpoint, {
    method: "GET",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.accessToken}`,
    // },
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch form. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const createForm = async (
  session: any,
  title: string,
  employeeName: string,
  position: string,
  department: string,
  dateOfReview: string,
  typeOfReview: string,
  questions: any
) => {
  // const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/appraisal-form/new`;

  let res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      employeeName,
      position,
      department,
      dateOfReview,
      typeOfReview,
      questions,
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

// --------------------------Meetings---------------------------
export const getAllMeetings = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/meetings`;

  const result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch meetings. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const getMeeting = async (meetingId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/meetings/${meetingId}`;

  let result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch meeting. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const createMeeting = async (
  session: any,
  title: string,
  date: Date,
  startTime: string,
  endTime: string,
  participants: string[],
  agenda: string
) => {
  // const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/meetings/new`;

  let res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      date,
      startTime,
      endTime,
      participants,
      agenda,
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

export const updateMeeting = async (
  session: any,
  id: string,
  title: string,
  date: Date,
  startTime: string,
  endTime: string,
  participants: string[],
  agenda: string
) => {
  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }
  const endpoint = `${apiUrl}/meetings/update`;
  let res = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title,
      date,
      startTime,
      endTime,
      participants,
      agenda,
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

export const deleteMeeting = async (session: any, id: string) => {
  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }
  const endpoint = `${apiUrl}/meetings/delete`;

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
// --------------------------Performances---------------------------
export const getAllPerformances = async () => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/performance`;

  const result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch performances. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const getPerformance = async (performanceId: string) => {
  const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/performance/${performanceId}`;

  let result = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!result.ok) {
    const errorMessage = `Failed to fetch performance. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }

  return result.json();
};

export const addPerformance = async (
  session: any,
  title: string,
  employee: string,
  date: Date,
  data: { question: string; response: string }[],
  feedback?: string,
  ratings?: number
) => {
  // const session: SessionInterface | null = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }

  const endpoint = `${apiUrl}/performance/new`;

  let res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      employee,
      date,
      feedback,
      ratings,
      data,
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

export const updatePerformance = async (
  session: any,
  id: string,
  employee: string,
  date: Date,
  feedback: string,
  ratings: number,
  data: string[]
) => {
  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }
  const endpoint = `${apiUrl}/performance/update`;
  let res = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      employee,
      date,
      feedback,
      ratings,
      data,
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

export const deletePerformance = async (session: any, id: string) => {
  if (!session?.user?.accessToken) {
    throw new Error("User not authenticated or access token missing");
  }
  const endpoint = `${apiUrl}/performance/delete`;

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
