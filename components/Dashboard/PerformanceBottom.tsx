import Grid from "@mui/material/Grid";
import React from "react";
import DataChart from "./DataChart";
import Paper from "@mui/material/Paper";
import { doughnutChartData } from "./mockData";

const PerformanceBottomRow = () => {
  return (
    <Grid container className="grid gap-2 lg:grid-cols-4 ">
      <Grid>
        <Paper className="dataCard">
          <p>Performance per user type</p>
          <DataChart type={"doughnut"} data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className="dataCard">
          <p>Performance per user type</p>
          <DataChart type={"doughnut"} data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className="dataCard">
          <p>Performance per user type</p>
          <DataChart type={"doughnut"} data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className="dataCard">
          <p>Performance per user type</p>
          <DataChart type={"doughnut"} data={doughnutChartData} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PerformanceBottomRow;
