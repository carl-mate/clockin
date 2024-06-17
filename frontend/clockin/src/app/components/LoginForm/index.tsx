"use client";

import {
  Avatar,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import useHooks from "./hooks";

export default function LoginForm() {
  const { register, handleSubmit, onSubmit, error, handleFormSubmit } =
    useHooks();
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <TextField
          label="Username"
          {...register("username")}
          fullWidth
          margin="normal"
          required
          autoComplete="username"
          autoFocus
        />
        <TextField
          label="Email"
          {...register("email")}
          fullWidth
          margin="normal"
          required
          autoComplete="email"
        />
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          fullWidth
          margin="normal"
          required
          autoComplete="current-password"
        />
        {error && (
          <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
