import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Subfields from "@/components/Subfields";

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
        className={`${inter.className} min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-white`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
