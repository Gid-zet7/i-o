"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEmployee } from "@/lib/actions";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";

type Params = {
  departments: Department[];
};

export default function NewEmployeeForm({ departments: departments }: Params) {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");
  const [startDate, setStartDate] = useState("");
  const [error, setError] = useState<any>("");
  const [isSuccess, setIsSuccess] = useState<string>("");

  const router = useRouter();

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

  const deptOptionsData = departments.map((department: Department) => {
    return (
      <option key={department._id} value={department.name}>
        {department.name}
      </option>
    );
  });

  return (
    <>
      <h1 className="text-xl font-bold my-4 grid place-content-center underline mt-6">
        Add Employee
      </h1>
      <Box bgcolor="purple" color="black">
        <Paper sx={{ padding: "1rem 2rem" }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <form
                onSubmit={handleSubmit}
                style={{ maxWidth: 600, margin: "0 auto" }}
              >
                <InputLabel id="department">Department*</InputLabel>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Select
                      id="department"
                      required
                      fullWidth
                      // className="text-black"
                      // label="Department"
                      onChange={(e) => setDepartment(e.target.value)}
                      value={department}
                    >
                      {deptOptionsData.map((option: any) => {
                        return <MenuItem>{option} </MenuItem>;
                      })}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      onChange={(e) => setLastname(e.target.value)}
                      value={lastname}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Position"
                      name="position"
                      onChange={(e) => setPosition(e.target.value)}
                      value={position}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Skills"
                      name="skills"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Start Date"
                      name="start date"
                      onChange={(e) => setStartDate(e.target.value)}
                      value={startDate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="text-black"
                      // onClick={handleSubmit}
                    >
                      Add Employee
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Box>
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
    </>
  );
}
