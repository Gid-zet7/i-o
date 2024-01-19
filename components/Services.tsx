import { Paper } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-4 h-4 bg-blue-100 rounded-full -start-2 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-500"></span>
        <Typography
          fontSize={"h3"}
          color={"lightslategrey"}
          className="flex items-center mb-1 text-lg font-semibold"
        >
          Job Analysis
        </Typography>
        <Paper className="p-4 max-w-3xl">
          <div>
            <Image
              src={"/real-time-analysis.svg"}
              alt="real-time-analysis"
              width={200}
              height={80}
              className="object-cover"
            />
          </div>
          <Typography
            color={"lightslategrey"}
            className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
          >
            Job analysis is a fundamental part of the practice of
            industrial/organizational psychology. It involves the determination
            of the tasks that make up a job, the tasks&apos; relative
            importance, and what knowledge, skills, and abilities are necessary
            to successfully carry out those tasks
          </Typography>
          <Link href="/selection-and-placement">
            <Typography className="hover:underline">
              Read more <span>→</span>
            </Typography>
          </Link>
        </Paper>
      </li>
      <li className="mb-10 ms-6">
        <span className="absolute flex items-center justify-center w-4 h-4 bg-blue-100 rounded-full -start-2 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <svg
            className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </span>
        <Typography
          fontSize={"h3"}
          color={"lightslategrey"}
          className="flex items-center mb-1 text-lg font-semibold"
        >
          Training and Development
        </Typography>
        <Paper className="p-4 max-w-xl">
          <div>
            <Image
              src={"/training.svg"}
              alt="real-time-analysis"
              width={200}
              height={80}
              className="object-cover"
            />
          </div>
          <Typography
            color={"lightslategrey"}
            className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
          >
            Training and Development is concerned with specialised activities
            aimed at bettering the performance of individuals and groups in
            organisational settings.
          </Typography>
          <Link href="/selection-and-placement">
            <Typography className="hover:underline">
              Read more <span>→</span>
            </Typography>
          </Link>
        </Paper>
      </li>
      <li className="ms-6">
        <span className="absolute flex items-center justify-center w-4 h-4 bg-blue-100 rounded-full -start-2 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <svg
            className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </span>
        <Typography
          fontSize={"h3"}
          color={"lightslategrey"}
          className="flex items-center mb-1 text-lg font-semibold"
        >
          Performance Appraisal
        </Typography>
        <Paper className="p-4 max-w-xl">
          <div>
            <Image
              src={"/stepping-up.svg"}
              alt="stepping up"
              width={200}
              height={80}
              className="object-cover"
            />
          </div>
          <Typography
            color={"lightslategrey"}
            className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
          >
            Some call it performance evaluation. It is the systematic review and
            evaluation of job performance, as well as the provision of feedback.
            It is done mostly once in a year Some do it at the end of business
            year, others do it six months
          </Typography>
          <Link href="/selection-and-placement">
            <Typography className="hover:underline">
              Read more <span>→</span>
            </Typography>
          </Link>
        </Paper>
      </li>
    </ol>
  );
}
