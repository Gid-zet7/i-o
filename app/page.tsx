import Image from "next/image";
import Subfields from "@/components/HomePage/Subfields";
import Slides from "@/components/HomePage/Slides";
import Services from "@/components/HomePage/Services";
import Contact from "@/components/HomePage/Contact";
import Footer from "@/components/HomePage/Footer";
// import { Hammersmith_One } from "next/font/google";

// const hammersmith = Hammersmith_One({
//   subsets: ["latin"],
//   weight: "400",
// });

export default function Home() {
  return (
    <>
      <Subfields />
      <main>
        <section id="hero" className="mb-32 bg-emerald-400 rounded-b-3xl">
          <div className="widescreen:section-min-height tallscreen:section-min-height mb-3 flex scroll-mt-40 flex-col items-center justify-center gap-10 p-6 md:flex-row max-w-6xl mx-auto">
            <article className="text-white">
              <h1 className={`mt-5 text-5xl font-extrabold md:text-6xl`}>
                Applying <span className="blue_gradient">psychology</span> to
                work
              </h1>
              <p className="mt-8 text-lg sm:text-xl ">
                I/O helps automate HR tasks like employee data management,
                performance appraisals etc, streamlining processes, and
                improving efficiency for HR officers.
              </p>
            </article>
            <Image
              src="/undraw_happy.svg"
              width={400}
              height={400}
              alt="Photo by Bellinon on pixabay | A man holding a mug"
            />
          </div>
          <div className="max-w-5xl mx-auto">
            <Slides />
          </div>
        </section>

        <section className={``}>
          <div className="widescreen:section-min-height tallscreen:section-min-height my-12 scroll-mt-20 p-6 flex flex-col lg:flex-row mb-12 justify-center max-w-6xl mx-auto relative gap-4 ">
            {/* <div className=" pattern-wiggle rounded-full w-36 h-36 absolute top-14 right-10 sm:top-10 sm:right-40 lg:top-0"></div> */}
            {/* <div className="pa pattern-volcano-lamp rounded-full w-36 h-36 absolute left-10 bottom-4 lg:bottom-0 lg:left-36"></div> */}
            <div className="flex-1 ">
              <h1
                className={` text-3xl font-extrabold sm:text-6xl blue_gradient mb-4`}
              >
                HRIS (Human Resource Information System)
              </h1>
              <p className="leading-8 font-serif">
                As an HR personnel, we understand the frustration of drowning in
                paperwork and tedious administrative tasks. Our solution is here
                to revolutionize your workflow! Say goodbye to piles of paper
                and hello to seamless digitalization! With our innovative
                approach, we'll transform your employee records and performance
                appraisals into easily accessible digital formats. Get ready to
                skyrocket your organizational effectiveness with us!
              </p>
            </div>
            <Image
              className="flex-2"
              src="/fast.svg"
              width={500}
              height={500}
              alt="skills"
            />
          </div>
        </section>

        <section className="">
          <div className="max-w-6xl mx-auto grid gap-12 sm:grid-cols-3 sm:gap-16 p-4 mb-20">
            <article>
              <h2>
                <span className="flex tabular-nums text-5xl font-extrabold mb-2 animate-[counter2_3s_ease-out_forwards] [counter-set:_num_var(--num)] before:content-[counter(num)] ">
                  <span className="supports-[counter-set]:sr-only">40</span>K+
                </span>
                <span className="inline-flex font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 mb-2">
                  Employee Records
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Setting the Standard: Our Unmatched Expertise in Safeguarding
                Confidential Employee Records with Professionalism and Precision
              </p>
            </article>
            <article>
              <h2>
                <span className="flex tabular-nums text-5xl font-extrabold mb-2 animate-[counter_3s_ease-out_forwards] [counter-set:_num_var(--num)] before:content-[counter(num)] ">
                  <span className="supports-[counter-set]:sr-only">60</span>K+
                </span>
                <span className="inline-flex font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 mb-2">
                  Performance Appraisal
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Innovative Excellence: Leading the Management of Over 40k
                Employee Performance Reviews with Outstanding Precision,
                Establishing the Gold Standard in HR Achievement and Innovation!
              </p>
            </article>
            <article>
              <h2>
                <span className="flex tabular-nums text-5xl font-extrabold mb-2 animate-[counter3_3s_ease-out_forwards] [counter-set:_num_var(--num)] before:content-[counter(num)] ">
                  <span className="supports-[counter-set]:sr-only">10</span>K+
                </span>
                <span className="inline-flex font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 mb-2">
                  Trusted companies
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Renowned for our commitment to excellence, we have consistently
                delivered exceptional solutions that not only meet but exceed
                the expectations of our diverse corporate partners
              </p>
            </article>
          </div>
        </section>

        <section className="bg-[#fdf2eb] rounded-t-3xl">
          <div className="flex justify-center items-center">
            <h1 className=" text-3xl font-extrabold sm:text-5xl blue_gradient my-4">
              I/O
            </h1>
          </div>
          <div className="widescreen:section-min-height tallscreen:section-min-height my-12 scroll-mt-20 p-6 grid sm:grid-cols-3 max-w-6xl mx-auto gap-3 relative">
            <div className=" pattern-tic-tac-toe rounded-full w-36 h-36 absolute bottom-10 right-[-30rem]"></div>
            <div className=" pattern-tic-tac-toe rounded-full w-36 h-36 absolute top-[-4rem] right-20"></div>
            <div>
              <div className="pattern-tic-tac-toe rounded-full w-36 h-36 absolute bottom-36 left-96"></div>
              <div className="pattern-tic-tac-toe rounded-full w-36 h-36 absolute bottom-36 left-96"></div>
              <div></div>
              {/* <h1 className=" text-3xl font-extrabold sm:text-5xl blue_gradient mb-4">
                Recruitment
              </h1> */}
              <p className="mt-8 text-xl sm:text-lg max-w-2xl flex flex-col gap-5 text-slate-800">
                <Image
                  src="/employee-skills-svgrepo-com.svg"
                  width={50}
                  height={30}
                  alt="skills"
                />
                Assessing employee characteristics (KSAOs), selecting and
                matching these individuals to jobs they are likely to perform
                well.
              </p>
            </div>
            <div>
              <p className="mt-8 text-xl sm:text-lg max-w-2xl flex flex-col gap-1 text-slate-800">
                <Image
                  src="/dumbbell-svgrepo-com.svg"
                  width={50}
                  height={30}
                  alt="skills"
                />
                Training employees, developing job performance standards, and
                measuring job performance.
              </p>
            </div>
            <div>
              <p className="mt-8 text-xl sm:text-lg max-w-2xl flex flex-col gap-1 text-slate-800">
                <Image
                  src="/growth-svgrepo-com.svg"
                  width={50}
                  height={30}
                  alt="skills"
                />
                Focus on understanding and improving workplace dynamics,
                including organizational behaviour, leadership, communication,
                employee satisfaction.
              </p>
            </div>
            <div>
              <p className="mt-8 text-xl sm:text-lg max-w-2xl flex flex-col gap-1 text-slate-800">
                <Image
                  src="/business-partnership-svgrepo-com.svg"
                  width={50}
                  height={30}
                  alt="skills"
                />
                Study how individuals interact within an organizational context
                and how these interactions impact productivity and wellbeing
              </p>
            </div>
          </div>
        </section>

        <section className="widescreen:section-min-height tallscreen:section-min-height my-12 scroll-mt-20 p-6">
          <div className="grid place-content-center">
            <h1 className="text-center text-3xl font-extrabold sm:text-5xl blue_gradient my-4">
              Our Services
            </h1>
            <Services />
          </div>
        </section>
        <section className="widescreen:section-min-height tallscreen:section-min-height mt-12 scroll-mt-16 p-6 bg-black">
          <Contact />
        </section>
        <section className="widescreen:section-min-height tallscreen:section-min-height scroll-mt-16 p-6 bg-blue-800">
          <Footer />
        </section>
      </main>
    </>
  );
}
