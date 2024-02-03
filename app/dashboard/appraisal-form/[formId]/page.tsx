"use client";
import type { Metadata } from "next";
import { getForm } from "@/lib/actions";
import Form from "@/components/Form";

type Params = {
  params: {
    formId: string;
  };
};

// export const generateMetadata = async ({
//   params: { formId },
// }: Params): Promise<Metadata> => {
//   const formData: Promise<Forms> = getForm(formId);
//   const form: Forms = await formData;

//   if (!form) {
//     return {
//       title: "Form not found",
//     };
//   }

//   return {
//     title: `${form.employeeName} appraisal form`,
//     description: `This page displays ${form.employeeName} appraisal form details`,
//   };
// };

export default async function FormPage({ params: { formId } }: Params) {
  const formData: Promise<Forms> = getForm(formId);

  const form = await formData;
  return <Form form={form} />;
}
