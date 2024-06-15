'use client';

import { Typography, Container } from '@mui/material';
import CheckinForm from './components/CheckinForm';
import CheckinList from './components/CheckinList';
import ProtectedRoute from './components/ProtectedRoute';

export default function Home() {
  return (
    <ProtectedRoute>
      <Container maxWidth='lg'>
        <Typography variant='h1'>ClockIn</Typography>
        <CheckinForm />
        <CheckinList />
      </Container>
    </ProtectedRoute>
  );
}
