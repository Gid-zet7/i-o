import ProfileCard from "./ProfileCard";
import AboutCard from "./AboutCard";
import ExperienceCard from "./ExperienceCard";
import PerformanceCard from "./PerformanceCard";

type Props = {
  employee: Employee;
  formattedDate?: string;
};

export default function EmployeeProfile({ employee, formattedDate }: Props) {
  // console.log(employee.performance);
  return (
    <main>
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <ProfileCard
              id={employee?._id}
              avatar={employee?.user?.avatarUrl}
              firstname={employee?.firstname}
              lastname={employee?.lastname}
              position={employee?.position}
              bio={employee?.bio}
              formattedDate={formattedDate}
              status={"employees"}
            />
          </div>

          <div className="w-full md:w-9/12 mx-2 h-64">
            <AboutCard
              username={employee?.user?.username}
              firstname={employee?.firstname}
              lastname={employee?.lastname}
              email={employee?.user?.email}
              gender={employee?.gender}
              contact={employee?.contact}
              permanent_address={employee?.permanent_address}
              current_address={employee?.current_address}
              birthday={employee?.birthday}
            />

            <div className="my-4"></div>

            {/* <!-- Experience and education --> */}
            {employee?.experience ? (
              <ExperienceCard
                experiences={employee?.experience}
                education={employee?.education}
              />
            ) : null}

            {/* <div className="my-4"></div>
            {employee?.performance ? (
              <PerformanceCard performance={employee?.performance} />
            ) : null} */}
          </div>
        </div>
      </div>
    </main>
  );
}
