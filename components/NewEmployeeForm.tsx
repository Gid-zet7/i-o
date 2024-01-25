"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEmployee } from "@/lib/actions";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useSession } from "next-auth/react";

type Params = {
  users: User[];
  departments: Department[];
};

export default function NewEmployeeForm({ departments, users }: Params) {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  // const [skills, setSkills] = useState<string>();
  const [skills, setSkills] = useState([{ skill: "Skill 1" }]);
  const [startDate, setStartDate] = useState("");
  const [error, setError] = useState<any>("");
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
        session,
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

  const usersArr: any[] = [];
  users.map((user) => {
    usersArr.push(user.username);
  });

  const deptOptionsData = departments.map((department: Department) => {
    return (
      <MenuItem key={department._id} value={department.name}>
        {department.name}
      </MenuItem>
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
                {/*  */}
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
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      fullWidth
                      options={usersArr}
                      getOptionLabel={(option) => option}
                      disableCloseOnSelect
                      onChange={(e, newValue) => {
                        setUsername(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Username"
                          placeholder="Select Username"
                        />
                      )}
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
                    <div>
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
                      {/* <TextField
                        required
                        fullWidth
                        label="Skills"
                        name="skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                      /> */}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      // required
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
                      className="text-black bg-slate-50"
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
