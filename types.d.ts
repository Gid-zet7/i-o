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
  user: {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    avatarUrl?: string;
    roles: string[];
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
  department: string;
  position: string;
  skills: string[];
  performance: {
    _id: string;
    employee: string;
    date: Date;
    feedback: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }[];
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Manager = {
  _id: string;
  employee: {
    _id: string;
    user: string;
    department: string;
    position: string;
    skills: string[];
    performace: {
      _id: string;
      employee: string;
      date: Date;
      feedback: string;
      rating: number;
      createdAt: Date;
      updatedAt: Date;
      __v: number;
    }[];
    startDate: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
  team: {
    _id: string;
    user: string;
    department: string;
    position: string;
    skills: string[];
    performace: {
      _id: string;
      employee: string;
      date: Date;
      feedback: string;
      rating: number;
      createdAt: Date;
      updatedAt: Date;
      __v: number;
    }[];
    startDate: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }[];
  projects: string[];
  meetings: {
    _id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    participants: {
      _id: string;
      user: string;
      department: string;
      position: string;
      skills: string[];
      performace: {
        _id: string;
        employee: string;
        date: Date;
        feedback: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
      }[];
    }[];
    agenda: string;
    __v: number;
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  username: string;
  firstname: string;
  lastname: string;
};

type Meeting = {
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  participants: {
    _id: string;
    user: string;
    department: string;
    position: string;
    skills: string[];
    performace: {
      _id: string;
      employee: string;
      date: Date;
      feedback: string;
      rating: number;
      createdAt: Date;
      updatedAt: Date;
      __v: number;
    }[];
  }[];
  agenda: string;
};

type Performance = {
  employee: {
    _id: string;
    user: {
      _id: string;
      username: string;
      firstname: string;
      lastname: string;
      email: string;
      avatarUrl?: string;
      roles: string[];
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
      __v: number;
    };
    department: string;
    position: string;
    skills: string[];
    performance: {
      _id: string;
      employee: string;
      date: Date;
      feedback: string;
      rating: number;
      createdAt: Date;
      updatedAt: Date;
      __v: number;
    }[];
    startDate: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
  date: Date;
  feedback: string;
  ratings: number;
};

type Forms = {
  form_title: string;
  form_desc: string;
  questions: {
    questionText: string;
    questionType: string;
    options: { opyionText: string }[];
    open: boolean;
  }[];
};
