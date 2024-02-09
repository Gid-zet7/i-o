"use client";
import { SubLinks } from "@/constant";
import Link from "next/link";

const Subfields = () => {
  return (
    <div className="flexBetween w-full gap-5 flex-wrap bg-emerald-400">
      <ul className="flex gap-2 overflow-auto ">
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
      </ul>
    </div>
  );
};

export default Subfields;
