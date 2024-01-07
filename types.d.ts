type User = {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
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
  username: string;
  firstname: string;
  lastname: string;
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

type Performance = {
  _id: string;
  employee: Employee;
  date: Date;
  feedback: string;
  ratings: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

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
