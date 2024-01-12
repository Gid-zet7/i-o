"use client";

import Link from "next/link";

import Button from "./Button";

const AuthProvider = () => {
  return (
    <div className="flex flex-row gap-3">
      <Link href={`/login`}>
        <Button title="Sign In" />
      </Link>
    </div>
  );
};

export default AuthProvider;
