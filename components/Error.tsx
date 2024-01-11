import React from "react";
import Button from "./Button";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="grid place-content-center mt-32 gap-8">
      <div className="flex flex-col items-center gap-8 shadow-xl  p-8 rounded-3xl bg-slate-200">
        <h1 className="text-3xl font-semibold text-black">
          OOPS {error.message}
        </h1>
        <p className="text-xl text-black font-semibold">
          Your Session expired!
        </p>
        <Image
          src={"/warning-alert-svgrepo-com.svg"}
          alt="An illustration of man who has been denied access"
          width={100}
          height={60}
        />
        <Button
          title="Please in sign in again"
          bgColor="bg-red-600"
          handleClick={() => signIn()}
        />
      </div>
    </div>
  );
}
