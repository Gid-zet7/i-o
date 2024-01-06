import Image from "next/image";

export default function Home() {
  return (
    <>
      <section id="hero">
        <div className="widescreen:section-min-height tallscreen:section-min-height mb-12 flex scroll-mt-40 flex-col items-center justify-center gap-8 p-6 md:flex-row ">
          <article className="sm:w-1/2">
            <div className="main">
              <div className=" dark:gradient" />
            </div>
            <h1 className="mt-5 text-5xl font-extrabold md:text-8xl">
              Applying <span className="blue_gradient">psychology</span> to work
            </h1>
            <p className="text-center mt-8 text-lg text-gray-600 dark:text-gray-400 sm:text-xl max-w-2xl">
              The study and application of <span>psychological principles</span>{" "}
              , theories and methods, in <span>work settings</span>.
            </p>
          </article>
          <Image
            src="/tired.png"
            width={500}
            height={500}
            alt="Photo by Bellinon on pixabay | A man holding a jug"
          />
        </div>
        <section className="grid gap-12 md:grid-cols-3 md:gap-16 p-2">
          <article>
            <h2>
              <span className="flex tabular-nums text-slate-900 text-5xl font-extrabold mb-2 animate-[counter2_3s_ease-out_forwards] [counter-set:_num_var(--num)] before:content-[counter(num)] dark:text-slate-50">
                <span className="supports-[counter-set]:sr-only">40</span>K+
              </span>
              <span className="inline-flex font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 mb-2">
                Users
              </span>
            </h2>
            <p className="text-sm text-slate-400">
              Numerous employees, human resource professionals, and managers
              routinely leverage Industrial-Organizational (I/O) as their
              primary learning platform.
            </p>
          </article>
          <article>
            <h2>
              <span className="flex tabular-nums text-slate-900 text-5xl font-extrabold mb-2 animate-[counter_3s_ease-out_forwards] [counter-set:_num_var(--num)] before:content-[counter(num)] dark:text-slate-50">
                <span className="supports-[counter-set]:sr-only">60</span>K+
              </span>
              <span className="inline-flex font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 mb-2">
                Employees
              </span>
            </h2>
            <p className="text-sm text-slate-400">
              Many satisfied professionals, each expertly matched to positions
              that align seamlessly with their career aspirations and
              preferences, contributing to a thriving and content workforce.
            </p>
          </article>
          <article>
            <h2>
              <span className="flex tabular-nums text-slate-900 text-5xl font-extrabold mb-2 animate-[counter3_3s_ease-out_forwards] [counter-set:_num_var(--num)] before:content-[counter(num)] dark:text-slate-50">
                <span className="supports-[counter-set]:sr-only">10</span>K+
              </span>
              <span className="inline-flex font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 mb-2">
                Trusted companies
              </span>
            </h2>
            <p className="text-sm text-slate-400">
              Renowned for our commitment to excellence, we have consistently
              delivered unparalleled solutions that not only meet but exceed the
              expectations of our diverse corporate partners
            </p>
          </article>
        </section>
      </section>
    </>
  );
}
