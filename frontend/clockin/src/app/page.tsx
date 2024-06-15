import { Typography, Container } from '@mui/material';
import CheckinForm from './components/CheckinForm';
import CheckinList from './components/CheckinList';

export default function Home() {
  return (
    <Container maxWidth='lg'>
      <Typography variant='h1'>ClockIn</Typography>
      <CheckinForm />
      <CheckinList />
    </Container>
  );
}
