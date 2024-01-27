"use client";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {
  id?: number;
  title: string;
  description: string;
  tasks: Task[];
};

const ProjectsCard = ({ id, title, description, tasks }: Props) => {
  return (
    <Paper className="rounded-lg mb-3" key={id}>
      <div className="p-4">
        <Typography fontSize={"h6"} marginBottom={3}>
          Project Title: {title}
        </Typography>
        <Typography fontSize={"h6"} marginBottom={3}>
          Project Description: {description}
        </Typography>
      </div>

      <div className="px-4">
        <Typography fontSize={"h6"} marginBottom={3}>
          Tasks
        </Typography>
        {tasks.map((task, j) => {
          return (
            <div key={j}>
              <Typography fontSize={"h6"}>
                {j + 1}. {task.description}{" "}
              </Typography>
            </div>
          );
        })}
      </div>
      <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
        Last updated 2 days ago
      </div>
    </Paper>
  );
};

export default ProjectsCard;
