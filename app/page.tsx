import Image from "next/image";
import Subfields from "@/components/HomePage/Subfields";
import Slides from "@/components/HomePage/Slides";
import Services from "@/components/HomePage/Services";
import Contact from "@/components/HomePage/Contact";

export default function Home() {
  return (
    <>
      <Subfields />
      <div className="max-w-5xl mx-auto p-3">
        <section id="hero" className="mb-32">
          <div className="widescreen:section-min-height tallscreen:section-min-height mb-3 flex scroll-mt-40 flex-col items-center justify-center gap-8 p-6 md:flex-row ">
            <article className="p-4">
              <h1 className={`mt-5 text-6xl font-extrabold md:text-8xl`}>
                Applying <span className="blue_gradient">psychology</span> to
                work
              </h1>
              <p className="text-center mt-8 text-lg text-gray-600 dark:text-gray-400 sm:text-xl max-w-2xl">
                The study and application of{" "}
                <span>psychological principles</span> , theories and methods, in{" "}
                <span>work settings</span>.
              </p>
            </article>
            <Image
              src="/tired.png"
              width={500}
              height={500}
              alt="Photo by Bellinon on pixabay | A man holding a mug"
            />
          </div>
          <section className="grid gap-12 sm:grid-cols-3 sm:gap-16 p-2">
            <article>
              <h2>
                <span className="flex tabular-nums text-5xl font-extrabold mb-2 animate-[counter2_3s_ease-out_forwards] [counter-set:_num_var(--num)] before:content-[counter(num)] ">
                  <span className="supports-[counter-set]:sr-only">40</span>K+
                </span>
                <span className="inline-flex font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 mb-2">
                  Users
                </span>
              </h2>
              <p className="text-sm text-slate-500">
                Numerous employees, human resource professionals, and managers
                routinely leverage Industrial-Organizational (I/O) as their
                primary learning platform.
              </p>
            </article>
            <article>
              <h2>
                <span className="flex tabular-nums text-5xl font-extrabold mb-2 animate-[counter_3s_ease-out_forwards] [counter-set:_num_var(--num)] before:content-[counter(num)] ">
                  <span className="supports-[counter-set]:sr-only">60</span>K+
                </span>
                <span className="inline-flex font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 mb-2">
                  Employees
                </span>
              </h2>
              <p className="text-sm text-slate-500">
                Many satisfied professionals, each expertly matched to positions
                that align seamlessly with their career aspirations and
                preferences, contributing to a thriving and content workforce.
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
              <p className="text-sm text-slate-500">
                Renowned for our commitment to excellence, we have consistently
                delivered unparalleled solutions that not only meet but exceed
                the expectations of our diverse corporate partners
              </p>
            </article>
          </section>
        </section>
        <Slides />
        <section
          id="i-o_descSection"
          className="widescreen:section-min-height tallscreen:section-min-height my-12 scroll-mt-20 p-6  "
        >
          <div className="flex mb-12 justify-center">
            <h1 className=" text-3xl font-bold sm:text-4xl blue_gradient mb-4">
              Industrial/Organization
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-20">
            <div className="flex-1">
              <div className="flex">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500"></span>
                </span>
                <h1 className="mb-6 mx-5 text-center text-2xl font-bold sm:text-3xl">
                  Industrial side
                </h1>
              </div>
              <div>
                <p className="mt-8 text-xl sm:text-lg max-w-2xl flex flex-col gap-5 ">
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
                <p className="mt-8 text-xl sm:text-lg max-w-2xl flex flex-col gap-1">
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
            </div>

            <div className="flex-1">
              <div className="flex">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500"></span>
                </span>
                <h1 className="mb-6 mx-5 text-center text-2xl font-bold sm:text-3xl">
                  Organizational side
                </h1>
              </div>
              <p className="mt-8 text-xl sm:text-lg max-w-2xl flex flex-col gap-1">
                <Image
                  src="/growth-svgrepo-com.svg"
                  width={50}
                  height={30}
                  alt="skills"
                />
                Focused on understanding and improving workplace dynamics,
                including organizational behaviour, leadership, communication,
                employee satisfaction.
              </p>
              <p className="mt-8 text-xl sm:text-lg max-w-2xl flex flex-col gap-1">
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
            <h1 className="text-center text-3xl font-bold sm:text-4xl mb-4 blue_gradient">
              Our Services
            </h1>
            <Services />
          </div>
        </section>
        <section className="widescreen:section-min-height tallscreen:section-min-height my-12 scroll-mt-16 p-6">
          <Contact />
        </section>
      </div>
    </>
  );
}
