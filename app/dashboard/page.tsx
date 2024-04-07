import { getCurrentUser } from "@/lib/session";
import React from "react";
import SideMenu from "@/stories/SideMenu/SideMenu";
import PerformancesPerDay from "@/components/Dashboard/Performances";
import { Box } from "@mui/material";
import DataRibbon from "@/components/Dashboard/DataRibbon";
import PerformanceBottomRow from "@/components/Dashboard/PerformanceBottom";
import { Traffic } from "@/components/Dashboard/Traffic";
import Table from "@/components/Dashboard/table";
import Feeds from "@/components/Dashboard/Newsfeed";

export default async function DashBoard() {
  const session = await getCurrentUser();

  let dash;
  if (session?.user?._doc?.roles.includes("Employee" || "Manager" || "Admin")) {
    dash = (
      <>
        <SideMenu />
        <div className="dash">
          <div className="">
            <div className="responsive">
              <Box>
                <DataRibbon />
                <div className="second-col-grid">
                  <div className="col-span-3">
                    <PerformancesPerDay />
                    <Table />
                  </div>
                  <div className="flexbox mt-6 px-5">
                    <Traffic
                      chartSeries={[37, 63]}
                      labels={["Offboarding", "Onboarding"]}
                      sx={{ height: "65%" }}
                    />
                    <Feeds />
                  </div>
                </div>

                {/* <PerformanceBottomRow /> */}
              </Box>
            </div>
          </div>
        </div>
      </>
    );
  }

  return dash;
}
