"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axios";
import { getToken } from "@/app/utils/getToken";
import fetchUser, { type User } from "@/app/utils/fetchUser";

type CheckIn = {
  hours: number;
  tag: string;
  activity: string;
};

export function useHooks() {
  const [checkins, setCheckins] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const refetchCheckins = async () => {
    const response = await axiosInstance.get("checkins/", {
      headers: { Authorization: `Token ${getToken()}` },
    });
    setCheckins(response.data);
  };

  useEffect(() => {
    const fetchCheckins = async () => {
      await refetchCheckins();
    };
    fetchCheckins();
  }, []);

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
      await axiosInstance.post(
        "checkins/",
        { ...parsedData, user: user?.pk },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${getToken()}`,
          },
        },
      );
      setInput("");
      setError(null);
      await refetchCheckins();
      alert("Check-in submitted successfully");
    } catch (error) {
      console.error("Error submitting check-in:", error.response.data);
      alert("Failed to submit check-in");
    }
  };

  const handleDelete = async (id: number) => {
    await axiosInstance.delete(`checkins/${id}/`, {
      headers: { Authorization: `Token ${getToken()}` },
    });
    setCheckins(checkins.filter((checkins) => checkins.id !== id));
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
    checkins,
    handleDelete,
  };
}
