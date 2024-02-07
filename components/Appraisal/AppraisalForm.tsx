"use client";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { FilterNone, Close, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import {
  Paper,
  TextField,
  Box,
  Grid,
  InputLabel,
  FormControlLabel,
  Select,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Button,
  MenuItem,
  FormControl,
} from "@mui/material";
import SideMenu from "@/stories/SideMenu/SideMenu";
import { createForm } from "@/lib/actions";
import { useSession } from "next-auth/react";

const AppraisalForm = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfReview, setDateOfReview] = useState("");
  const [typeOfReview, setTypeOfReview] = useState("");

  const [questions, setQuestions] = useState<Questions>([
    {
      questionText: "",
      questionType: "radio",
      options: [{ optionText: "" }, { optionText: "" }, { optionText: "" }],
      type: false,
      open: true,
      required: false,
    },
  ]);

  const [error, setError] = useState<any>("");
  const [isSuccess, setIsSuccess] = useState<string>("");
  const router = useRouter();

  function changeQuestion(text: string, i: number) {
    let newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
  }

  function changeOptionValue(text: string, i: number, j: number) {
    let optionsQuestion = [...questions];
    optionsQuestion[i].options[j].optionText = text;
    setQuestions(optionsQuestion);
  }

  function removeOption(i: number, j: number) {
    let RemoveOptionQuestion = [...questions];
    if (RemoveOptionQuestion[i].options.length > 1) {
      RemoveOptionQuestion[i].options.splice(j, 1);
      setQuestions(RemoveOptionQuestion);
    }
  }

  function addOption(i: number) {
    let questionOptions = [...questions];
    if (questionOptions[i].options.length < 5) {
      questionOptions[i].options.push({
        optionText: "Option" + (questionOptions[i].options.length + 1),
      });
    } else {
      console.log("max reached");
    }

    setQuestions(questionOptions);
  }

  function copyQuestion(i: number) {
    expandCloseAll();
    let qs = [...questions];
    let newQuestion = { ...qs[i] };

    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(i: number) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  function requiredQuestion(i: number) {
    let reqQuestion = [...questions];
    reqQuestion[i].required = !reqQuestion[i].required;
    setQuestions(reqQuestion);
  }

  function addQuestionField() {
    expandCloseAll();
    setQuestions([
      ...questions,
      {
        questionText: "",
        questionType: "radio",
        options: [{ optionText: "" }],
        type: false,
        open: true,
        required: false,
      },
    ]);
  }

  function expandCloseAll() {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  }

  function handleExpand(i: number) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
  }

  const onSaveFormClicked = async () => {
    if (
      !title ||
      !employeeName ||
      !position ||
      !department ||
      !dateOfReview ||
      !typeOfReview ||
      !Array.isArray(questions) ||
      !questions.length
    ) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const result = await createForm(
        session,
        title,
        employeeName,
        position,
        department,
        dateOfReview,
        typeOfReview,
        questions
      );

      if (result !== undefined && result !== null) {
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

  //   const canSave = [formTitle, formDesc, questions].every(Boolean) && !isLoading;

  function questionsUI() {
    return questions.map((question, i) => (
      <>
        <Accordion
          expanded={questions[i].open}
          className={questions[i].open ? "add_border" : ""}
          onChange={() => {
            handleExpand(i);
          }}
        >
          <AccordionSummary className="w-full">
            {!questions[i].open ? (
              <div className="h-60 text-2xl p-4">
                <Typography
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    letterSpacing: ".2px",
                    lineHeight: "24px",
                    paddingBottom: "25px",
                  }}
                >
                  {i + 1}. {questions[i].questionText}
                </Typography>

                {question.options.map((op, j) => (
                  <div key={j}>
                    <div className="flex">
                      <FormControlLabel
                        style={{ marginLeft: "5px", marginBottom: "5px" }}
                        control={
                          <input
                            type={question.questionType}
                            color="primary"
                            className="mr-1"
                            required={question.type}
                            disabled
                          />
                        }
                        label={
                          <Typography
                            style={{
                              fontSize: ".9rem",
                              fontWeight: "400",
                              letterSpacing: ".2px",
                              lineHeight: "20px",
                            }}
                          >
                            {question.options[j].optionText}
                          </Typography>
                        }
                      ></FormControlLabel>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </AccordionSummary>
          {questions[i].open ? (
            <div className="flex flex-row justify-center">
              <AccordionDetails className="w-9/12 sm:7/12">
                <div className="flex gap-5 ">
                  <TextField
                    className=" w-9/12 sm:w-7/12 focus:border-b-2 border-blue-500 outline-none"
                    placeholder="eg. Knowledge of job?"
                    name="question"
                    value={question.questionText}
                    onChange={(e) => {
                      changeQuestion(e.target.value, i);
                    }}
                  />
                </div>
                {question.options.map((op, j) => (
                  <div className="flex items-center" key={j}>
                    <input type="radio" style={{ marginRight: "10px" }} />

                    <div>
                      <TextField
                        type="text"
                        className="h-9 outline-none focus:border-b-2 border-blue-500 text- base text-black w-full mt-4"
                        placeholder="option"
                        value={question.options[j].optionText}
                        onChange={(e) => {
                          changeOptionValue(e.target.value, i, j);
                        }}
                      />
                    </div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        removeOption(i, j);
                      }}
                    >
                      <Close />
                    </IconButton>
                  </div>
                ))}

                {question.options.length < 5 ? (
                  <div className="flex items-center">
                    <FormControlLabel
                      disabled
                      control={
                        <input
                          type="radio"
                          color="primary"
                          style={{
                            marginLeft: "10px",
                            marginRight: "10px",
                          }}
                          disabled
                        />
                      }
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
                            onClick={() => addOption(i)}
                          >
                            Add
                          </Button>
                        </div>
                      }
                    ></FormControlLabel>
                  </div>
                ) : (
                  ""
                )}
                <div className="add_footer mt-8">
                  <div className="add_question_bottom">
                    <IconButton
                      aria-label="Copy"
                      onClick={() => {
                        copyQuestion(i);
                      }}
                    >
                      <FilterNone />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        deleteQuestion(i);
                      }}
                    >
                      <Delete />
                    </IconButton>

                    <span style={{ color: "#5f6368", fontSize: "13px" }}>
                      Required
                    </span>
                    <IconButton
                      onClick={() => {
                        requiredQuestion(i);
                      }}
                    >
                      <Switch
                        name="checkbox"
                        color="primary"
                        checked={question.required}
                      />
                    </IconButton>

                    <div className="p-1 flex text-black rounded-xl bg-transparent">
                      <Button
                        className="text-slate-500 py-2.5 px-2"
                        onClick={addQuestionField}
                        variant="contained"
                      >
                        Add Field
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </div>
          ) : (
            " "
          )}
        </Accordion>
      </>
    ));
  }
  return (
    <>
      <SideMenu />

      <section className="mx-auto max-w-6xl p-3 md:ml-64">
        <h1 className="text-3xl text-center mb-4">Appraisal Form</h1>
        <Box>
          <Paper sx={{ padding: "1rem 2rem" }}>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={6} mb={2}>
                <TextField
                  required
                  fullWidth
                  label="Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} mb={2}>
                <TextField
                  required
                  fullWidth
                  label="Emploee name"
                  name="employee-name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} mb={2}>
                <TextField
                  required
                  fullWidth
                  label="Position"
                  name="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} mb={2}>
                <TextField
                  required
                  fullWidth
                  label="Department"
                  name="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} mb={2}>
                <TextField
                  required
                  fullWidth
                  label="Date of review"
                  name="date-of-review"
                  value={dateOfReview}
                  onChange={(e) => setDateOfReview(e.target.value)}
                />
              </Grid>
              {/* <InputLabel className="ml-0" id="review">
              Type of Review
            </InputLabel> */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="review">Type of Review*</InputLabel>
                    <Select
                      id="review"
                      required
                      labelId="Type of Review"
                      label="Type of Review"
                      onChange={(e) => setTypeOfReview(e.target.value)}
                      value={typeOfReview}
                    >
                      <MenuItem
                        key={"Six-month-review"}
                        value={"Six-Month Review"}
                      >
                        Six-Month Review
                      </MenuItem>
                      <MenuItem key={"annual-review"} value={"Annual Review"}>
                        Annual Review
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        {questionsUI()}
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
        <div className="save_form">
          <button
            onClick={onSaveFormClicked}
            className="text-base font-medium bg-green-400 text-black hover:opacity-90 p-3 rounded-lg"
          >
            Save Form
          </button>
        </div>
      </section>
    </>
  );
};

export default AppraisalForm;
