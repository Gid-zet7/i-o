"use client";

import { Paper, Avatar, Box } from "@mui/material";
import Link from "next/link";

type Props = {
  id: string;
  image?: string;
  username?: string;
  firstname: string;
  lastname: string;
  position?: string;
  department: string;
  projects?: string[];
};

const Card = ({
  id,
  image,
  username,
  firstname,
  lastname,
  position,
  department,
  projects,
}: Props) => {
  return (
    <section
      style={{ fontFamily: "Montserrat" }}
      className=" bg-[#071e34] flex font-medium items-center justify-center rounded-2xl"
    >
      <Paper className="w-64 mx-auto rounded-2xl px-8 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <Link href={`/dashboard/employees/${id}`}>
            <span className="text-black text-sm bg-emerald-400 p-2 rounded-md">
              View profile
            </span>
          </Link>

          {/* <span className="text-emerald-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </span> */}
        </div>
        <div className="mt-6 w-fit mx-auto">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              sx={{
                height: 100,
                width: 100,
                // marginBottom: 2,
              }}
              src={image}
            />
          </Box>
        </div>

        <div className="mt-8 ">
          <h2 className=" font-bold text-2xl tracking-wide">
            {firstname} <br /> {lastname}
          </h2>
        </div>
        <p className="text-emerald-400 font-semibold mt-2.5">Active</p>
        <div className="mt-3 text-sm">
          <span className="text-gray-400 font-semibold">Department: </span>
          <span>{department}</span>
        </div>
        <div className="mt-3 text-sm">
          <span className="text-gray-400 font-semibold">Position: </span>
          <span>{position}</span>
        </div>
      </Paper>
    </section>
  );
};

export default Card;
