import { Paper, Box, Avatar } from "@mui/material/";
import Link from "next/link";

type Props = {
  team: Employee[];
};

export default function TeamsCard({ team }: Props) {
  return (
    <Paper className=" p-3 hover:shadow">
      <div className="flex items-center space-x-3 font-semibold text-xl leading-8">
        <span className="text-green-500">
          <svg
            className="h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
        <span>Team</span>
      </div>
      <div className="grid grid-cols-3">
        {team.map((teammate) => {
          return (
            <div className="text-center my-2">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  sx={{
                    height: 80,
                    width: 80,
                    // marginBottom: 2,
                  }}
                  src={teammate.user.avatarUrl}
                />
              </Box>
              <Link
                href={`/dashboard/employees/${teammate._id}`}
                className="text-main-color"
              >
                {teammate.firstname}
              </Link>
            </div>
          );
        })}
      </div>
    </Paper>
  );
}
