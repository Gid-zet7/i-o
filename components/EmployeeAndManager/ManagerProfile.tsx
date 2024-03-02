import ProfileCard from "./ProfileCard";
import TeamsCard from "./TeamsCard";
import AboutCard from "./AboutCard";
import ProjectsCard from "./ProjectsCard";
import MeetingsCard from "./MeetingsCard";

type Props = {
  manager?: Manager;
  formattedDate?: string;
};

export default function Profile({ formattedDate, manager }: Props) {
  return (
    <main>
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <ProfileCard
              id={manager?._id}
              avatar={manager?.employee?.user?.avatarUrl}
              firstname={manager?.employee?.firstname}
              lastname={manager?.employee?.lastname}
              position={manager?.employee?.position}
              bio={manager?.employee?.bio}
              formattedDate={formattedDate}
              status={"managers"}
            />

            <div className="my-4"></div>
            {manager?.team?.length ? <TeamsCard team={manager?.team} /> : null}
            <div className="my-4"></div>
            {manager?.meetings ? (
              <MeetingsCard meetings={manager?.meetings} />
            ) : null}
          </div>

          <div className="w-full md:w-9/12 mx-2 h-64">
            <AboutCard
              username={manager?.employee?.user?.username}
              firstname={manager?.employee?.firstname}
              lastname={manager?.employee?.lastname}
              email={manager?.employee?.user.email}
              gender={manager?.employee?.gender}
              contact={manager?.employee?.contact}
              permanent_address={manager?.employee?.permanent_address}
              current_address={manager?.employee?.current_address}
              birthday={manager?.employee?.birthday}
            />

            <div className="my-4"></div>

            <div className="my-4"></div>
            {manager?.projects?.length ? (
              <ProjectsCard projects={manager?.projects} />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
