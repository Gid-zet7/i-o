import { Paper } from "@mui/material/";

type Props = {
  meetings: Meeting[];
};

export default function MeetingsCard({ meetings }: Props) {
  return (
    <Paper className=" p-3 hover:shadow mb-8">
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
        <span>Meetings</span>
      </div>
      <div className="grid">
        {meetings.length ? (
          meetings.map((meeting) => {
            return (
              <div className="lg:flex shadow rounded-lg border  border-gray-400">
                <div className="bg-blue-600 rounded-lg lg:w-2/12 py-4 block shadow-inner">
                  <div className="text-center tracking-wide">
                    <div className="text-white font-bold text-4xl ">24</div>
                    <div className="text-white font-normal text-2xl">Sept</div>
                  </div>
                </div>
                <div className="w-full  lg:w-11/12 xl:w-full px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide">
                  <div className="flex flex-row lg:justify-start justify-center">
                    <div className="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                      <i className="far fa-clock"></i> {meeting.startTime} -{" "}
                      {meeting.endTime}
                    </div>
                    <div className="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                      Organiser : IHC
                    </div>
                  </div>
                  <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                    {meeting.agenda}
                  </div>

                  <div className="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                    A-142/1, A-142, Ganesh Nagar, Tilak Nagar, New Delhi, 110018
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center">
            <h1 className="text-sm text-gray-500 hover:text-gray-600 leading-6 font-serif italic">
              No Meetings at the moment
            </h1>
          </div>
        )}
      </div>
    </Paper>
  );
}
