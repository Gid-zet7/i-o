"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState } from "react";

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flexCenter z-10 flex-col relative">
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
          <p className="font-semibold">{session?.user?._doc.username}</p>
        </button>

        {openModal && (
          <>
            <div className="flex flex-col items-center gap-y-4">
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
            </div>
            <div className="w-full flexStart border-t border-nav-border mt-5 pt-5">
              <button
                type="button"
                className="text-sm"
                onClick={() =>
                  signOut({ callbackUrl: "http://localhost:3000" })
                }
              >
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;