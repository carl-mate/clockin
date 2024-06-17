"use client";

import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useAuth } from "@/app/context/AuthProvider";

export function useHooks() {
  const theme = useTheme();
  const { logout } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    theme,
    anchorEl,
    handleProfileMenuOpen,
    handleMenuClose,
    handleLogout,
  };
}
