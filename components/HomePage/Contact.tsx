import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function Contact() {
  return (
    <div id="contact">
      <h2 className="text-center blue_gradient my-4 text-3xl font-extrabold sm:text-8xl blue_gradient mb-4 pb-4 leading-tigh">
        Contact Us
      </h2>
      <form action="" className="items-center mx-auto flex flex-col gap-4 ">
        <div className=" mb-6 flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full">
          <label
            htmlFor="Email"
            className="pb-2 text-sm font-bold text-gray-100"
          >
            Email
          </label>
          <div className="border shadow-sm rounded flex border-gray-700">
            <div
              tabIndex={0}
              className="focus:outline-none px-4 py-3 flex items-center border-r border-gray-700"
            >
              <img
                className="dark:hidden"
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/simple_form-svg2.svg"
                alt="mail"
              />
              <img
                className="dark:block hidden"
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/simple_form-svg2dark.svg"
                alt="mail"
              />
            </div>
            <input
              tabIndex={0}
              type="text"
              id="Email"
              name="email"
              required
              className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-400"
              placeholder="example@gmail.com"
            />
          </div>
        </div>
        <div className=" flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full">
          <label
            htmlFor="subject"
            className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
          >
            Subject
          </label>
          <input
            tabIndex={0}
            type="text"
            id="subject"
            name="subject"
            required
            className="border border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-400"
            placeholder="your subject"
          />
        </div>
        <div className="flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full">
          <label
            htmlFor="about"
            className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
          >
            Your message
          </label>
          <textarea
            id="about"
            name="about"
            required
            className="bg-transparent border border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-400"
            placeholder="type your message..."
            rows={5}
          ></textarea>
          <p className="w-full text-right text-xs pt-1 text-gray-600 dark:text-gray-400">
            Character Limit: 200
          </p>
        </div>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className="bg-white text-black hover:text-white"
            // onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </div>
  );
}
