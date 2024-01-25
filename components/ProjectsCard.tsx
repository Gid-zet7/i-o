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
    <Paper className="rounded-lg" key={id}>
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
    </Paper>
  );
};

export default ProjectsCard;
