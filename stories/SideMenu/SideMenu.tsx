"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Dashboard, Dataset } from "@mui/icons-material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import Link from "next/link";
import { useSession } from "next-auth/react";

const drawerWidth = 240;
// const mobileDrawerWidth = 200

export default function SideMenu() {
  const session = useSession();
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["dashboard", "employees", "managers", "data", "profile"].map(
          (text, index) => (
            <Link
              key={text}
              href={text === "dashboard" ? `/${text} ` : `/dashboard/${text}`}
            >
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {text === "dashboard" ? (
                      <Dashboard />
                    ) : text === "data" ? (
                      <Dataset />
                    ) : (
                      <svg
                        className="h-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        )}
      </List>
      <Divider />
      <List>
        {["settings", "appraisal-form", "Spam"].map((text, index) => (
          // text === "Create Appraisal form" ? text = "appraisal-form/new" : text
          <Link key={text} href={`/dashboard/${text}`}>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {text === "appraisal-form" ? (
                    <svg
                      fill="#504d4d"
                      height="20px"
                      width="20px"
                      version="1.1"
                      id="Layer_1"
                      // xmlns="http://www.w3.org/2000/svg"
                      // xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512.001 512.001"
                      // xml:space="preserve"
                    >
                      <g>
                        <g>
                          <path
                            d="M463.996,126.864L340.192,3.061C338.231,1.101,335.574,0,332.803,0H95.726C67.724,0,44.944,22.782,44.944,50.784v410.434
			c0,28.001,22.781,50.783,50.783,50.783h320.547c28.002,0,50.783-22.781,50.783-50.783V134.253
			C467.056,131.482,465.955,128.824,463.996,126.864z M343.255,35.679l88.127,88.126H373.14c-7.984,0-15.49-3.109-21.134-8.753
			c-5.645-5.643-8.752-13.148-8.751-21.131V35.679z M446.158,461.217c0,16.479-13.406,29.885-29.884,29.885H95.726
			c-16.479,0-29.885-13.406-29.885-29.885V50.784c0.001-16.479,13.407-29.886,29.885-29.886h226.631v73.021
			c-0.002,13.565,5.28,26.318,14.871,35.909c9.592,9.592,22.345,14.874,35.911,14.874h73.018V461.217z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M147.789,303.745h-4.678c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449h4.678
			c5.77,0,10.449-4.678,10.449-10.449C158.238,308.423,153.559,303.745,147.789,303.745z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M368.889,303.745H181.593c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449h187.296
			c5.77,0,10.449-4.678,10.449-10.449C379.338,308.423,374.659,303.745,368.889,303.745z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M147.789,256h-4.678c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h4.678
			c5.77,0,10.449-4.678,10.449-10.449C158.238,260.678,153.559,256,147.789,256z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M368.889,256H181.593c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h187.296
			c5.77,0,10.449-4.678,10.449-10.449C379.338,260.678,374.659,256,368.889,256z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M147.789,208.255h-4.678c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h4.678
			c5.77,0,10.449-4.678,10.449-10.449S153.559,208.255,147.789,208.255z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M368.889,208.255H181.593c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h187.296
			c5.77,0,10.449-4.678,10.449-10.449S374.659,208.255,368.889,208.255z"
                          />
                        </g>
                      </g>
                    </svg>
                  ) : (
                    <MailIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
          className="absolute top-4"
        >
          <KeyboardDoubleArrowRight />
        </IconButton>
      </Toolbar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              top: 82,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
