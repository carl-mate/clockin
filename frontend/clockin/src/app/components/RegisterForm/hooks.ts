"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthProvider";
import { useForm } from "react-hook-form";
import { useState } from "react";

type RegisterFormInputs = {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

export default function useHooks() {
  const { register, handleSubmit } = useForm<RegisterFormInputs>();
  const { register: signUp } = useAuth();
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

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await signUp(data.username, data.email, data.password1, data.password2);
      router.push("/");
    } catch (error) {
      throw new Error(
        "Sign up failed. Please check your credentials and try again.",
      );
    }
  };

  return { register, handleSubmit, onSubmit, error, handleFormSubmit };
}
