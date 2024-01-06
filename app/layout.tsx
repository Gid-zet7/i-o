import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "I/O",
    template: "%s | I/O",
  },
  description: "This is the Home page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-white dark:bg-slate-950 dark:text-white`}
      >
        <Navbar />
        <main className="mx-auto max-w-5xl p-3">{children}</main>
      </body>
    </html>
  );
}
