"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Paper, Box, Grid, TextField } from "@mui/material";

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
      <Paper className="flex items-center justify-center  h-screen  z-10">
        <Box>
          <Paper className="shadow-xl  dark:border-1 min-w-1/5 p-7 md:px-20 md:py-16 rounded-2xl z-10">
            <h1 className="text-xl font-bold my-4 grid place-content-center">
              Sign in
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Grid item xs={12} sm={6} mb={2}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} mb={2}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-black font-bold cursor-pointer px-6 py-4 rounded-lg hover:opacity-90 ">
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
          </Paper>
        </Box>
      </Paper>
    </>
  );
}
