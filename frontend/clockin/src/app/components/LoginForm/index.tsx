'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useForm } from 'react-hook-form';

import { Container, Typography, Box, TextField, Button } from '@mui/material';

type LoginFormInputs = {
  username: string;
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.username, data.email, data.password);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container>
      <Typography variant='h4'>Login</Typography>
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Username'
          {...register('username')}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Email'
          {...register('email')}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Password'
          type='password'
          {...register('password')}
          fullWidth
          margin='normal'
        />
        <Button type='submit' variant='contained' color='primary'>
          Login
        </Button>
      </Box>
    </Container>
  );
}
