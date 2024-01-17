"use client";

import { Paper } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Typography from "@mui/material/Typography";

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
    <Paper className="rounded-lg">
      {image ? (
        <Link
          href={`/dashboard/employees/${id}`}
          className="flexCenter group relative"
        >
          <Image
            src={image}
            width={130}
            height={80}
            className="object-cover rounded-t-lg w-auto"
            alt="employee image"
          />
        </Link>
      ) : (
        <div className="flexCenter flex-col rounded-full shadow-md dark:bg-slate-100 dark:text-black min-w-1/4">
          <Link href={`/employees/${id}`} className="flexCenter group relative">
            <Image
              src="/undraw_male_avatar_g98d.svg"
              width={130}
              height={80}
              className="object-cover rounded-t-lg w-auto"
              alt="employee image"
            />
          </Link>
        </div>
      )}
      <div className="p-4">
        <Typography fontSize={"h6"} color={"lightslategrey"}>
          {firstname} {lastname}
        </Typography>
        <Typography fontSize={"h6"} color={"lightslategrey"}>
          {department}
        </Typography>
        <Typography fontSize={"h6"} color={"lightslategrey"}>
          {position}
        </Typography>
      </div>
    </Paper>
  );
};

export default Card;
