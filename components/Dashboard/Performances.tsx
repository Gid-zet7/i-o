"use client";
import React from "react";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "./DataChart";
import { lineChartData } from "./mockData";

export type TransactionCardType = {
  title: string;
  value: string;
  changeValue: string;
};

const PerformancesPerDay = () => {
  // const theme = useTheme();

  return (
    <Grid container gap={2} className="flex mt-10 px-5 lg:p-0">
      <Paper className=" py-4 px-8 w-full block lg:flex ">
        <div className="max-w-full w-full lg:max-w-[80%]">
          <Typography>Increased Performances per day</Typography>
          <DataChart type={"line"} data={lineChartData} />
        </div>
        <div className="flex flex-row justify-evenly max-w-full w-full lg:flex-col lg:max-w-[25%] ">
          <Card
            className="text-center p-2 rounded-sm w-full sm:p-4"
            variant={"outlined"}
          >
            <div>
              <Typography className="text-3xl">Increase Rate</Typography>
            </div>
            <div>
              <Typography className=" text-xl">1.275</Typography>
              <Typography fontSize={14}>428.7%</Typography>
            </div>
          </Card>
          <Card
            className="text-center p-4 rounded-sm w-full"
            variant={"outlined"}
          >
            <div className="text-3xl">
              <Typography>Training</Typography>
            </div>
            <div className=" text-xl">
              <Typography>4.40%</Typography>
              <Typography fontSize={14}>899.4%</Typography>
            </div>
          </Card>
          <Card
            className="text-center p-4 rounded-sm w-full"
            variant={"outlined"}
          >
            <div className="text-3xl">
              <Typography>Errors</Typography>
            </div>
            <div className=" text-xl">
              <Typography>0</Typography>
              <Typography fontSize={14}>0</Typography>
            </div>
          </Card>
        </div>
      </Paper>
    </Grid>
  );
};

export default PerformancesPerDay;
