"use client";
import { Grid } from "@mui/material";
import DataCard from "./DataCard";

export default function DataRibbon() {
  return (
    <Grid
      container
      gap={2}
      className="flex flex-wrap lg:grid lg:grid-cols-4 text-center pl-5 relative"
    >
      {/* <Grid> */}
      <DataCard
        title={"Total Employees"}
        value={"462"}
        description={"The total number of Employeess in the current year"}
      />
      {/* </Grid> */}
      {/* <Grid> */}
      <DataCard
        title={"Exceeds Expectati"}
        value={"400"}
        description={
          "These are the number of Employees who exceeded expectations in the current year"
        }
      />
      {/* </Grid> */}
      {/* <Grid> */}
      <DataCard
        title={"Meets Expectations"}
        value={"55"}
        description={
          "These are the number of Employees who met expectations in the current year"
        }
      />
      {/* </Grid> */}
      {/* <Grid> */}
      <DataCard
        title={"Did not Expectations"}
        value={"7"}
        description={
          "These are the number of Employees who failed to meet expectations in the current year"
        }
      />
      {/* </Grid> */}
    </Grid>
  );
}
