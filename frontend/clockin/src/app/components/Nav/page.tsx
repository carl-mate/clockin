"use client";

import { Box, Toolbar, useTheme } from "@mui/material";
import { useState } from "react";
import AppBar from "../AppBar";
import Drawer from "../Drawer";

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

export default function Nav({ children }: Props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            sm: `calc(100% - ${open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`})`,
          },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
