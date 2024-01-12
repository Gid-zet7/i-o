import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import React from "react";
import Navbar from "@/components/Navbar";
import Subfields from "@/components/Subfields";

export default async function DashBoard() {
  const session = await getCurrentUser();

  let employeesButton;
  if (session?.user._doc.roles.includes("Employee" || "Manager" || "Admin")) {
    employeesButton = (
      <Link href={`http://localhost:3000/dashboard/employees`}>
        <button> Employees </button>
      </Link>
    );
  }

  return (
    <>
      <Navbar />
      <Subfields />
      <nav>{employeesButton} </nav>
    </>
  );
}
