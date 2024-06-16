"use client";

import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useHooks } from "./hooks";

const menuId = "primary-search-account-menu";
const drawerWidth = 240;
const isAdmin = true;

export default function AppBar({
  open,
  handleDrawerToggle,
}: {
  open: boolean;
  handleDrawerToggle: any;
}) {
  const {
    theme,
    anchorEl,
    handleProfileMenuOpen,
    handleMenuClose,
    handleLogout,
    handleSwitchRole,
  } = useHooks();

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          ClockIn
        </Typography>
        <IconButton
          edge="end"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogout}>LogOut</MenuItem>
        {isAdmin && (
          <MenuItem onClick={handleSwitchRole}>Switch role as admin</MenuItem>
        )}
      </Menu>
    </MuiAppBar>
  );
}
