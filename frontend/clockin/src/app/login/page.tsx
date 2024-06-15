import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";

import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <Container maxWidth="lg">
      <LoginForm />
      <Typography align="center" mt={2}>
        Don{"'"}t have an account?{" "}
        <Link href="/register" passHref>
          <Button variant="text" color="primary">
            Register
          </Button>
        </Link>
      </Typography>
    </Container>
  );
}
