"use client";
import { SubLinks } from "@/constant";
import Link from "next/link";

const Subfields = () => {
  return (
    <div className="bg-red-300 p-2 md:p-3 text-sm flex justify-center items-center">
      <p>
        🚀 Elevate your HR with personalized workflows! Tailor checklists to
        your process - customize beyond onboarding and offboarding. Click for a
        seamless HR journey!👉
      </p>
      {/* <ul className="flex gap-2 overflow-auto ">
        {SubLinks.map((link, i) => (
          <button
            key={i}
            type="button"
            className="px-4 py-1 rounded-full capitalize whitespace-nowrap font-normal mt-3"
          >
            <span className="bg-gradient-to-r from-indigo-500 to-indigo-300 bg-clip-text text-transparent ">
              <Link href={link.href}>{link.text}</Link>
            </span>
          </button>
        ))}
      </ul> */}
    </div>
  );
};

export default Subfields;
