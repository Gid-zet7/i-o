"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
// import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  InputLabel,
  TextField,
  OutlinedInput,
  Stack,
  Chip,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { Cancel, Check } from "@mui/icons-material";
import { deleteUser } from "@/lib/actions";
import { useSession } from "next-auth/react";

type Params = {
  user: User;
};

export default function EditUserForm({ user }: Params) {
  const { data: session } = useSession();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password || !avatarUrl || !roles || !active) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const result = await updateUser(
        session,
        user._id,
        username,
        email,
        password,
        avatarUrl,
        roles,
        active
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
      const result = await deleteUser(session, user._id);
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

  const userRoles = ["User", "Employee", "Manager", "Admin"];

  const rolesData = userRoles.map((role, i) => {
    return (
      <MenuItem key={i} value={role}>
        {role}
        {roles.includes(role) ? <Check color="info" /> : null}
      </MenuItem>
    );
  });

  return (
    <>
      <h1 className="text-xl font-bold my-4 grid place-content-center underline mt-6">
        Edit User
      </h1>
      <div>
        <Box>
          <Paper sx={{ padding: "1rem 2rem" }}>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={8} md={6}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <div className=" rounded-full bg-cover bg-center bg-no-repeat  shadow flex items-center justify-center">
                    <div className="relative hover:opacity-60">
                      <Avatar
                        sx={{
                          height: 100,
                          width: 100,
                          marginBottom: 2,
                        }}
                        src={avatarUrl}
                        className=" cursor-pointer"
                      />
                      <div className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100 absolute left-3 top-8 ">
                        <label className="block pt-2">
                          <span className="sr-only t-2">
                            {/* <img
                              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/simple_form-svg1.svg"
                              alt="Edit"
                            /> */}
                          </span>
                          <input
                            type="file"
                            className="w w-4/5 text-xs text-slate-500 file:mr-4 
                            file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold"
                            // value={"C:\fakepathCapture.PNG"}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                          />
                        </label>
                        {/* <p className="text-xs text-gray-100">Edit Picture</p> */}
                      </div>
                    </div>
                    {/* <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0"></div> */}
                  </div>
                </Box>
                <form
                  onSubmit={handleSubmit}
                  style={{ maxWidth: 600, margin: "0 auto" }}
                >
                  <Grid container spacing={3}>
                    <Grid className="text-white" item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="User Name"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </Grid>
                    <Grid className="text-white" item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="roles">Roles*</InputLabel>
                        <Select
                          id="roles"
                          required
                          labelId="Roles"
                          label="Roles"
                          multiple={true}
                          // className="text-black"
                          // label="Department"
                          onChange={(e) => setRoles(e.target.value)}
                          input={<OutlinedInput label="Multiple Select" />}
                          renderValue={(selected) => (
                            <Stack gap={1} direction="row" flexWrap="wrap">
                              {selected.map((value: any) => (
                                <Chip
                                  key={value}
                                  label={value}
                                  onDelete={() =>
                                    setRoles(
                                      roles.filter(
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
                          value={roles}
                        >
                          {rolesData}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        required
                        control={<Checkbox />}
                        label="Active"
                        defaultChecked
                        color="success"
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
