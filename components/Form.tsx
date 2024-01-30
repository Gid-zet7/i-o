import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Button from "@mui/material/Button";
import { addPerformance } from "@/lib/actions";
import { useSession } from "next-auth/react";

type Params = {
  form: Forms;
};

export default function Form({ form }: Params) {
  const { data: session } = useSession();
  const [data, setData] = useState(
    form.questions.map((question) => {
      return { question: question.questionText, response: "" };
    })
  );

  const onResponseChanged = (
    response: string,
    question: string,
    index: number
  ) => {
    console.log(response, question, index);
    let newData = [...data];
    console.log(newData);
    newData[index].question = question;
    newData[index].response = response;
    setData(newData);
  };

  const onSubmitForm = async () => {
    addPerformance(session, form.employeeName, form.dateOfReview, data);
  };

  // const onDeleteButtonClicked = async () => {
  //   await deleteDataform({
  //     id: dataformId,
  //   });
  // };

  // let deleteButton;
  // if (dataform.user_id?.username === Username) {
  //   deleteButton = (
  //     <div>
  //       <Button
  //         variant="contained"
  //         color="error"
  //         style={{
  //           fontSize: "14px",
  //           maxWidth: "20rem",
  //           // backgroundColor: "tomato",
  //         }}
  //         onClick={onDeleteButtonClicked}
  //         // disabled={!canSave}
  //       >
  //         Delete
  //       </Button>
  //     </div>
  //   );
  // }

  if (form) {
    // const handleEdit = () => navigate(`/dashboard/dataforms/${dataformId}`);

    return (
      <section className="mx-auto max-w-6xl p-3 md:ml-64">
        <form className="data-form">
          <Paper className="rounded-lg mb-4 border-t-4 border-red-600">
            <div className="p-4">
              <Typography fontSize={"h6"} marginBottom={3}>
                <span className="font-bold text-xl">Employee name: </span>
                <span className="font-medium">{form.employeeName}</span>
              </Typography>
              <Typography fontSize={"h6"} marginBottom={3}>
                <span className="font-bold text-xl">Position: </span>
                <span className="font-medium">{form.position} </span>
              </Typography>
              <Typography fontSize={"h6"} marginBottom={3}>
                <span className="font-bold text-xl">Department: </span>
                <span className="font-medium">{form.department} </span>
              </Typography>
              <Typography fontSize={"h6"} marginBottom={3}>
                <span className="font-bold text-xl">Type of Review: </span>
                <span className="font-medium">{form.typeOfReview} </span>
              </Typography>
            </div>
          </Paper>

          {form.questions.map((question, i: number) => {
            return (
              <Paper
                className="rounded-lg mb-3 p-4 border-l-4 border-red-600"
                key={i}
              >
                <p className="font-medium text-2xl mb-4">
                  {i + 1}. {question.questionText}
                </p>
                {question.options.map((option, j) => {
                  return (
                    <div key={j}>
                      <label htmlFor={option.optionText}>
                        <input
                          className="mb-4"
                          type="radio"
                          value={option.optionText}
                          name={question.questionText}
                          onChange={(e) => {
                            onResponseChanged(e.target.value, e.target.name, i);
                          }}
                        />
                        <span className="ml-2 ">{option.optionText}</span>
                      </label>
                    </div>
                  );
                })}
              </Paper>
            );
          })}
          <div className="flex">
            <Button
              variant="contained"
              color="secondary"
              className=" text-blue-300"
              onClick={onSubmitForm}
              // disabled={!canSave}
            >
              Submit
            </Button>
            {/* {deleteButton} */}
          </div>
        </form>
      </section>
    );
  } else return null;
}
