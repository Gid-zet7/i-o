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

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open profile menu">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
          onClose={handleCloseUserMenu}
        >
          <MenuItem>
            <Typography textAlign="center" fontSize={13}>
              {session?.user._doc.email}
            </Typography>
          </MenuItem>
          <hr />
          <MenuItem>
            <Typography textAlign="center" fontSize={13}>
              {session?.user._doc.username}
            </Typography>
          </MenuItem>
          <hr />
          <MenuItem>
            <Typography textAlign="center" fontSize={13}>
              Profile
            </Typography>
          </MenuItem>
          <hr className="mt-8" />
          <MenuItem
            onClick={() =>
              session
                ? signOut({ callbackUrl: "http://localhost:3000" })
                : signIn()
            }
          >
            <Typography
              bgcolor="red"
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
