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
  skills: { skill: string }[];
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
  projects: Project[];
  meetings: Meeting[];
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
  data: { question: string; response: string }[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

type Forms = {
  employeeName: string;
  position: string;
  department: string;
  dateOfReview: Date;
  typeOfReview: string;
  questions: {
    questionText: string;
    questionType: string;
    options: { optionText: string }[];
    open: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Task = {
  description: string;
  dueDate: Date;
  completed: Boolean;
};

type Project = {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Questions = {
  questionText: string;
  questionType: string;
  options: {
    optionText: string;
    optionId?: string;
  }[];
  type: boolean;
  open: boolean;
  required: boolean;
}[];

interface SessionInterface extends Session {
  user: User & {
    _doc: {
      _id: string;
      username: string;
      email: string;
      avatarUrl: string;
      roles: string[];
      active: boolean;
    };
    accessToken: string;
  };
}
