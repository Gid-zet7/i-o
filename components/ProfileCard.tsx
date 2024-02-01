import { Edit } from "@mui/icons-material";
import { Paper, Box, Avatar, IconButton } from "@mui/material/";
import Link from "next/link";

type Props = {
  id: string | undefined;
  avatar?: string;
  firstname?: string;
  lastname?: string;
  bio?: string;
  position?: string;
  formattedDate?: string;
  status: string;
};

export default function ProfileCard({
  id,
  avatar,
  firstname,
  lastname,
  bio,
  position,
  formattedDate,
  status,
}: Props) {
  return (
    <Paper className=" p-3 border-t-4 border-green-400">
      <div className="image overflow-hidden">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            sx={{
              height: 100,
              width: 100,
              // marginBottom: 2,
            }}
            src={avatar}
          />
        </Box>
      </div>
      <div className="flex items-center py-3">
        <h1 className=" font-bold text-xl leading-8 my-1 mr-2">
          {firstname} {lastname}{" "}
        </h1>
        <Link href={`/dashboard/${status}/${id}/edit`}>
          <IconButton>
            <Edit />
          </IconButton>
        </Link>
      </div>
      <h3 className="text-gray-600 font-lg text-semibold leading-6">
        {position}
      </h3>
      <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
        {bio}
      </p>
      <ul className=" text-gray-500  hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
        <li className="flex items-center py-3">
          <span>Status</span>
          <span className="ml-auto">
            <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
              Active
            </span>
          </span>
        </li>
        <li className="flex items-center py-3">
          <span>Member since</span>
          <span className="ml-auto">{formattedDate}</span>
        </li>
      </ul>
    </Paper>
  );
}
