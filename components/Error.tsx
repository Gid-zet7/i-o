import React from "react";
import Button from "./Button";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="grid place-content-center mt-32 gap-8">
      <div className="flex flex-col items-center gap-8 shadow-indigo-500/50 border-2 dark:border-1 p-8 rounded-3xl">
        <h1 className="text-3xl font-semibold">OOPS {error.message}</h1>
        <p className="text-xl text-red-500">Your Session expired!</p>
        <Image
          src={"/undraw_access_denied_re_awnf.svg"}
          alt="An illustration of man who has been denied access"
          width={100}
          height={60}
        />
        <Button title="Please in sign in again" handleClick={() => signIn()} />
      </div>
    </div>
  );
}
