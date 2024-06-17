import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";

import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <Container maxWidth="md">
      <LoginForm />
      <Typography align="center" mt={2}>
        {"Don't have an account? "}
        <Link href="/register" passHref>
          <Button variant="text" color="primary">
            Sign Up
          </Button>
        </Link>
      </Typography>
    </Container>
  );
}
