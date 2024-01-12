"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      console.log(res);

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      setError("");
      setIsSuccess("Successful login");
      router.push("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* p-12 flex items-center flex-col-reverse md:flex-row gap-10 w-full */}
      <div className="flex items-center justify-center bg-slate-200 h-screen text-black dark:text-white dark:bg-gray-800">
        <div className="shadow-xl bg-white dark:bg-black dark:border-white dark:border-1 min-w-1/5 p-7 md:px-20 md:py-16 rounded-2xl">
          <h1 className="text-xl font-bold my-4 grid place-content-center">
            Sign in
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* <label htmlFor="username">Username</label> */}
            <input
              id="username"
              name="username"
              className="p-2 rounded text-black outline-none bg-slate-200 text-xs"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />
            {/* <label htmlFor="password">Password</label> */}
            <input
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="p-2 rounded text-black outline-none bg-slate-200 text-xs"
            />
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-black font-bold cursor-pointer px-6 py-2 rounded-lg hover:opacity-90  ">
              Login
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}

            <Link className="text-sm mt-3 text-right" href={"/register"}>
              Don't have an account?{" "}
              <span className="underline blue_gradient">Register</span>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
