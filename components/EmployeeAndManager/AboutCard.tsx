import { Paper } from "@mui/material/";

type Props = {
  username: string | undefined;
  firstname?: string;
  lastname?: string;
  email: string | undefined;
  gender?: string;
  contact?: string;
  permanent_address?: string;
  current_address?: string;
  birthday?: string;
};

export default function AboutCard({
  username,
  firstname,
  lastname,
  email,
  gender,
  contact,
  permanent_address,
  current_address,
  birthday,
}: Props) {
  return (
    <Paper className=" p-3 shadow-sm rounded-sm">
      <div className="flex items-center space-x-2 font-semibold leading-8">
        <span className="text-green-500">
          <svg
            className="h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
        <span className="tracking-wide">About</span>
      </div>
      <div className="text-gray-400">
        <div className="grid md:grid-cols-2 text-sm">
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              User Name
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{username} </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              First Name
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{firstname} </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              Last Name
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{lastname}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              Gender
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{gender}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              Contact No.
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{contact}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              Current Address
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{current_address}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              Permanant Address
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{permanent_address}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              Email.
            </div>
            <div className="px-0 py-2 sm:px-4 sm:py-2 overflow-auto">
              <p className="text-blue-800">{email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-2 py-2 sm:px-4 sm:py-2 font-semibold">
              Birthday
            </div>
            <div className="px-2 py-2 sm:px-4 sm:py-2">{birthday}</div>
          </div>
        </div>
      </div>
      <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
        Show Full Information
      </button>
    </Paper>
  );
}
