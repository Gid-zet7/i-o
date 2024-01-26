"use client";

import type { Metadata } from "next";
import { getAllForms } from "@/lib/actions";
import Forms from "@/components/Form";

// export const metadata: Metadata = {
//   title: "Forms",
// };

export default async function FormsPage() {
  const formsData: Promise<Forms[]> = getAllForms();

  const forms = await formsData;

  // const content = forms.map((form) => {
  //   return <h1>{form.form_title} </h1>;
  // });

  // return content;
  const content = forms.map((form) => {
    return <Forms form={form} />;
  });

  return content;
}
