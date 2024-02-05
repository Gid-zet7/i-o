"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEmployee } from "@/lib/actions";
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
  Tooltip,
  IconButton,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import { useSession } from "next-auth/react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type Params = {
  users: User[];
  departments: Department[];
};

export default function NewEmployeeForm({ departments, users }: Params) {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [permanent_address, setPermanentAddress] = useState("");
  const [current_address, setCurrentAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState([{ skill: "" }]);
  const [experiences, setExperiences] = useState([
    { position: "", startDate: "", endDate: "" },
  ]);
  const [education, setEducation] = useState([
    {
      school: "",
      certificate: "",
      startDate: "",
      endDate: "",
    },
  ]);
  const [startDate, setStartDate] = useState("");
  const [error, setError] = useState<any>("");
  const [isSuccess, setIsSuccess] = useState<string>("");

  const router = useRouter();

  // ------------------Skills------------------
  const addOption = () => {
    let allSkills = [...skills];
    allSkills.push({ skill: "" });
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

  // End of Skills functions

  //------------------Experience--------------------

  const addExpOption = () => {
    let allExps = [...experiences];
    allExps.push({
      position: "",
      startDate: "",
      endDate: "",
    });
    setExperiences(allExps);
    console.log(experiences);
  };

  function changeExpPositionOptionValue(text: string, i: number) {
    let optionExps = [...experiences];
    optionExps[i].position = text;
    setExperiences(optionExps);
    console.log(experiences);
  }

  function changeExpStartOptionValue(text: string, i: number) {
    let optionExps = [...experiences];
    optionExps[i].startDate = text;
    setExperiences(optionExps);
    console.log(experiences);
  }

  function changeExpEndOptionValue(text: string, i: number) {
    let optionExps = [...experiences];
    optionExps[i].endDate = text;
    setExperiences(optionExps);
    console.log(experiences);
  }

  function removeExpOption(i: number) {
    let RemoveOptionExps = [...experiences];
    if (RemoveOptionExps.length > 1) {
      RemoveOptionExps.splice(i, 1);
      console.log(RemoveOptionExps);
      setExperiences(RemoveOptionExps);
      console.log(experiences);
    }
  }

  // End of Experience functions

  // --------------------Education---------------------

  const addEduOption = () => {
    let allEdus = [...education];
    allEdus.push({
      school: "",
      certificate: "",
      startDate: "",
      endDate: "",
    });
    setEducation(allEdus);
    console.log(education);
  };

  function changeEduSchoolOptionValue(text: string, i: number) {
    let optionEdus = [...education];
    optionEdus[i].school = text;
    setEducation(optionEdus);
    console.log(education);
  }

  function changeEduCertificateOptionValue(text: string, i: number) {
    let optionEdus = [...education];
    optionEdus[i].certificate = text;
    setEducation(optionEdus);
    console.log(education);
  }

  function changeEduStartOptionValue(text: string, i: number) {
    let optionEdus = [...education];
    optionEdus[i].startDate = text;
    setEducation(optionEdus);
    console.log(education);
  }

  function changeEduEndDateOptionValue(text: string, i: number) {
    let optionEdus = [...education];
    optionEdus[i].endDate = text;
    setEducation(optionEdus);
    console.log(education);
  }

  function removeEduOption(i: number) {
    let RemoveOptionEdus = [...education];
    if (RemoveOptionEdus.length > 1) {
      RemoveOptionEdus.splice(i, 1);
      console.log(RemoveOptionEdus);
      setEducation(RemoveOptionEdus);
      console.log(education);
    }
  }

  // End of Education functions

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !username ||
      !firstname ||
      !lastname ||
      !bio ||
      !gender ||
      !contact ||
      !permanent_address ||
      !current_address ||
      !birthday ||
      !department ||
      !position ||
      !skills ||
      !experiences ||
      !education ||
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
        bio,
        gender,
        contact,
        permanent_address,
        current_address,
        birthday,
        department,
        position,
        skills,
        experiences,
        education,
        startDate
      );

      console.log("Result:", result);

      if (result !== undefined && result !== null) {
        const form = e.target as HTMLFormElement;
        form.reset();
        setError("");
        setIsSuccess("Succesful");
        router.push("dashboard/employees");
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
                {/* <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 mb-4"> */}
                <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                  <p className="text-lg font-bold">Personal Information</p>
                  <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400 ">
                    <Tooltip
                      title={
                        <Typography
                          fontSize={16}
                        >{`Personal information`}</Typography>
                      }
                    >
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
                {/* </div> */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="department">Department*</InputLabel>
                      <Select
                        id="department"
                        required
                        labelId="Department"
                        label="Department"
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
                      placeholder="eg.John"
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
                      placeholder="eg.Doe"
                      onChange={(e) => setLastname(e.target.value)}
                      value={lastname}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel id="bio">Bio*</InputLabel>
                    <TextareaAutosize
                      id="bio"
                      required
                      maxLength={200}
                      maxRows={10}
                      className="bg-transparent border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-600"
                      placeholder="Let the world know who you are"
                      name="bio"
                      onChange={(e) => setBio(e.target.value)}
                      value={bio}
                    />
                    <p className="w-full text-right text-xs pt-1 text-gray-600 dark:text-gray-400">
                      Character Limit: 200
                    </p>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Gender"
                      placeholder="Male/Female"
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                      value={gender}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Phone"
                      name="contact"
                      onChange={(e) => setContact(e.target.value)}
                      value={contact}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Permanent Address"
                      name="permanent_address"
                      onChange={(e) => setPermanentAddress(e.target.value)}
                      value={permanent_address}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Current Address"
                      name="current_address"
                      onChange={(e) => setCurrentAddress(e.target.value)}
                      value={current_address}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Birth day"
                      name="birthday"
                      placeholder="mmm/ddd/yyy"
                      onChange={(e) => setBirthday(e.target.value)}
                      value={birthday}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Position"
                      name="position"
                      placeholder="eg.sales executive"
                      onChange={(e) => setPosition(e.target.value)}
                      value={position}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      // required
                      fullWidth
                      label="Start Date"
                      name="start date"
                      placeholder="mmm/ddd/yyy"
                      onChange={(e) => setStartDate(e.target.value)}
                      value={startDate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 mb-8"> */}
                    <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                      <p className="text-lg font-bold">Skills</p>
                      <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                        <Tooltip
                          title={
                            <Typography fontSize={16}>{`Skills`}</Typography>
                          }
                        >
                          <IconButton>
                            <InfoOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    {/* </div> */}

                    {skills.map((skill, i) => (
                      <div className="flex items-center" key={i}>
                        <div className="flex items-center mb-2">
                          <TextField
                            type="text"
                            className="h-9 outline-none focus:border-b-2 border-blue-500 text- base text-black w-full mt-4"
                            label="Skill"
                            placeholder="eg.Communction"
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
                              marginBottom: "1.5rem",
                            }}
                            onClick={() => addOption()}
                          >
                            Add skill
                          </Button>
                        </div>
                      }
                    ></FormControlLabel>
                  </Grid>

                  <Grid item xs={12} marginBottom={4}>
                    {/* <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 mb-8"> */}
                    <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                      <p className="text-lg font-bold">Experience</p>
                      <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                        <Tooltip
                          title={
                            <Typography
                              fontSize={16}
                            >{`Experience`}</Typography>
                          }
                        >
                          <IconButton>
                            <InfoOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    {/* </div> */}

                    {experiences.map((experience: any, i) => (
                      <div>
                        <div className="flex items-center gap-4" key={i}>
                          <div className="flex items-center mb-2">
                            <TextField
                              type="text"
                              className="h-9 outline-none focus:border-b-2 border-blue-500 text- base text-black w-full mt-4"
                              label="Position"
                              placeholder="eg.sales manager"
                              value={experience.position}
                              onChange={(e) => {
                                changeExpPositionOptionValue(e.target.value, i);
                              }}
                            />
                          </div>
                          <div className="flex items-center mb-2">
                            <TextField
                              type="text"
                              className="h-9 outline-none focus:border-b-2 border-blue-500 text- base text-black w-full mt-4"
                              label="Start Date"
                              placeholder="mmm/ddd/yyy"
                              value={experience.startDate}
                              onChange={(e) => {
                                changeExpStartOptionValue(e.target.value, i);
                              }}
                            />
                          </div>
                          <div className="flex items-center mb-2">
                            <TextField
                              type="text"
                              className="h-9 outline-none focus:border-b-2 border-blue-500 text- base text-black w-full mt-4"
                              label="End Date"
                              placeholder="mmm/ddd/yyy"
                              value={experience.endDate}
                              onChange={(e) => {
                                changeExpEndOptionValue(e.target.value, i);
                              }}
                            />
                          </div>
                          <IconButton
                            key={i}
                            aria-label="delete"
                            onClick={() => {
                              removeExpOption(i);
                            }}
                          >
                            <Close />
                          </IconButton>
                        </div>
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
                            onClick={() => addExpOption()}
                          >
                            Add experience
                          </Button>
                        </div>
                      }
                    ></FormControlLabel>
                  </Grid>

                  <Grid item xs={12}>
                    {/* <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 mb-8"> */}
                    <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                      <p className="text-lg font-bold">Education</p>
                      <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                        <Tooltip
                          title={
                            <Typography fontSize={16}>{`Education`}</Typography>
                          }
                        >
                          <IconButton>
                            <InfoOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    {/* </div> */}

                    {education.map((edu, i) => (
                      <div>
                        <div className="flex items-center gap-4" key={i}>
                          <div className="flex items-center mb-2">
                            <TextField
                              type="text"
                              className="h-9 outline-none focus:border-b-2 border-blue-500 text- base text-black w-full mt-4"
                              label="School"
                              placeholder="eg.yale university"
                              value={edu.school}
                              onChange={(e) => {
                                changeEduSchoolOptionValue(e.target.value, i);
                              }}
                            />
                          </div>
                          <div className="flex items-center mb-2">
                            <TextField
                              type="text"
                              className="h-9 outline-none focus:border-b-2 border-blue-500 text- base text-black w-full mt-4"
                              label="Certificate"
                              placeholder="eg. BA psychology"
                              value={edu.certificate}
                              onChange={(e) => {
                                changeEduCertificateOptionValue(
                                  e.target.value,
                                  i
                                );
                              }}
                            />
                          </div>
                          <div className="flex items-center mb-2">
                            <TextField
                              type="text"
                              className="h-9 outline-none focus:border-b-2 border-blue-500 text- base text-black w-full mt-4"
                              label="Start Date"
                              placeholder="mmm/ddd/yyy"
                              value={edu.startDate}
                              onChange={(e) => {
                                changeEduStartOptionValue(e.target.value, i);
                              }}
                            />
                          </div>
                          <div className="flex items-center mb-2">
                            <TextField
                              type="text"
                              className="h-9 outline-none focus:border-b-2 border-blue-500 text- base text-black w-full mt-4"
                              label="End Date"
                              placeholder="mmm/ddd/yyy"
                              value={edu.endDate}
                              onChange={(e) => {
                                changeEduEndDateOptionValue(e.target.value, i);
                              }}
                            />
                          </div>
                          <IconButton
                            key={i}
                            aria-label="delete"
                            onClick={() => {
                              removeEduOption(i);
                            }}
                          >
                            <Close />
                          </IconButton>
                        </div>
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
                            onClick={() => addEduOption()}
                          >
                            Add Education
                          </Button>
                        </div>
                      }
                    ></FormControlLabel>
                  </Grid>

                  {/* <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="text-black bg-slate-50"
                      // onClick={handleSubmit}
                    >
                      Add Employee
                    </Button>
                  </Grid> */}
                  <div className="container mx-auto w-11/12 xl:w-full">
                    <div className="w-full py-4 sm:px-0 flex justify-end">
                      <button
                        role="button"
                        aria-label="cancel form"
                        className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        role="button"
                        aria-label="Save form"
                        className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
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
