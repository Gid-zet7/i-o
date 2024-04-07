import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import Paper from "@mui/material/Paper";
// import user1 from "@/assets/images/users/user1.jpg";
import user2 from "@/assets/images/users/user2.jpg";
import user3 from "@/assets/images/users/user3.jpg";
import user4 from "@/assets/images/users/user4.jpg";
import user5 from "@/assets/images/users/user5.jpg";

const tableData = [
  {
    avatar: "",
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user2,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Lading pro React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user3,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Elite React",
    status: "holt",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user4,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user5,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Ample React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
];

const ProjectTables = () => {
  return (
    <div>
      <Paper className="mt-8 p-5">
        <CardBody>
          <CardTitle tag="h5">Employee Management</CardTitle>

          <CardSubtitle className="mb-2 text-gray-300" tag="h6">
            Overview of the projects
          </CardSubtitle>

          <Table className="mt-3 w-full overflow-scroll" responsive borderless>
            <thead>
              <tr>
                <th>Team Lead</th>
                <th className="mr-8">Project</th>

                <th>Status</th>
                <th>Weeks</th>
                <th>Budget</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-t-2">
                  <td>
                    <div className="flex p-2">
                      <img
                        src="/user1.jpg"
                        className="rounded-full"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        {/* <span className="text-gray-300">{tdata.email}</span> */}
                      </div>
                    </div>
                  </td>
                  <td>{tdata.project}</td>
                  <td>
                    {tdata.status === "pending" ? (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-danger"></span>
                      </span>
                    ) : tdata.status === "holt" ? (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-warning"></span>
                      </span>
                    ) : (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                      </span>
                    )}
                  </td>
                  <td>{tdata.weeks}</td>
                  <td>{tdata.budget}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Paper>
    </div>
  );
};

export default ProjectTables;
