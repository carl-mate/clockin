"use client";
import { Box, Button, TextField } from "@mui/material";
import { useHooks } from "./hooks";

export default function CheckinForm() {
  const { input, setInput, error, handleSubmit } = useHooks();
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Check-in"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          error={!!error}
          helperText={error}
          placeholder="5.5 hrs #project-x fix login issue"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Check-in
        </Button>
      </Box>
    </>
  );
}
