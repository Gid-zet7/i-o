"use client";
import Paper from "@mui/material/Paper";
import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";

export default function Services() {
  React.useEffect(() => {
    const scrollImages = document.querySelector(
      ".scroll-images"
    ) as HTMLElement;
    const scrollLength = scrollImages.scrollWidth - scrollImages.clientWidth;
    const leftButton = document.querySelector(".left") as HTMLElement;
    const rightButton = document.querySelector(".right") as HTMLElement;

    function checkScroll() {
      const currentScroll = scrollImages.scrollLeft;
      if (currentScroll === 0) {
        leftButton.setAttribute("disabled", "true");
        rightButton.removeAttribute("disabled");
      } else if (currentScroll === scrollLength) {
        rightButton.setAttribute("disabled", "true");
        leftButton.removeAttribute("disabled");
      } else {
        leftButton.removeAttribute("disabled");
        rightButton.removeAttribute("disabled");
      }
    }

    scrollImages.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    checkScroll();

    function leftScroll() {
      scrollImages.scrollBy({
        left: -100,
        behavior: "smooth",
      });
      console.log("left");
    }

    function rightScroll() {
      scrollImages.scrollBy({
        left: 100,
        behavior: "smooth",
      });
      console.log("right");
    }

    leftButton.addEventListener("click", leftScroll);
    rightButton.addEventListener("click", rightScroll);

    // Cleanup function
    return () => {
      scrollImages.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      leftButton.removeEventListener("click", leftScroll);
      rightButton.removeEventListener("click", rightScroll);
    };
  }, []);
  return (
    <div className="cover no-scrollbar">
      <button className="left button">
        <span>
          <KeyboardDoubleArrowLeft />
        </span>
      </button>
      <div className="scroll-images">
        <div className="child">
          <div className="mb-10">
            {/* <span className="absolute flex items-center justify-center w-4 h-4 bg-blue-100 rounded-full -start-2 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-500"></span> */}
            <Typography
              fontSize={"h3"}
              color={"lightslategrey"}
              className="flex items-center mb-1 text-lg font-semibold"
            >
              Job Analysis
            </Typography>
            <Paper className="p-4 w-96 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600">
              {/* <div>
                <Image
                  src={"/real-time-analysis.svg"}
                  alt="real-time-analysis"
                  width={200}
                  height={80}
                  className="object-cover"
                />
              </div> */}
              <Typography
                color={"lightslategrey"}
                className="mb-4 text-base font-normal text-gray-200"
              >
                Job analysis is a fundamental part of the practice of
                industrial/organizational psychology. It involves the
                determination of the tasks that make up a job, the tasks&apos;
                relative importance, and what knowledge, skills, and abilities
                are necessary to successfully carry out those tasks
              </Typography>
              <Link href="/selection-and-placement">
                <Typography className="hover:underline">
                  Read more <span>→</span>
                </Typography>
              </Link>
            </Paper>
          </div>
        </div>

        <div className="child">
          <div className="mb-10 ms-6">
            <Typography
              fontSize={"h3"}
              color={"lightslategrey"}
              className="flex items-center mb-1 text-lg font-semibold"
            >
              Training and Development
            </Typography>
            <Paper className="p-4 w-96 rounded-2xl bg-gradient-to-r from-indigo-400 to-cyan-400">
              {/* <div>
                <Image
                  src={"/training.svg"}
                  alt="real-time-analysis"
                  width={200}
                  height={80}
                  className="object-cover"
                />
              </div> */}
              <Typography
                color={"lightslategrey"}
                className="mb-4 text-base font-normal text-gray-200"
              >
                Training and Development is concerned with specialised
                activities aimed at bettering the performance of individuals and
                groups in organisational settings.
              </Typography>
              <Link href="/selection-and-placement">
                <Typography className="hover:underline">
                  Read more <span>→</span>
                </Typography>
              </Link>
            </Paper>
          </div>
        </div>

        <div className="child">
          <div className="ms-6 mb-16">
            <Typography
              fontSize={"h3"}
              color={"lightslategrey"}
              className="flex items-center mb-1 text-lg font-semibold"
            >
              Performance Appraisal
            </Typography>
            <Paper className="p-4 w-96 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500">
              {/* <div>
                <Image
                  src={"/stepping-up.svg"}
                  alt="stepping up"
                  width={200}
                  height={80}
                  className="object-cover"
                />
              </div> */}
              <Typography
                color={"lightslategrey"}
                className="mb-4 text-base font-normal text-gray-200"
              >
                Some call it performance evaluation. It is the systematic review
                and evaluation of job performance, as well as the provision of
                feedback. It is done mostly once in a year Some do it at the end
                of business year, others do it six months
              </Typography>
              <Link href="/selection-and-placement">
                <Typography className="hover:underline">
                  Read more <span>→</span>
                </Typography>
              </Link>
            </Paper>
          </div>
        </div>
        <div className="child">
          <div className="ms-6 mb-16">
            <Typography
              fontSize={"h3"}
              color={"lightslategrey"}
              className="flex items-center mb-1 text-lg font-semibold"
            >
              Performance Appraisal
            </Typography>
            <Paper className="p-4 w-96 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400">
              {/* <div>
                <Image
                  src={"/stepping-up.svg"}
                  alt="stepping up"
                  width={200}
                  height={80}
                  className="object-cover"
                />
              </div> */}
              <Typography
                color={"lightslategrey"}
                className="mb-4 text-base font-normal text-gray-200"
              >
                Some call it performance evaluation. It is the systematic review
                and evaluation of job performance, as well as the provision of
                feedback. It is done mostly once in a year Some do it at the end
                of business year, others do it six months
              </Typography>
              <Link href="/selection-and-placement">
                <Typography className="hover:underline">
                  Read more <span>→</span>
                </Typography>
              </Link>
            </Paper>
          </div>
        </div>

        <div className="child">
          <div className="ms-6 mb-16">
            <Typography
              fontSize={"h3"}
              color={"lightslategrey"}
              className="flex items-center mb-1 text-lg font-semibold"
            >
              Performance Appraisal
            </Typography>
            <Paper className="p-4 w-96 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-900">
              {/* <div>
                <Image
                  src={"/stepping-up.svg"}
                  alt="stepping up"
                  width={200}
                  height={80}
                  className="object-cover"
                />
              </div> */}
              <Typography
                color={"lightslategrey"}
                className="mb-4 text-base font-normal text-gray-200"
              >
                Some call it performance evaluation. It is the systematic review
                and evaluation of job performance, as well as the provision of
                feedback. It is done mostly once in a year Some do it at the end
                of business year, others do it six months
              </Typography>
              <Link href="/selection-and-placement">
                <Typography className="hover:underline">
                  Read more <span>→</span>
                </Typography>
              </Link>
            </Paper>
          </div>
        </div>
      </div>
      <button className="right button">
        <span>
          <KeyboardDoubleArrowRight className="" />
        </span>
      </button>
    </div>
  );
}
