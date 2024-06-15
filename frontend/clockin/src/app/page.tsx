"use client";

import { useRouter } from "next/navigation";
import { Typography, Container, Button } from "@mui/material";

import CheckinForm from "./components/CheckinForm";
import CheckinList from "./components/CheckinList";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthProvider";
import Dashboard from "./components/Dashboard";

export default function Home() {
  // Refactor later, temporary for testing
  const { logout } = useAuth();
  const router = useRouter();

  const onClick = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ProtectedRoute>
      <Container maxWidth="lg">
        <Typography variant="h1" gutterBottom>
          ClockIn
        </Typography>
        <Button variant="contained" color="secondary" onClick={onClick}>
          Logout
        </Button>
        <Dashboard />
        <CheckinForm />
        <CheckinList />
      </Container>
    </ProtectedRoute>
  );
}
