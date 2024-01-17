import { getCurrentUser } from "@/lib/session";
import React from "react";
import Navbar from "@/components/Navbar";
import SideMenu from "@/stories/SideMenu/SideMenu";
import TransactionsPerDay from "@/components/Dashboard/Transactions";
import { Box } from "@mui/material";
import DataRibbon from "@/components/Dashboard/DataRibbon";

export default async function DashBoard() {
  const session = await getCurrentUser();

  let dash;
  if (session?.user._doc.roles.includes("Employee" || "Manager" || "Admin")) {
    dash = (
      <>
        {/* <Navbar /> */}
        <SideMenu />
        <div className="mx-auto max-w-6xl p-3 md:ml-64">
          <Box>
            <DataRibbon />
            <TransactionsPerDay />
          </Box>
        </div>
      </>
    );
  }

  return dash;
}
