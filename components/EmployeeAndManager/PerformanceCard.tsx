import { Paper } from "@mui/material";

type Props = {
  performance?: Performance[];
};

export default function PerformanceCard({ performance }: Props) {
  return (
    <Paper className=" p-3 shadow-sm rounded-sm">
      <h4 className="text-xl font-semibold leading-8">Performance</h4>
      <div className="flex flex-wrap">
        {performance?.map((perf) => {
          return perf?.data?.map((item) => {
            // console.log(item);
            return (
              <div>
                <div className="gap-5 mt-5">
                  <h1 className="ml-4 text-gray-400 font-semibold">
                    {item?.question}
                  </h1>
                  <div className="flex justify-evenly items-center w-56 p-3 m-3 rounded">
                    {item?.response === "Outstanding" ||
                    item?.response === "Very Good" ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="text-green-400 w-20 h-20"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                          />
                        </svg>
                        <div className="text-center">
                          <h4 className="inline text-gray-500 text-md">
                            {item?.response}
                          </h4>
                        </div>
                      </>
                    ) : item?.response === "Good" ? (
                      <div className="flex justify-evenly items-center w-56 p-3 m-3 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="text-gray-400 w-20 h-20"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.182 15.182a25.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                          />
                        </svg>
                        <div className="text-center">
                          <h4 className="inline text-gray-500 text-md">
                            {item.response}
                          </h4>
                        </div>
                      </div>
                    ) : item?.response === "Unsatisfactory" ||
                      item?.response === "Below Average" ? (
                      <div className="flex justify-evenly items-center w-56 p-3 m-3 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="text-red-300 w-20 h-20"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                          />
                        </svg>
                        <div className="text-center">
                          <h4 className="inline text-gray-500 text-md">
                            {item?.response}
                          </h4>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          });
        })}
      </div>
    </Paper>
  );
}
