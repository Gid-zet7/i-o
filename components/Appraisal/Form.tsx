import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Button from "@mui/material/Button";
import { addPerformance } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Params = {
  form: Forms;
};

export default function Form({ form }: Params) {
  const { data: session } = useSession();
  const router = useRouter();
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
    // console.log(newData);
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
          <Paper className=" p-2 border-t-4 border-green-400 grid md:grid-cols-2 mb-4">
            <div className="p-2 font-semibold">Employee</div>
            <div className="p-2 text-sm text-gray-500 hover:text-gray-600 leading-6">
              {form.employeeName}
            </div>
            <div className="p-2 font-semibold">Department</div>
            <div className="p-2 text-sm text-gray-500 hover:text-gray-600 leading-6">
              {form.department}
            </div>
            <div className="p-2 font-semibold">Position</div>
            <div className="p-2 text-sm text-gray-500 hover:text-gray-600 leading-6">
              {form.position}
            </div>
            <div className="p-2 font-semibold">Type of review</div>
            <div className="p-2 text-sm text-gray-500 hover:text-gray-600 leading-6">
              {form.typeOfReview}
            </div>
          </Paper>

          {form.questions.map((question, i: number) => {
            return (
              <Paper
                className="rounded-lg mb-3 p-4 border-l-2 border-green-400"
                key={i}
              >
                <p className="font-semibold mb-4">
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
            <Button
              variant="contained"
              color="primary"
              className=" text-blue-300"
              onClick={router.back}
              // disabled={!canSave}
            >
              Cancel
            </Button>
            {/* {deleteButton} */}
          </div>
        </form>
      </section>
    );
  } else return null;
}
