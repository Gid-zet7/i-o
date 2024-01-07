"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  image?: string;
  username?: string;
  firstname: string;
  lastname: string;
  position?: string;
  skills?: string[];
  projects?: string[];
};

const Card = ({
  id,
  image,
  username,
  firstname,
  lastname,
  position,
  skills,
  projects,
}: Props) => {
  return (
    <div className="flexCenter flex-col rounded-2xl shadow-md dark:bg-slate-100 dark:text-black min-w-1/4">
      <Link href={`/employees/${id}`} className="flexCenter group relative">
        {image ? (
          <Image
            src={image}
            width={130}
            height={80}
            className="object-cover rounded-t-2xl w-auto"
            alt="employee image"
          />
        ) : (
          <Image
            src="/undraw_male_avatar_g98d.svg"
            width={130}
            height={80}
            className="object-cover rounded-t-2xl w-auto"
            alt="employee image"
          />
        )}
      </Link>

      <div className="flexBetween px-2 mt-3 font-semibold text-sm">
        <div>
          <p> {username} </p>
          <p>
            {" "}
            {firstname} {lastname}{" "}
          </p>
          <p> {position} </p>
          <p> {projects} </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
