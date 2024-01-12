"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllDepartments, updateEmployee } from "@/lib/actions";

export default function EditEmployeeForm({ employee }: any) {
  let date = new Date(employee.startDate).toLocaleDateString();
  const [firstname, setFirstname] = useState(employee.firstname);
  const [lastname, setLastname] = useState(employee.lastname);
  const [department, setDepartment] = useState(employee.department.name);
  const [position, setPosition] = useState(employee.position);
  const [skills, setSkills] = useState(employee.skills);
  const [performance, setPerformance] = useState(employee.performance);
  const [startDate, setStartDate] = useState<string>(date);
  const [endDate, setEndDate] = useState<string>(employee.endDate);
  const [deptOptions, setDeptOptions] = useState<Department[]>([]);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const departmentsData: Promise<Department[]> = getAllDepartments();
      const departments = await departmentsData;

      setDeptOptions(departments);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !department ||
      !firstname ||
      !lastname ||
      !position ||
      !skills ||
      !startDate
    ) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const result = await updateEmployee(
        employee._id,
        firstname,
        lastname,
        department,
        position,
        skills,
        performance,
        startDate
      );

      console.log("Result:", result);

      if (result !== undefined && result !== null) {
        const form = e.target as HTMLFormElement;
        form.reset();
        setError("");
        setIsSuccess("Succesful");
        router.push("/employees");
      } else {
        setError("Failed to create employee. Please check the input.");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const deptOptionsData = deptOptions.map((department) => {
    return (
      <option key={department._id} value={department.name}>
        {department.name}
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
            <label htmlFor="department" className="">
              Change department
            </label>
            <select
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              id="department"
              name="department"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
            >
              {deptOptionsData}
            </select>
            <label htmlFor="firstname" className="">
              First Name
            </label>
            <input
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              onChange={(e) => setFirstname(e.target.value)}
              id="firstname"
              name="firstname"
              type="text"
              value={firstname}
            />
            <label htmlFor="lastname" className="">
              Last Name
            </label>
            <input
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              onChange={(e) => setLastname(e.target.value)}
              id="lastname"
              name="lastname"
              type="text"
              value={lastname}
            />
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
              value={position}
            />
            <label htmlFor="skills" className="">
              Skills <br />
              <span className="text-xs text-slate-400">
                Enter skills separated by commas eg., communication, project{" "}
                <br />
                management, Time management etc.
              </span>
            </label>
            <input
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              onChange={(e) => setSkills(e.target.value)}
              id="skills"
              name="skills"
              type="text"
              placeholder="skills..."
              value={skills}
            />
            <label htmlFor="startDate">
              Start Date: <br />
              <span className="text-xs text-slate-400">mmm/ddd/yyy</span>
            </label>
            <input
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              onChange={(e) => setStartDate(e.target.value)}
              id="startDate"
              name="startDate"
              type="text"
              value={startDate}
            />
            <label htmlFor="endDate">
              End Date: <br />{" "}
              <span className="text-xs text-slate-400">mmm/ddd/yyy</span>
            </label>
            <input
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              onChange={(e) => setEndDate(e.target.value)}
              id="endDate"
              name="endDate"
              type="text"
              value={endDate}
            />
            <button
              type="submit"
              className="bg-amber-300 text-black font-bold cursor-pointer px-6 py-2 w-5/6 sm:w-3/5 hover:bg-opacity-90"
            >
              Save
            </button>
            {isSuccess && (
              <div className="bg-green-400 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {isSuccess}
              </div>
            )}
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
            <button onClick={router.back}>Back</button>
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
