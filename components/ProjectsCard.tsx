"use client";
import { Paper } from "@mui/material";

type Props = {
  projects: Project[];
};

const ProjectsCard = ({ projects }: Props) => {
  return (
    <Paper className=" p-3 shadow-sm rounded-sm">
      <div className="flex items-center space-x-2 font-semibold leading-8 mb-4">
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
        <span className="tracking-wide">Projects</span>
      </div>
      <div className="text-gray-400">
        <div className="grid md:grid-cols-2 text-sm gap-6">
          {projects.map((project) => {
            return (
              <div>
                <Paper className=" p-2 border-t-4 border-green-400">
                  <div className="p-2 font-semibold">Project Title</div>
                  <div className="p-2 text-sm text-gray-500 hover:text-gray-600 leading-6">
                    {project.title}
                  </div>
                  <div className="p-2 font-semibold">Project Description</div>
                  <p className="p-2 text-sm text-gray-500 hover:text-gray-600 leading-6">
                    {project.description}
                  </p>
                  <div className="mt-8">
                    <p className=" text-sm text-gray-500 hover:text-gray-600 leading-6 font-serif italic">
                      progress: 46%
                    </p>
                    <div className="h-1 w-full bg-black  rounded-full">
                      <div className="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
                    </div>
                  </div>
                </Paper>
              </div>
            );
          })}
        </div>
      </div>
      <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
        Show All Projects
      </button>
    </Paper>
  );
};

export default ProjectsCard;
