"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAllDepartments, getAllUsers } from "@/lib/actions";

export default async function NewEmployeeForm() {
  const [username, setUserName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");
  const [startDate, setStartDate] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !department || !position || !skills || !startDate) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const employee = await fetch("http://localhost:3000/api/employees/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          department,
          position,
          skills,
          performance,
          startDate,
        }),
      });

      if (employee.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/");
      } else {
        console.log("Employee registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;

  const departmentsData: Promise<Department[]> = getAllDepartments();
  const departments = await departmentsData;

  const options = users.map((user) => {
    return (
      <option key={user._id} value={user.username}>
        {user.username}
      </option>
    );
  });

  const deptOptions = departments.map((department) => {
    return (
      <option key={department._id} value={department.name}>
        {department.name}
      </option>
    );
  });

  return (
    <div className="max-w-5xl mx-auto p-3">
      <div className="p-4 mt-10 flex flex-col-reverse md:flex-row w-full ">
        <div className="flex-1">
          <h1 className="text-xl font-bold my-4 grid place-content-center">
            Add Employee
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <label htmlFor="user" className="">
              Select a user from the users list below. <br />
              <span className="text-xs text-slate-400">
                Employees need to sign up as users first
              </span>
            </label>
            <select
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              id="user"
              name="user"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
            >
              <option>--Select User--</option>
              {options}
            </select>
            <label htmlFor="department" className="">
              Choose department
            </label>
            <select
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              id="department"
              name="department"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
            >
              <option>--Select Department--</option>
              {deptOptions}
            </select>
            <label htmlFor="position" className="">
              Position
            </label>
            <input
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              onChange={(e) => setPosition(e.target.value)}
              id="position"
              name="position"
              type="text"
              placeholder="eg.project manager..."
            />
            <label htmlFor="skills" className="">
              Skills
            </label>
            <input
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              onChange={(e) => setSkills(e.target.value)}
              id="skills"
              name="skills"
              type="text"
              placeholder="skills..."
            />
            <label htmlFor="startDate">Start Date:</label>
            <input
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              onChange={(e) => setStartDate(e.target.value)}
              id="startDate"
              name="startDate"
              type="date"
            />
            <button className="bg-amber-300 text-black font-bold cursor-pointer px-6 py-2 w-5/6 sm:w-3/5 hover:bg-opacity-90">
              Save
            </button>

            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}

            <Link className="text-sm mt-3 text-left" href={"/"}>
              Back to Home
            </Link>
          </form>
        </div>
        <Image
          src="/undraw_add_user_re_5oib.svg"
          width={330}
          height={80}
          className=""
          alt="add employee image"
        />
      </div>
    </div>
  );
}
