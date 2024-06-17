"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthProvider";
import { useForm } from "react-hook-form";
import { useState } from "react";

type LoginFormInputs = {
  username: string;
  email: string;
  password: string;
};

export default function useHooks() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFormSubmit = async (data: any) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.username, data.email, data.password);
      router.push("/");
    } catch (error) {
      throw new Error(
        "Login failed. Please check your credentials and try again.",
      );
    }
  };

  return { register, handleSubmit, onSubmit, error, handleFormSubmit };
}
