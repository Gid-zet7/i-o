"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateEmployee } from "@/lib/actions";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import {
  Avatar,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";

type Params = {
  employee: Employee;
  departments: Department[];
};

export default function EditEmployeeForm({
  employee: employee,
  departments: departments,
}: Params) {
  let formattedStartDate = new Date(employee.startDate).toLocaleDateString();
  let formattedendDate;
  if (employee.endDate) {
    formattedendDate = new Date(employee.endDate).toLocaleDateString();
  }
  const [firstname, setFirstname] = useState(employee.firstname);
  const [lastname, setLastname] = useState(employee.lastname);
  const [department, setDepartment] = useState(employee.department.name);
  const [position, setPosition] = useState(employee.position);
  const [skills, setSkills] = useState<string[]>(employee.skills);
  const [performance, setPerformance] = useState(employee.performance);
  const [startDate, setStartDate] = useState<string>(formattedStartDate);
  const [endDate, setEndDate] = useState<string | undefined>(formattedendDate);
  // const [deptOptions, setDeptOptions] = useState<Department[]>([]);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState<string>("");

  const router = useRouter();

  const onSkillChanged = (text: string) => {
    setSkills([text]);
  };

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
        router.back();
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
        Edit Employee
      </h1>
      <div>
        <Box>
          <Paper sx={{ padding: "1rem 2rem" }}>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={8} md={6}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    sx={{
                      height: 100,
                      width: 100,
                      marginBottom: 2,
                    }}
                    src={employee.user.avatarUrl as string}
                  />
                </Box>
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
                        // label="Department"
                        onChange={(e) => setDepartment(e.target.value)}
                        value={department}
                      >
                        {deptOptionsData.map((option: any) => {
                          return <MenuItem>{option} </MenuItem>;
                        })}
                      </Select>
                    </Grid>
                    <Grid className="text-white" item xs={12} sm={6}>
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
                        onChange={(e) => onSkillChanged(e.target.value)}
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
                      <TextField
                        fullWidth
                        label="End Date"
                        name="end date"
                        onChange={(e) => setEndDate(e.target.value)}
                        value={endDate}
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
                        Save Changes
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
        <button onClick={router.back}>Back</button>
      </div>
    </>
  );
}
