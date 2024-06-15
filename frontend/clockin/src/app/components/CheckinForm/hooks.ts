"use client";

import React, { useState, useEffect } from "react";

import axiosInstance from "@/app/utils/axios";
import fetchUser, { type User } from "@/app/utils/fetchUser";

type CheckIn = {
  hours: number;
  tag: string;
  activity: string;
};

export function useHooks() {
  const [user, setUser] = useState<User | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = await fetchUser();
      setUser(currentUser);
    };
    getCurrentUser();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const parsedData = parseCheckInInput(input);

    if (!parsedData) {
      setError("Invalid check-in format");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post(
        "checkins/",
        { ...parsedData, user: user?.pk },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        },
      );
      setInput("");
      setError(null);
      alert("Check-in submitted successfully");
    } catch (error) {
      console.error("Error submitting check-in:", error.response.data);
      alert("Failed to submit check-in");
    }
  };

  const parseCheckInInput = (input: string): CheckIn | null => {
    const match = input.match(/^(\d+(\.\d+)?)\s*(hr|hrs)\s*#(\S+)\s*(.+)$/i);

    if (!match) {
      return null;
    }

    const hours = parseFloat(match[1]);
    const tag = match[4];
    const activity = match[5];

    return { hours, tag, activity };
  };

  return {
    input,
    setInput,
    error,
    handleSubmit,
  };
}
