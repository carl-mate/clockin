import { Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <Container maxWidth='lg'>
      <RegisterForm />
      <Typography align='center' mt={2}>
        Already have an account?{' '}
        <Link href='/login' passHref>
          <Button variant='text' color='primary'>
            Login
          </Button>
        </Link>
      </Typography>
    </Container>
  );
}
