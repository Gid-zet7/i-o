"use client";

// import { getAllForms } from "@/lib/actions";
// import FormsCard from "@/components/Appraisal/FormsCard";

// import { useSession } from "next-auth/react";

// // export const metadata: Metadata = {
// //   title: "Forms",
// // };

// export default async function FormsPage() {
//   const { data: session } = useSession();
//   const formsData: Promise<Forms[]> = getAllForms(session);

//   const forms = await formsData;

//   // if (!Array.isArray(forms)) {
//   //   throw new Error("Forms data is not an array");
//   // }

//   const content = forms?.map((form) => {
//     return <FormsCard form={form} />;
//   });

//   return content;
// }

import { useEffect, useState } from "react";
import { getAllForms } from "@/lib/actions";
import FormsCard from "@/components/Appraisal/FormsCard";
import { useSession } from "next-auth/react";

export default function FormsPage() {
  const { data: session } = useSession();
  const [forms, setForms] = useState<Forms[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formsData: Forms[] = await getAllForms(session);
        setForms(formsData);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchData();
  }, [session]);

  const content = forms.map((form) => {
    return <FormsCard key={form._id} form={form} />;
  });

  return content;
}
