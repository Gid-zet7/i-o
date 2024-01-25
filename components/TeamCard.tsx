"use client";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Link from "next/link";

type Props = {
  id?: string;
  avartar?: string;
  username: string;
};

const TeamCard = ({ id, avartar, username }: Props) => {
  return (
    <Paper className="rounded-lg" key={id}>
      <div className="p-4 flex gap-4">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            sx={{
              height: 50,
              width: 50,
              marginBottom: 2,
            }}
            src={avartar as string}
          />
        </Box>
        <Link href={`http://localhost:3000/dashboard/employees/${id}`}>
          <Typography
            // fontSize={10}
            className="blue_gradient text-sm md:text-xl"
          >
            {username}
          </Typography>
        </Link>
      </div>
    </Paper>
  );
};

export default TeamCard;
