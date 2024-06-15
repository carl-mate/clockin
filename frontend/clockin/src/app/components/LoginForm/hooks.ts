import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context';
import { useForm } from 'react-hook-form';

type LoginFormInputs = {
  username: string;
  email: string;
  password: string;
};

export default function useHooks() {
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

  return { register, handleSubmit, onSubmit }
}
