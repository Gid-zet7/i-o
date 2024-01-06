import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  return (
    <nav className="navbar sticky top-0 z-10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <h1 className="text-3xl">
          <Link href="/test">I/O</Link>
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
