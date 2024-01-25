"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
  FormControl,
  OutlinedInput,
  Stack,
  Chip,
  Autocomplete,
} from "@mui/material";
import { deleteManager, updateManager } from "@/lib/actions";
import { Cancel, Check } from "@mui/icons-material";
import { useSession } from "next-auth/react";

type Params = {
  managerId: string;
  manager: Manager;
  employees: Employee[];
  projects: Project[];
};

export default function EditManagerForm({
  managerId,
  manager,
  employees,
  projects,
}: Params) {
  let teamFormatted: string[] = [];
  manager.team.map((employee) => {
    teamFormatted.push(employee.user.username);
  });
  let projectsFormatted: string[] = [];
  manager.projects.map((project) => {
    projectsFormatted.push(project.title);
  });
  const { data: session } = useSession();
  const [employee, setEmployee] = useState(manager.employee.user.username);
  const [team, setTeam] = useState(teamFormatted);
  const [managerProjects, setManagerProjects] =
    useState<any>(projectsFormatted);
  const [meetings, setMeetings] = useState(manager.meetings);
  // const [options, setOptions] = useState<Employee[]>([]);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState<string>("");

  const router = useRouter();

  // const onProjectsChanged = (e: React.FormEvent<HTMLSelectElement>) => {
  //   const options = e.target as HTMLSelectElement;
  //   const values = Array.from(
  //     options.selectedOptions,
  //     (option) => option.value
  //   );
  //   setProjects(values);
  // };

  // const onTeamChanged = (e: React.FormEvent<HTMLSelectElement>) => {
  //   const options = e.target as HTMLSelectElement;
  //   const values = Array.from(
  //     options.selectedOptions,
  //     (option) => option.value
  //   );
  //   setTeam(values);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!employee || !team || !projects) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const result = updateManager(
        session,
        manager._id,
        employee,
        team,
        managerProjects
      );

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
      const result = await deleteManager(managerId);
      if (result !== undefined && result !== null) {
        setError("");
        setIsSuccess("Succesful");
        router.push("/dashboard/managers");
      } else {
        setError("Failed to delete employee");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const employeeArr: any[] = [];
  employees.map((employee) => {
    employeeArr.push(employee.user.username);
  });

  const projectsData = projects?.map((project: any) => {
    return (
      <MenuItem key={project._id} value={project?.title}>
        {project?.title}
        {managerProjects.includes(project?.title) ? (
          <Check color="info" />
        ) : null}
      </MenuItem>
    );
  });

  const employeesData = employees.map((employee: Employee) => {
    return (
      <option key={employee._id} value={employee.user.username}>
        {employee.user.username}
      </option>
    );
  });

  return (
    <>
      <h1 className="text-xl font-bold my-4 grid place-content-center underline mt-6">
        Update Manager
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
                    src={manager.employee.user.avatarUrl as string}
                  />
                </Box>
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
                        value={employee}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label={"Employee"}
                            placeholder="Select Employee"
                          />
                        )}
                      />
                      {/* <Select
                        required
                        fullWidth
                        id="employee"
                        name="employee"
                        onChange={(e) => setEmployee(e.target.value)}
                        value={employee}
                      >
                        {employeesData.map((option: any) => {
                          return (
                            <MenuItem key={option._id} value={option.value}>
                              {option}{" "}
                            </MenuItem>
                          );
                        })}
                      </Select> */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        fullWidth
                        multiple
                        options={employeeArr}
                        getOptionLabel={(option) => option}
                        disableCloseOnSelect
                        onChange={(e, newValue) => {
                          setTeam(newValue);
                        }}
                        value={team}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Team"
                            placeholder="Select team"
                          />
                        )}
                      />
                      {/* <Select
                        required
                        fullWidth
                        id="team"
                        name="team"
                        onChange={(e) => onTeamChanged}
                        value={team}
                        multiple={true}
                      >
                        {employeesData.map((option: any) => {
                          return <MenuItem>{option} </MenuItem>;
                        })}
                      </Select> */}
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
                        Demote Manager
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
