"use client";

import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAddNewDataFormMutation } from "./dataFormsApiSlice";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import MenuItem from "@mui/material/MenuItem";
import {
  ShortText,
  Subject,
  FilterNone,
  Close,
  CheckBox,
  Delete,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Paper, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import SideMenu from "@/stories/SideMenu/SideMenu";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";

const AppraisalForm = () => {
  //   const navigate = useNavigate();

  const [employeeName, setEmployeeName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfReview, setDateOfReview] = useState("");
  const [typeOfReview, setTypeOfReview] = useState("");

  //   const { Username } = useAuth();

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

  const [error, setError] = useState("");
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

  function addQuestionType(i: number, type: string) {
    let ques = [...questions];
    ques[i].questionType = type;
    ques[i].options.optionId = type;
    if (type === "text" && ques[i].options.length > 1) {
      ques[i].options.splice(1);
    }
    setQuestions(ques);
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

  //   useEffect(() => {
  //     if (isSuccess) {
  //       setFormTitle("");
  //       setFormDesc("");
  //       setQuestions("");
  //       navigate("/dashboard/dataforms");
  //     }
  //   }, [isSuccess, navigate]);

  const onSaveFormClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("something");

    if (
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
      const result = await fetch(
        "http://localhost:3000/api/appraisal-form/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeName,
            position,
            department,
            dateOfReview,
            typeOfReview,
            questions,
          }),
        }
      );

      if (result.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/");
      } else {
        console.log("failed to create from.");
      }
    } catch (error) {
      console.log("Error: ", error);
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
          <AccordionSummary
            // aria-controls="panelia-content"
            // id="panelia-header"
            // elevation={1}
            // style={{ width: "100%" }}
            className="w-full"
          >
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
                            // style={{
                            //   marginRight: "8px",
                            // }}
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
                              // color: "#202124",
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
                  <Select
                    className="select"
                    style={{
                      color: "#5f6368",
                      fontSize: ".8rem",
                      width: "clamp(3rem, 10vw, 8rem)",
                    }}
                    value="select"
                  >
                    <MenuItem
                      className="text-slate-400"
                      id="text"
                      value="Text"
                      onClick={() => addQuestionType(i, "text")}
                    >
                      <Subject style={{ marginRight: "10px" }} />
                      Paragraph
                    </MenuItem>
                    <MenuItem
                      className="text-slate-400"
                      id="checkbox"
                      value="Checkbox"
                      onClick={() => addQuestionType(i, "checkbox")}
                    >
                      <CheckBox
                        // style={{ marginRight: "10px", color: "#70757a" }}
                        // checked
                        className="mr-3 text-slate-500"
                      />
                      Checkbox
                    </MenuItem>
                    <MenuItem
                      className="text-slate-400"
                      id="radio"
                      value="Radio"
                      onClick={() => addQuestionType(i, "radio")}
                    >
                      <Radio
                        style={{ marginRight: "10px", color: "#70757a" }}
                        checked
                      />
                      Multiple Choice
                    </MenuItem>
                  </Select>
                </div>
                {question.options.map((op, j) => (
                  <div className="flex items-center" key={j}>
                    {question.questionType !== "text" ? (
                      <input
                        type={question.questionType}
                        style={{ marginRight: "10px" }}
                      />
                    ) : (
                      <ShortText style={{ marginRight: "10px" }} />
                    )}
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

                {question.options.optionId !== "text" &&
                question.options.length < 5 ? (
                  <div className="flex items-center">
                    <FormControlLabel
                      disabled
                      control={
                        question.questionType !== "text" ? (
                          <input
                            type={question.questionType}
                            color="primary"
                            style={{
                              marginLeft: "10px",
                              marginRight: "10px",
                            }}
                            disabled
                          />
                        ) : (
                          <ShortText style={{ marginRight: "10px" }} />
                        )
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
                  {/* <Select
                    id="review"
                    required
                    fullWidth
                    name="review"
                    // className="text-black"
                    label="Type of Review"
                    value={typeOfReview}
                  >
                    <MenuItem>Six-Month Review</MenuItem>
                    <MenuItem>Annual Review</MenuItem>
                  </Select> */}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        {questionsUI()}
        <div className="save_form">
          <button
            // variant="contained"
            // color="primary"
            // style={{ fontSize: "14px" }}
            onClick={onSaveFormClicked}
            //   disabled={!canSave}
            className="text-base font-medium bg-green-400 text-black hover:opacity-90 p-3 rounded-lg"
          >
            Save Form
          </button>
        </div>
        {/* <div className="flex flex-col items-center">

        <br></br>
        <div className="w-11/12">
          <div className="question_title_section">
            <div className="flex flex-col gap-6 bg-white border-2 rounded-lg py-8 px-7 capitalize">
              <input
                type="text"
                className="box-border text-2xl font-medium w-full border-none border-b-2 h-10 outline-none"
                style={{ color: "black" }}
                placeholder="Untitled document"
                name="research_title"
                onChange={(e) => {
                  setFormTitle(e.target.value);
                }}
              />
              <input
                type="text"
                className="border-none outline-none text-black"
                placeholder="Form description"
                name="research_desc"
                onChange={(e) => {
                  setFormDesc(e.target.value);
                }}
              />
            </div>
          </div>
          {questionsUI()}
          <div className="save_form">
            <button
              // variant="contained"
              // color="primary"
              // style={{ fontSize: "14px" }}
              onClick={onSaveFormClicked}
              //   disabled={!canSave}
              className="text-base font-medium bg-green-400 text-black hover:opacity-90 p-3 rounded-lg"
            >
              Save Form
            </button>
          </div>
        </div>
      </div> */}
      </section>
    </>
  );
};

export default AppraisalForm;
