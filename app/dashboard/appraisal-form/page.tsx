"use client";

import { getAllForms } from "@/lib/actions";
import FormsCard from "@/components/Appraisal/FormsCard";
import SideMenu from "@/stories/SideMenu/SideMenu";

export default async function FormsPage() {
  const formsData: Promise<Forms[]> = getAllForms();

  const forms = await formsData;

  return (
    <div className="max-w-7xl mx-auto p-3">
      <SideMenu />
      <FormsCard forms={forms} />
    </div>
  );
}
