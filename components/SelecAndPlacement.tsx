import Image from "next/image";
import { Salsa } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import { Jost } from "next/font/google";

const salsa = Salsa({
  subsets: ["latin"],
  weight: "400",
});

const dancing_script = Dancing_Script({
  subsets: ["latin"],
});

const jost = Jost({
  subsets: ["latin"],
});

export default function SelecAndPlacement() {
  return (
    <>
      <div className="max-w-5xl mx-auto p-3">
        <section className="widescreen:section-min-height tallscreen:section-min-height grid place-content-center h-96 mb-28">
          <div className=" flex flex-col gap-16 mt-32 sm:flex-row">
            <article className={`text-5xl sm:text-7xl ${salsa.className}`}>
              Recruitment, <br />{" "}
              <span className="blue_gradient">Selection </span> <br /> &
              Placement
            </article>
            <Image
              src="/undraw_selection_re_ycpo.svg"
              width={430}
              height={200}
              className=""
              alt="employee placement image"
            />
          </div>
        </section>
        <section className="mb-16">
          <article className="mb-20">
            <h1
              className={`${dancing_script.className} text-8xl mb-8 text-amber-400 dark:text-amber-200`}
            >
              Recruitment
            </h1>
            <p className={`text-xl ${jost.className}`}>
              In the pursuit of organizational objectives, diverse roles are
              allocated to individuals, each contributing uniquely to the
              overarching goals of the organization. Industrial-Organizational
              (I-O) psychologists play a pivotal role in this orchestration,
              actively engaging in the design and optimization of crucial
              organizational processes. Specifically, I-O psychologists focus on
              the implementation of frameworks such as (a) Recruitment processes
              and (b) Personnel selection systems.
            </p>
          </article>
          <article>
            <h1
              className={`${salsa.className} text-2xl mb-3 text-amber-400 dark:text-amber-200`}
            >
              {" "}
              (a) Strategic Recruitment Processes:
            </h1>
            <p className="mb-8">
              {" "}
              {/* The process of attracting individuals in sufficient numbers with
              the right skills and at appropriate times to apply for open
              positions within the organization. E.g. developing job
              announcements, advertising the position(s), defining key
              qualifications for applicants, and short-listing qualified
              applicants which leads to screening out candidates who do not
              qualified.  */}
              I-O psychologists are instrumental in the development and
              enhancement of recruitment strategies. This involves the creation
              of targeted methodologies for attracting, assessing, and selecting
              individuals whose skills and attributes align seamlessly with the
              organizational culture and objectives. Through the application of
              evidence-based practices, I-O psychologists strive to streamline
              recruitment processes, ensuring efficiency, fairness, and the
              identification of candidates who are poised to contribute
              meaningfully to organizational success.
              <br />
              Three main functions of Recruitment Process are to help identify
              and attract sizeable and suitable pool of talent, Deter unsuitable
              candidates from applying and create a positive image of the
              organization.
            </p>
          </article>
        </section>

        <section className="mb-16">
          <article>
            <h1
              className={`${dancing_script.className} text-8xl mb-8 text-amber-400 dark:text-amber-200`}
            >
              Selection
            </h1>
            <p className={`text-xl ${jost.className} mb-16`}>
              In the realm of talent selection, organizations employ selection
              systems characterized by evidence-based practices. These
              methodologies are designed to rigorously assess and identify the
              most qualified candidates, ensuring a harmonious alignment between
              individual competencies and the inherent demands of the designated
              role(s). The utilization of evidence-based practices underscores a
              commitment to objectivity, fairness, and efficiency in the
              decision-making process.
            </p>
            <p>
              <h1
                className={`${salsa.className} text-2xl mb-3 text-amber-400 dark:text-amber-200`}
              >
                {" "}
                (b) Personnel Selection Systems:
              </h1>
              <p>
                {" "}
                At the core of I-O psychology is the careful planning and
                administration of procedures for selecting new employees. I-O
                psychologists leverage their expertise to construct
                comprehensive frameworks for evaluating and choosing individuals
                who possess the competencies essential for organizational
                effectiveness. This includes the integration of psychometric
                assessments, structured interviews, and other scientifically
                validated tools to ensure the accuracy and fairness of personnel
                selection processes. By aligning selection systems with
                organizational needs, I-O psychologists contribute to the
                cultivation of high-performing and cohesive teams.
              </p>
            </p>
          </article>
        </section>

        <section>
          <article>
            <h1
              className={`${dancing_script.className} text-8xl mb-8 text-amber-400 dark:text-amber-200`}
            >
              Placement
            </h1>
            <p className={`text-xl ${jost.className} mb-16`}>
              Placement involves carefully matching an individual's
              competencies, which include knowledge, skills, talents, interests,
              and personality traits, with with the requisite specifications of
              a given job role. Usually, this strategic endeavor is carried out
              when a person has already entered the workforce or or has become
              an integral member of the organization. The method is
              distinguished by a careful evaluation of the candidate's aptitudes
              and preferences, which is followed by a discerning matching
              procedure to guarantee the best possible fit between the candidate
              and the organizational framework. This professional practice is
              essential for maximizing human capital effectiveness, fostering
              employee satisfaction, and contributing to the overall synergy and
              efficiency of the organizational structure..
            </p>
          </article>
        </section>
      </div>
    </>
  );
}
