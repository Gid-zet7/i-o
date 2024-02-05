"use client";
import * as React from "react";
import { signIn, signOut } from "next-auth/react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

const ProfileMenu = ({ session }: any) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElUser(null);
  };

  const router = useRouter();

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open profile menu">
          <IconButton onClick={handleOpenProfileMenu} sx={{ p: 0 }}>
            <Avatar
              alt={session?.user?.username as string}
              src={session?.user._doc.avatarUrl}
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseProfileMenu}
        >
          <MenuItem>
            <Typography textAlign="center" fontSize={13}>
              {session?.user._doc.email}
            </Typography>
          </MenuItem>

          <MenuItem>
            <Typography textAlign="center" fontSize={13}>
              {session?.user._doc.username}
            </Typography>
          </MenuItem>

          <MenuItem onClick={() => router.push("dashboard/employees/new")}>
            <Typography textAlign="center" fontSize={13}>
              Add a new employee
            </Typography>
          </MenuItem>

          <MenuItem
            onClick={() =>
              session
                ? signOut({ callbackUrl: "http://localhost:3000" })
                : signIn()
            }
          >
            <Typography
              padding={1}
              borderRadius={2}
              // marginTop={3}
              textAlign="center"
            >
              {session ? "Logout" : "Login"}
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default ProfileMenu;
