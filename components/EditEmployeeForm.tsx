"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateEmployee } from "@/lib/actions";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import { Close } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {
  Avatar,
  Box,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { deleteEmployee } from "@/lib/actions";
import { useSession } from "next-auth/react";

type Params = {
  employeeId: string;
  employee: Employee;
  departments: Department[];
};

export default function EditEmployeeForm({
  employeeId,
  employee,
  departments,
}: Params) {
  let formattedStartDate = new Date(employee.startDate).toLocaleDateString();
  let formattedendDate;
  if (employee.endDate) {
    formattedendDate = new Date(employee.endDate).toLocaleDateString();
  }
  const { data: session } = useSession();
  const [firstname, setFirstname] = useState(employee.firstname);
  const [lastname, setLastname] = useState(employee.lastname);
  const [department, setDepartment] = useState(employee.department.name);
  const [position, setPosition] = useState(employee.position);
  const [skills, setSkills] = useState(employee.skills);
  const [performance, setPerformance] = useState(employee.performance);
  const [startDate, setStartDate] = useState<string>(formattedStartDate);
  const [endDate, setEndDate] = useState<string | undefined>(formattedendDate);
  // const [deptOptions, setDeptOptions] = useState<Department[]>([]);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState<string>("");

  const router = useRouter();

  const addOption = () => {
    let allSkills = [...skills];
    allSkills.push({ skill: "Skill" + " " + (allSkills.length + 1) });
    setSkills(allSkills);
    console.log(skills);
  };

  function changeOptionValue(text: string, i: number) {
    let optionSkills = [...skills];
    optionSkills[i].skill = text;
    setSkills(optionSkills);
    console.log(skills);
  }

  function removeOption(i: number) {
    let RemoveOptionSkills = [...skills];
    if (RemoveOptionSkills.length > 1) {
      RemoveOptionSkills.splice(i, 1);
      console.log(RemoveOptionSkills);
      setSkills(RemoveOptionSkills);
      console.log(skills);
    }
  }

  // const onSkillChanged = (text: string) => {
  //   setSkills([text]);
  // };

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
        session,
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

  const handleDelete = async () => {
    try {
      const result = await deleteEmployee(session, employeeId);
      if (result !== undefined && result !== null) {
        setError("");
        setIsSuccess("Succesful");
        router.push("dashboard/employees");
      } else {
        setError("Failed to delete employee");
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
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="department">Department*</InputLabel>
                        <Select
                          id="department"
                          required
                          labelId="Department"
                          label="Department"
                          // className="text-black"
                          // label="Department"
                          onChange={(e) => setDepartment(e.target.value)}
                          value={department}
                        >
                          {deptOptionsData}
                        </Select>
                      </FormControl>
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
                    {skills.map((skill, i) => (
                      <div className="flex items-center" key={i}>
                        <div className="flex items-center mb-2">
                          <TextField
                            type="text"
                            className="h-9 outline-none focus:border-b-2 border-blue-500 text- base text-black w-full mt-4"
                            placeholder="skill"
                            value={skills[i].skill}
                            onChange={(e) => {
                              changeOptionValue(e.target.value, i);
                            }}
                          />
                        </div>
                        <IconButton
                          key={i}
                          aria-label="delete"
                          onClick={() => {
                            removeOption(i);
                          }}
                        >
                          <Close />
                        </IconButton>
                      </div>
                    ))}
                    <FormControlLabel
                      control={<input type="radio" />}
                      label={
                        <div>
                          <Button
                            size="small"
                            style={{
                              textTransform: "none",
                              color: "#4285f4",
                              fontSize: "13px",
                              fontWeight: "600",
                              marginTop: "1rem",
                            }}
                            onClick={() => addOption()}
                          >
                            Add skill
                          </Button>
                        </div>
                      }
                    ></FormControlLabel>
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
                        color="secondary"
                        className="text-black bg-white"
                        // onClick={handleSubmit}
                      >
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className="text-black bg-white ml-3"
                        onClick={handleDelete}
                      >
                        Delete Employee
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
