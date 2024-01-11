"use client";

import { signIn } from "next-auth/react";

import Button from "./Button";

const AuthProvider = () => {
  return (
    <div className="flex flex-row gap-3">
      <Button title="Sign In" handleClick={() => signIn()} />
    </div>
  );
};

export default AuthProvider;
