import React from "react";
import { Paper } from "@mui/material";
import Link from "next/link";

type Props = {
  form: Forms;
};

export default function FormsCard({ form }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <Link href={`http://localhost:3000/dashboard/appraisal-form/${form._id}`}>
        <Paper className=" p-2 border-t-4 border-green-400 grid md:grid-cols-2">
          <div className="p-2 font-semibold">Title</div>
          <div className="p-2 text-sm text-gray-500 hover:text-gray-600 leading-6">
            {form.title}
          </div>
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
      </Link>
    </div>
  );
}
