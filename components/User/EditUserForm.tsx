"use client";
import { useState, useEffect } from "react";
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
import { UploadButton } from "@/utils/uploadthing";

type Params = {
  user: User;
};

export default function EditUserForm({ user }: Params) {
  const { data: session } = useSession();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  // const [password, setPassword] = useState(user.password);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [roles, setRoles] = useState<any>(user.roles);
  const [active, setActive] = useState(user.active);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState<string>("");

  const [imagePreview, setImagePreview] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const imagePreview = document.getElementById("image-preview");
    setImagePreview(imagePreview);
  }, []);

  const router = useRouter();

  const handleImageChange = (url: any) => {
    if (url) {
      setAvatarUrl(url);
      if (imagePreview) {
        console.log("Almost..");
        imagePreview.innerHTML = `<img src="${url}" className="w-64 h-64 rounded-full" alt="Image preview" />`;
      }

      setImagePreview(imagePreview);
    } else {
      if (imagePreview)
        imagePreview.innerHTML = `<div class="bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-500">No image preview</div>`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !username ||
      !email ||
      !avatarUrl ||
      !Array.isArray(roles) ||
      !roles.length
      // !active
    ) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const result = await updateUser(
        session,
        user._id,
        username,
        email,
        // password,
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
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  marginBottom={3}
                >
                  <div className=" rounded-full bg-cover bg-center bg-no-repeat  shadow flex items-center justify-center">
                    <div className="relative hover:opacity-60">
                      <div className="mx-auto w-64 text-center ">
                        <div id="image-preview" className="w-64 ">
                          <Avatar
                            className="w-64 h-64 rounded-full relative"
                            src={user.avatarUrl}
                            alt=""
                          />
                          <div className="w-64 h-64 group hover:bg-gray-200 opacity-60 rounded-full flex justify-center items-center cursor-pointer transition duration-500 absolute top-0">
                            <UploadButton
                              // className="hidden"
                              endpoint="imageUploader"
                              onClientUploadComplete={(res) => {
                                if (res) {
                                  res.map((img) => handleImageChange(img.url));
                                }
                              }}
                              onUploadError={(error: Error) => {
                                // Do something with the error.
                                alert(`ERROR! ${error.message}`);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
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
                    {/* <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </Grid> */}
                    <Grid className="text-white" item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="roles">Roles*</InputLabel>
                        <Select
                          id="roles"
                          required
                          labelId="Roles"
                          label="Roles"
                          multiple={true}
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
                        control={<Checkbox />}
                        label="Active"
                        checked={active}
                        onChange={(e) => setActive((prevVal) => !prevVal)}
                        defaultChecked
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className="text-black bg-white mb-4 mr-3"
                        // onClick={handleSubmit}
                      >
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className="text-black bg-white mb-4"
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
