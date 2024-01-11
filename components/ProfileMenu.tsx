"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flexCenter flex-col relative top-4">
      <div className="rounded-full">
        <button
          className="flexCenter flex items-baseline"
          onClick={() => setOpenModal((prevState) => !prevState)}
        >
          {session?.user && (
            <Image
              src={session.user._doc.avatarUrl}
              width={40}
              height={40}
              className="rounded-full"
              alt="user profile image"
            />
          )}
          <p className="font-normal text-xs underline">
            {session?.user?._doc.username}
          </p>
        </button>

        {openModal && (
          <>
            <div className="flex flex-col items-center gap-y-2 bg-slate-100 p-3 md:p-12 dark:bg-black rounded-3xl w-36 text-xs absolute left-px md:gap-y-4 md:w-60">
              {session?.user?._doc.avatarUrl && (
                <Image
                  src={session?.user?._doc.avatarUrl}
                  className="rounded-full"
                  width={80}
                  height={80}
                  alt="profile Image"
                />
              )}
              <p className=" font-medium md:font-semibold">
                {session?.user?._doc.username}
              </p>
              <p className="font-medium md:font-semibold">
                {session?.user?._doc.email}
              </p>

              <Link href={`/employees/${session.user._doc._id}`}>
                <p>Edit Profile</p>
              </Link>
              <div className="flexStart border-t border-nav-border mt-2 pt-2">
                <button
                  type="button"
                  className="bg-red-500 px-1 py-2 rounded-lg hover:opacity-90 w-14 text-xs md:px-4 md:py-2 md:w-full"
                  onClick={() =>
                    signOut({ callbackUrl: "http://localhost:3000" })
                  }
                >
                  Sign out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
