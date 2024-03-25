"use client";
// import type { Metadata } from "next";
import { getForm } from "@/lib/actions";
import Form from "@/components/Appraisal/Form";

type Params = {
  params: {
    formId: string;
  };
};

// export const generateMetadata = async ({
//   params: { formId },
// }: Params): Promise<Metadata> => {
//   const formData: Promise<Forms> = getForm(formId);
//   const form = await formData;

//   if (!form) {
//     return {
//       title: "Form not found",
//     };
//   }

//   return {
//     title: `${form?.employeeName} appraisal form`,
//     description: `This page displays ${form?.employeeName} appraisal form`,
//   };
// };

export default async function EmployeeAppraialForm({
  params: { formId },
}: Params) {
  const formData: Promise<Forms> = getForm(formId);
  const form: Forms = await formData;

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <>
      <Form form={form} />
    </>
  );
}
