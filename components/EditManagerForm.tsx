"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllEmployees } from "@/lib/actions";

export default function EditEmployeeForm({ manager }: any) {
  const [employee, setEmployee] = useState(manager.employee.user.username);
  const [team, setTeam] = useState<string[]>(manager.team);
  const [projects, setProjects] = useState(manager.projects);
  const [meetings, setMeetings] = useState(manager.meetings);
  const [options, setOptions] = useState<Employee[]>([]);
  const [error, setError] = useState<any>("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const employeesData: Promise<Employee[]> = getAllEmployees();
      const employees = await employeesData;

      setOptions(employees);
    };

    fetchData();
  }, []);

  const onTeamChanged = (e: React.FormEvent<HTMLSelectElement>) => {
    const options = e.target as HTMLSelectElement;
    const values = Array.from(
      options.selectedOptions,
      (option) => option.value
    );
    setTeam(values);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!employee || !team || !projects) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const updateManager = await fetch(
        "http://localhost:3000/api/managers/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employee,
            team: team,
            projects: [projects],
            meetings,
          }),
        }
      );

      if (updateManager.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/managers");
      } else {
        setError(updateManager.statusText);
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  const optionsData = options.map((employee) => {
    return (
      <option key={employee._id} value={employee.user.username}>
        {employee.user.username}
      </option>
    );
  });

  return (
    <div className="max-w-5xl mx-auto p-3">
      <div className="p-4 mt-10 flex flex-col-reverse md:flex-row w-full">
        <div className="flex-1 ">
          <h1 className="text-xl font-bold my-4 grid place-content-center">
            Edit Employee
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="employee" className="">
              Select an employee from the employees list below. <br />
              <span className="text-xs text-slate-400">
                Managers need to sign up as users first
              </span>
            </label>
            <select
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              id="employee"
              name="employee"
              onChange={(e) => setEmployee(e.target.value)}
              value={employee}
            >
              <option>--Select Employee--</option>
              {optionsData}
            </select>

            <label htmlFor="team" className="">
              Team
            </label>
            <select
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              id="team"
              name="team"
              onChange={onTeamChanged}
              value={team}
              multiple={true}
            >
              <option>--Select Team--</option>
              {optionsData}
            </select>

            <label htmlFor="project" className="">
              Project
            </label>
            <input
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              onChange={(e) => setProjects(e.target.value)}
              id="project"
              name="project"
              type="text"
              placeholder="eg.project A..."
            />

            <button
              type="submit"
              className="bg-amber-300 text-black font-bold cursor-pointer px-6 py-2 w-5/6 sm:w-3/5 hover:bg-opacity-90"
            >
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
          src="/undraw_redesign_feedback_re_jvm0.svg"
          width={330}
          height={80}
          className=""
          alt="edit employee image"
        />
      </div>
    </div>
  );
}
