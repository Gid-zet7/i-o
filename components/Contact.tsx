import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function Contact() {
  return (
    <div id="contact">
      <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl blue_gradient">
        Contact Us
      </h2>
      <form action="" className="items-left mx-auto flex flex-col gap-4 ">
        <Grid className="text-white" item xs={12} sm={6}>
          <TextField required fullWidth label="Email" name="email" />
        </Grid>
        <Grid className="text-white" item xs={12} sm={6}>
          <TextField required fullWidth label="Subject" name="subject" />
        </Grid>
        <Grid className="" item xs={12} sm={6}>
          <TextareaAutosize placeholder="Your message..." />
        </Grid>
        {/* <label htmlFor="message">Message:</label>
        <textarea
          name="message"
          id="message"
          cols={30}
          rows={10}
          placeholder="Your Message"
          required
          className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
        ></textarea> */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className="text-black"
            // onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </div>
  );
}
