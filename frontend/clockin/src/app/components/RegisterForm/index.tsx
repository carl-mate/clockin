'use client';

import { TextField, Button, Typography, Box } from '@mui/material';

import useHooks from './hooks';

export default function RegisterForm() {
  const { register, handleSubmit, onSubmit } = useHooks();
  return (
    <>
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
    </>
  );
}
