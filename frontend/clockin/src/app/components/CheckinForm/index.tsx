'use client';

import { Box, Button, TextField, Container } from '@mui/material';
import { useHooks } from './hooks';

export default function CheckinForm() {
  const { hours, tag, activity, setHours, setTag, setActivity, handleSubmit } =
    useHooks();

  return (
    <Container>
      <Box component='form' onSubmit={handleSubmit}>
        <TextField
          label='Hours'
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Tag'
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Activity'
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          fullWidth
          margin='normal'
        />
        <Button type='submit' variant='contained' color='primary'>
          Check-in
        </Button>
      </Box>
    </Container>
  );
}
