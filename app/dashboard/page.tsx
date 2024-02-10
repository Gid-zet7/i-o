import { getCurrentUser } from "@/lib/session";
import React from "react";
import SideMenu from "@/stories/SideMenu/SideMenu";
import PerformancesPerDay from "@/components/Dashboard/Performances";
import { Box } from "@mui/material";
import DataRibbon from "@/components/Dashboard/DataRibbon";
import PerformanceBottomRow from "@/components/Dashboard/PerformanceBottom";

export default async function DashBoard() {
  const session = await getCurrentUser();

  let dash;
  if (session?.user?._doc?.roles.includes("Employee" || "Manager" || "Admin")) {
    dash = (
      <>
        <SideMenu />
        <div className="mx-auto max-w-6xl p-3 md:ml-64">
          <Box>
            <DataRibbon />
            <PerformancesPerDay />
            <PerformanceBottomRow />
          </Box>
        </div>
      </>
    );
  }

  return dash;
}
