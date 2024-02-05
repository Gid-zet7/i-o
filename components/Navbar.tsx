"use client";
import Link from "next/link";
import ProfileMenu from "./EmployeeAndManager/ProfileMenu";
import AuthProvider from "./AuthProvider";
import { useSession } from "next-auth/react";
import ThemeToggleButton from "@/components/themeToggleButton/themeToggleButton";

export type NavbarProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
};

const Navbar = (props: NavbarProps) => {
  const { ColorModeContext } = props;
  // const session = await getCurrentUser();
  const { data: session } = useSession();
  // console.log(session);
  return (
    <nav className="py-5 px-8 border-b gap-4 sticky top-0 z-10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <h1 className="text-3xl">
          <Link href="/">I/O</Link>
        </h1>
        <div className="flex gap-4">
          <ThemeToggleButton ColorModeContext={ColorModeContext} />
          {session?.user ? (
            <>
              <ProfileMenu session={session} />
            </>
          ) : (
            <AuthProvider />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
