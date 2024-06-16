import React from "react";

import ProtectedRoute from "../components/ProtectedRoute";
import Nav from "../components/Nav/page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <Nav>{children}</Nav>
    </ProtectedRoute>
  );
}
