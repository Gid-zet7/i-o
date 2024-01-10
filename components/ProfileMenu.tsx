"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flexCenter flex-col absolute top-4">
      <div className="rounded-full">
        <button
          className="flexCenter "
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
          {/* <p className="font-semibold">{session?.user?._doc.username}</p> */}
        </button>

        {openModal && (
          <>
            <div className="flex flex-col items-center gap-y-4 bg-slate-100 p-12 dark:bg-black rounded-3xl">
              {session?.user?._doc.avatarUrl && (
                <Image
                  src={session?.user?._doc.avatarUrl}
                  className="rounded-full"
                  width={80}
                  height={80}
                  alt="profile Image"
                />
              )}
              <p className="font-semibold">{session?.user?._doc.username}</p>
              <p className="font-semibold">{session?.user?._doc.email}</p>

              <p>{session.user._doc.active}</p>

              <Link href={`/employees/${session.user._doc._id}`}>
                <p>Edit Profile</p>
              </Link>
              <div className="w-full flexStart border-t border-nav-border mt-5 pt-5">
                <button
                  type="button"
                  className="text-sm bg-red-500 px-4 py-2 rounded-sm hover:opacity-90"
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
