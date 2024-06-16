"use client";

import { Box, Button, TextField, Container } from "@mui/material";
import { useHooks } from "./hooks";

export default function CheckinForm() {
  const { input, setInput, error, handleSubmit } = useHooks();

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Check-in"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          error={!!error}
          helperText={error}
          placeholder="5.5 hrs #project-x fix login issue"
        />
        <Button type="submit" variant="contained" color="primary">
          Check-in
        </Button>
      </Box>
    </Container>
  );
}
