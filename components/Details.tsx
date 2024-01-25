"use client";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {
  id: string;
  image?: string;
  username?: string;
  firstname: string;
  lastname: string;
  email: string;
  position?: string;
  department: string;
  startDate?: string;
};

const Details = ({
  username,
  firstname,
  lastname,
  email,
  position,
  department,
  startDate,
}: Props) => {
  return (
    <Paper className="rounded-lg">
      <div className="p-4">
        <Typography
          fontSize={"h4"}
          className="blue_gradient"
          marginBottom={3}
          //   bgcolor={"lightgray"}
        >
          Username: {username}
        </Typography>

        <Typography fontSize={"h4"} className="blue_gradient" marginBottom={3}>
          First name: {firstname}
        </Typography>
        <Typography fontSize={"h4"} className="blue_gradient" marginBottom={3}>
          Last name: {lastname}
        </Typography>
        <Typography fontSize={"h4"} className="blue_gradient" marginBottom={3}>
          Email: {email}
        </Typography>
        <Typography fontSize={"h4"} className="blue_gradient" marginBottom={3}>
          Department: {department}
        </Typography>
        <Typography fontSize={"h4"} className="blue_gradient" marginBottom={3}>
          Position: {position}
        </Typography>

        {startDate ? (
          <Typography
            fontSize={"h4"}
            className="blue_gradient"
            marginBottom={3}
          >
            Start Date: {startDate}
          </Typography>
        ) : null}
      </div>
    </Paper>
  );
};

export default Details;
