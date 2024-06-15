import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context';
import { useForm } from 'react-hook-form';

type RegisterFormInputs = {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

export default function useHooks() {
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

  return { register, handleSubmit, onSubmit }
}