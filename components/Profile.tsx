import ProfileCard from "./ProfileCard";
import TeamsCard from "./TeamsCard";
import AboutCard from "./AboutCard";
import ExperienceCard from "./ExperienceCard";
import ProjectsCard from "./ProjectsCard";
import MeetingsCard from "./MeetingsCard";

type Props = {
  employee?: Employee;
  manager?: Manager;
  formattedDate?: string;
};

export default function Profile({ employee, formattedDate, manager }: Props) {
  return (
    <main>
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <ProfileCard
              id={employee?._id || manager?._id}
              avatar={
                employee?.user.avatarUrl || manager?.employee.user.avatarUrl
              }
              firstname={employee?.firstname || manager?.employee.firstname}
              lastname={employee?.lastname || manager?.employee.lastname}
              position={employee?.position || manager?.employee.position}
              bio={employee?.bio || manager?.employee.bio}
              formattedDate={formattedDate}
              status={employee ? "employees" : "managers"}
            />

            <div className="my-4"></div>
            {manager?.team.length ? <TeamsCard team={manager.team} /> : null}
            <div className="my-4"></div>
            {manager?.meetings ? (
              <MeetingsCard meetings={manager.meetings} />
            ) : null}
          </div>

          <div className="w-full md:w-9/12 mx-2 h-64">
            <AboutCard
              username={
                employee?.user.username || manager?.employee?.user.username
              }
              firstname={employee?.firstname || manager?.employee?.firstname}
              lastname={employee?.lastname || manager?.employee?.lastname}
              email={employee?.user.email || manager?.employee?.user.email}
              gender={employee?.gender || manager?.employee.gender}
              contact={employee?.contact || manager?.employee.contact}
              permanent_address={
                employee?.permanent_address ||
                manager?.employee.permanent_address
              }
              current_address={
                employee?.current_address || manager?.employee.current_address
              }
              birthday={employee?.birthday || manager?.employee.birthday}
            />

            <div className="my-4"></div>

            {/* <!-- Experience and education --> */}
            {employee?.experience || manager?.employee.experience ? (
              <ExperienceCard
                experiences={
                  employee?.experience || manager?.employee.experience
                }
                education={employee?.education || manager?.employee.education}
              />
            ) : null}

            <div className="my-4"></div>
            {manager?.projects.length ? (
              <ProjectsCard projects={manager.projects} />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
