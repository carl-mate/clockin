"use client";

import { Typography, Box, TextField, Button } from "@mui/material";
import useHooks from "./hooks";

export default function LoginForm() {
  const { register, handleSubmit, onSubmit } = useHooks();
  return (
    <>
      <Typography variant="h4">Login</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          {...register("username")}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          {...register("email")}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Box>
    </>
  );
}
