// import NextAuth from "next-auth";

type User = {
  _id: string;
  username: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  roles: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Employee = {
  _id: string;
  user: User;
  firstname: string;
  lastname: string;
  department: Department;
  position: string;
  skills: string[];
  performance: Performance[];
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Manager = {
  _id: string;
  employee: Employee;
  team: Employee[];
  projects: string[];
  meetings: Meeting;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Department = {
  _id: string;
  name: string;
  head_of_department: Manager;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Meeting = {
  _id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  participants: Employee[];
  agenda: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

interface Performance {
  _id: string;
  employee: Employee;
  date: Date;
  feedback: string;
  ratings: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

type Forms = {
  _id: string;
  form_title: string;
  form_desc: string;
  questions: {
    questionText: string;
    questionType: string;
    options: { opyionText: string }[];
    open: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

interface SessionInterface extends Session {
  user: User & {
    _doc: {
      id: string;
      username: string;
      email: string;
      avatarUrl: string;
    };
    accessToken: string;
  };
}
