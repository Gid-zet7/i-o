"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import React from "react";
import lightTheme from "@/theme/lightTheme";
import darkTheme from "@/theme/darkTheme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Providers from "@/components/Providers";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "./api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: {
//     default: "I/O",
//     template: "%s | I/O",
//   },
//   description: "This is the Home page",
// };

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const darkThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...darkTheme,
      }),
    [mode]
  );
  const lightThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...lightTheme,
      }),
    [mode]
  );

  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen ${
          mode === "dark" ? " bg-black" : "bg-slate-50"
        } ${
          mode === "dark" ? " text-slate-50" : "text-slate-800"
        } overflow-x-hidden `}
      >
        <Providers>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider
              theme={mode === "dark" ? darkThemeChosen : lightThemeChosen}
            >
              <Navbar ColorModeContext={ColorModeContext} />
              <main>{children}</main>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </Providers>
        <script src="https://unpkg.com/taos@1.0.5/dist/taos.js"></script>
      </body>
    </html>
  );
}
