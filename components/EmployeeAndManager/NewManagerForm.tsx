"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createManager } from "@/lib/actions";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import {
  Avatar,
  Box,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  OutlinedInput,
  Stack,
  Chip,
  Autocomplete,
} from "@mui/material";
import { Cancel, Check } from "@mui/icons-material";
import { useSession } from "next-auth/react";

type Params = {
  employees: Employee[];
  projects: Project[];
};
export default function NewManagerForm({ employees, projects }: Params) {
  const { data: session } = useSession();
  const [employee, setEmployee] = useState("");
  const [team, setTeam] = useState<string[]>([]);
  const [managerProjects, setManagerProjects] = useState<any>([]);
  const [error, setError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<string>("");

  const router = useRouter();

  // const onTeamChanged = (e: React.FormEvent<HTMLSelectElement>) => {
  //   const options = e.target as HTMLSelectElement;
  //   const values = Array.from(
  //     options.selectedOptions,
  //     (option) => option.value
  //   );
  //   setTeam(values);
  // };
  // const onProjectChanged = (e: React.FormEvent<HTMLSelectElement>) => {
  //   const options = e.target as HTMLSelectElement;
  //   const values = Array.from(
  //     options.selectedOptions,
  //     (option) => option.value
  //   );
  //   setManagerProjects(values);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!employee || !team || !projects) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const result = await createManager(
        session,
        employee,
        team,
        managerProjects
      );

      if (result !== undefined && result !== null) {
        const form = e.target as HTMLFormElement;
        form.reset();
        setError("");
        setIsSuccess("Succesful");
        router.push("dashboard/managers");
      } else {
        setError("Failed to create manager. Please check the input.");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const employeeArr: any[] = [];
  employees.map((employee) => {
    employeeArr.push(employee.user.username);
  });

  const employeesData = employees.map((employee) => {
    return (
      <MenuItem key={employee._id} value={employee.user.username}>
        {employee.user.username}
      </MenuItem>
    );
  });

  const projectsData = projects?.map((project) => {
    return (
      <MenuItem key={project._id} value={project?.title}>
        {project?.title}
        {managerProjects.includes(project?.title) ? (
          <Check color="info" />
        ) : null}
      </MenuItem>
    );
  });

  return (
    <>
      <h1 className="text-xl font-bold my-4 grid place-content-center underline mt-6">
        New Manager
      </h1>
      <div>
        <Box>
          <Paper sx={{ padding: "1rem 2rem" }}>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={8} md={6}>
                <form
                  onSubmit={handleSubmit}
                  style={{ maxWidth: 600, margin: "0 auto" }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        fullWidth
                        options={employeeArr}
                        getOptionLabel={(option) => option}
                        disableCloseOnSelect
                        onChange={(e, newValue) => {
                          setEmployee(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Employee"
                            placeholder="Select Employee"
                          />
                        )}
                      />
                      {/* <FormControl fullWidth>
                        <InputLabel id="employee">Employee*</InputLabel>
                        <Select
                          id="employee"
                          required
                          labelId="Employee"
                          label="Employee"
                          // className="text-black"
                          // label="Department"
                          onChange={(e) => setEmployee(e.target.value)}
                          value={employee}
                        >
                          {employeesData}
                        </Select>
                      </FormControl> */}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      {/* <FormControl fullWidth>
                        <InputLabel id="team">Team*</InputLabel>
                        <Select
                          id="team"
                          required
                          labelId="Team"
                          label="Team"
                          multiple={true}
                          // className="text-black"
                          // label="Department"
                          onChange={(e) => setTeam(e.target.value)}
                          input={<OutlinedInput label="Multiple Select" />}
                          renderValue={(selected) => (
                            <Stack gap={1} direction="row" flexWrap="wrap">
                              {selected.map((value) => (
                                <Chip
                                  key={value}
                                  label={value}
                                  onDelete={() =>
                                    setTeam(
                                      team.filter((item) => item !== value)
                                    )
                                  }
                                  deleteIcon={
                                    <Cancel
                                      onMouseDown={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  }
                                />
                              ))}
                            </Stack>
                          )}
                          value={team}
                        >
                          {employeesData}
                        </Select>
                      </FormControl> */}
                      <Autocomplete
                        fullWidth
                        multiple
                        options={employeeArr}
                        getOptionLabel={(option) => option}
                        disableCloseOnSelect
                        onChange={(e, newValue) => {
                          setTeam(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Team"
                            placeholder="Select team"
                          />
                        )}
                      />
                    </Grid>
                    <Grid className="text-white" item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="projects">Projects*</InputLabel>
                        <Select
                          id="projects"
                          required
                          labelId="Projects"
                          label="Projects"
                          multiple={true}
                          // className="text-black"
                          // label="Department"
                          onChange={(e) => setManagerProjects(e.target.value)}
                          input={<OutlinedInput label="Multiple Select" />}
                          renderValue={(selected) => (
                            <Stack gap={1} direction="row" flexWrap="wrap">
                              {selected.map((value: any) => (
                                <Chip
                                  key={value}
                                  label={value}
                                  onDelete={() =>
                                    setManagerProjects(
                                      managerProjects.filter(
                                        (item: any) => item !== value
                                      )
                                    )
                                  }
                                  deleteIcon={
                                    <Cancel
                                      onMouseDown={(event) =>
                                        event.stopPropagation()
                                      }
                                    />
                                  }
                                />
                              ))}
                            </Stack>
                          )}
                          value={managerProjects}
                        >
                          {projectsData}
                        </Select>
                      </FormControl>
                      {/* <TextField
                        required
                        fullWidth
                        label="Project"
                        name="project"
                        value={projects}
                        onChange={(e) => setProjects(e.target.value)}
                      /> */}
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="text-black bg-slate-50"
                      >
                        Promote
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
