"use client";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {
  id: number;
  skill: string;
};

const PerformanceCard = ({ skill }: Props) => {
  return (
    <Paper className="rounded-lg">
      <div className="p-4">
        <Typography fontSize={"h6"} className="blue_gradient">
          {skill}
        </Typography>
      </div>
    </Paper>
  );
};

export default PerformanceCard;
