import React from "react";
// import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import { Paper } from "@mui/material";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <Paper className=" h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold mb-8">404 - Page Not Found</h1>
        <p>{error.message}</p>
        <p className="text-gray-600 mb-6">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <a
          href="/"
          className="inline-block py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
        >
          Go back to homepage
        </a>
      </div>
    </Paper>
    // <div className="grid place-content-center mt-32 gap-8">
    //   <div className="flex flex-col items-center gap-8 shadow-xl  p-8 rounded-3xl bg-slate-200">
    //     <h1 className="text-3xl font-semibold text-black">
    //       OOPS {error.message}
    //     </h1>
    //     {error.message === "Unauthorized" ? (
    //       <p className="text-xl text-black font-semibold">
    //         Your Session expired!
    //       </p>
    //     ) : null}

    //     <Image
    //       src={"/warning-alert-svgrepo-com.svg"}
    //       alt="An illustration of man who has been denied access"
    //       width={100}
    //       height={60}
    //     />
    //     <Link href="/login">Login again</Link>
    //   </div>
    // </div>
  );
}
