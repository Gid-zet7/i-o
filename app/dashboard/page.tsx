import { getCurrentUser } from "@/lib/session";
import React from "react";
import SideMenu from "@/stories/SideMenu/SideMenu";
import PerformancesPerDay from "@/components/Dashboard/Performances";
import { Box } from "@mui/material";
import DataRibbon from "@/components/Dashboard/DataRibbon";
import PerformanceBottomRow from "@/components/Dashboard/PerformanceBottom";
import { Traffic } from "@/components/Dashboard/Traffic";
import EmployeeManagement from "@/components/Dashboard/EmployeeManagement";
import Feeds from "@/components/Dashboard/Newsfeed";
// import { Grid } from "@mui/material";

export default async function DashBoard() {
  const session = await getCurrentUser();

  let dash;
  if (session?.user?._doc?.roles.includes("Employee" || "Manager" || "Admin")) {
    dash = (
      <>
        <SideMenu />
        <div className="flex flex-col lg:grid lg:grid-cols-4">
          <div className="mx-auto max-w-6xl p-3 md:ml-64 col-span-3">
            {/* <Grid container spacing={3}> */}
            <Box>
              <DataRibbon />
              <EmployeeManagement />
              {/* <Table /> */}
              {/* <PerformancesPerDay /> */}
              <PerformanceBottomRow />
            </Box>
            {/* <Grid lg={4} md={6} xs={12}> */}
          </div>
          <div className="flex flex-col gap-20">
            <Traffic
              chartSeries={[37, 63]}
              labels={["Offboarding", "Onboarding"]}
              sx={{ height: "45%", mt: "1rem" }}
            />
            <Feeds />
          </div>
        </div>
      </>
    );
  }

  return dash;
}
