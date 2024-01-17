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
} from "@mui/material";

type Params = {
  manager: Manager;
  employees: Employee[];
};

export default function EditManagerForm({
  manager: manager,
  employees: employees,
}: Params) {
  const [employee, setEmployee] = useState(manager.employee.user.username);
  const [team, setTeam] = useState<Employee[]>(manager.team);
  const [projects, setProjects] = useState(manager.projects);
  const [meetings, setMeetings] = useState(manager.meetings);
  // const [options, setOptions] = useState<Employee[]>([]);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState<string>("");

  const router = useRouter();

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
      const result = await fetch("http://localhost:3000/api/managers/update", {
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
      });

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
                  <InputLabel id="employee">Employee*</InputLabel>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Select
                        required
                        fullWidth
                        id="employee"
                        name="employee"
                        onChange={(e) => setEmployee(e.target.value)}
                        value={employee}
                      >
                        {employeesData.map((option: any) => {
                          return <MenuItem>{option} </MenuItem>;
                        })}
                      </Select>
                    </Grid>
                    <InputLabel id="employee">Team*</InputLabel>
                    <Grid item xs={12} sm={6}>
                      <Select
                        required
                        fullWidth
                        id="team"
                        name="team"
                        onChange={onTeamChanged}
                        value={team}
                        multiple={true}
                      >
                        {employeesData.map((option: any) => {
                          return <MenuItem>{option} </MenuItem>;
                        })}
                      </Select>
                    </Grid>
                    <Grid className="text-white" item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Project"
                        name="project"
                        value={projects}
                        onChange={(e) => setProjects(e.target.value)}
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
