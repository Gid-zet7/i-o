"use client";
import Paper from "@mui/material/Paper";
import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function Features() {
  return (
    <div className="flex">
      <div className="flex flex-col justify-center text-center">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/team-svgrepo-com.svg"}
            alt="analysis"
            width={100}
            height={30}
            className="items-center"
          />
          <Typography
            fontSize={"h3"}
            color={"lightslategrey"}
            className=" mb-1 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300"
          >
            Employee Management
          </Typography>
        </div>

        <div className="p-4 w-96">
          <a href="/selection-and-placement" className="group">
            <Typography
              color={"lightslategrey"}
              className="mb-4 text-base font-normal "
            >
              Simplify HR tasks with efficient employee information management
              through our centralized database
            </Typography>
            <Typography className="">
              Read more{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </Typography>
          </a>
        </div>
      </div>

      <div className="flex flex-col justify-center text-center">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/analysis.svg"}
            alt="analysis"
            width={100}
            height={30}
            className="items-center"
          />
          <Typography
            fontSize={"h3"}
            color={"lightslategrey"}
            className=" mb-1 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300"
          >
            Analytics Dashboard
          </Typography>
        </div>

        <div className="p-4 w-96">
          <a href="/selection-and-placement" className="group">
            <Typography
              color={"lightslategrey"}
              className="mb-4 text-base font-normal "
            >
              Make data-driven decisions and faster professional growth with our
              performance analytics dashboard
            </Typography>
            <Typography className="">
              Read more{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </Typography>
          </a>
        </div>
      </div>

      <div className="flex flex-col justify-center text-center">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/analysis.svg"}
            alt="analysis"
            width={100}
            height={30}
            className="items-center"
          />
          <Typography
            fontSize={"h3"}
            color={"lightslategrey"}
            className=" mb-1 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300"
          >
            Analytics Dashboard
          </Typography>
        </div>

        <div className="p-4 w-96">
          <a href="/selection-and-placement" className="group">
            <Typography
              color={"lightslategrey"}
              className="mb-4 text-base font-normal "
            >
              Make data-driven decisions and faster professional growth with our
              performance analytics dashboard
            </Typography>
            <Typography className="">
              Read more{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </Typography>
          </a>
        </div>
      </div>
    </div>
  );
}
