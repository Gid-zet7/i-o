import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import { getCurrentUser } from "@/lib/session";
import AuthProviders from "./AuthProviders";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className="py-5 px-8 border-b gap-4 sticky top-0 z-10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <h1 className="text-3xl">
          <Link href="/">I/O</Link>
        </h1>
        <div className="flexCenter gap-4">
          {session?.user ? (
            <>
              <ProfileMenu session={session} />
            </>
          ) : (
            <AuthProviders />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
