'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

type RegisterFormInputs = {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

export default function RegisterForm() {
  const { register, handleSubmit } = useForm<RegisterFormInputs>();
  const { register: signUp } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await signUp(data.username, data.email, data.password1, data.password2);
      router.push('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Container>
      <Typography variant='h4'>Register</Typography>
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
          {...register('password1')}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Confirm Password'
          type='password'
          {...register('password2')}
          fullWidth
          margin='normal'
        />
        <Button type='submit' variant='contained' color='primary'>
          Register
        </Button>
      </Box>
    </Container>
  );
}
