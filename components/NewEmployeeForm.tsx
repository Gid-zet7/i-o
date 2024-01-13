"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEmployee } from "@/lib/actions";

type Params = {
  departments: Department;
};

export default function NewEmployeeForm({ departments: departments }: Params) {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");
  const [startDate, setStartDate] = useState("");
  // const [deptOptions, setDeptOptions] = useState<Department[]>([]);
  const [error, setError] = useState<any>("");
  const [isSuccess, setIsSuccess] = useState<string>("");

  const router = useRouter();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const departmentsData: Promise<Department[]> = getAllDepartments();

  //     const departments = await departmentsData;

  //     setDeptOptions(departments);
  //   };

  //   fetchData();
  // }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !username ||
      !firstname ||
      !lastname ||
      !department ||
      !position ||
      !skills ||
      !startDate
    ) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const result = await createEmployee(
        username,
        firstname,
        lastname,
        department,
        position,
        skills,
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

  const deptOptionsData = departments.map((department) => {
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
              Username <br />
              <span className="text-xs text-slate-400">
                Make sure to enter correct detail
              </span>
            </label>
            <input
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              onChange={(e) => setUsername(e.target.value)}
              id="user"
              name="user"
              type="text"
              placeholder="Username..."
            />
            <label htmlFor="firstname" className="">
              First Name
            </label>
            <input
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              onChange={(e) => setFirstname(e.target.value)}
              id="firstname"
              name="firstname"
              type="text"
              placeholder="firstname..."
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
              placeholder="lastname..."
            />
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
              {deptOptionsData}
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
              placeholder="eg. strong leadership, training and coaching..."
            />
            <label htmlFor="startDate">Start Date:</label>
            <input
              className="p-1 rounded text-black outline-none w-5/6 sm:w-3/5"
              onChange={(e) => setStartDate(e.target.value)}
              id="startDate"
              name="startDate"
              type="date"
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
