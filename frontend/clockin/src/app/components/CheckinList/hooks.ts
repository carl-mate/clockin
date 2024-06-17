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
  const [totalCheckins, setTotalCheckins] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [isLoading, setLoading] = useState(true);

  const refetchCheckins = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `checkins/?page=${paginationModel.page + 1}&page_size=${paginationModel.pageSize}`,
        { headers: { Authorization: `Token ${getToken()}` } },
      );
      console.log('page and pageSize: ', paginationModel.page, paginationModel.pageSize)
      setCheckins(response.data.results);
      setTotalCheckins(response.data.count);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await refetchCheckins();
    };
    fetchData();
  }, [paginationModel]);

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
    } catch (error) {
      console.error("Error submitting check-in:", error.response.data);
    }
  };

  const handleDelete = async (id: number) => {
    await axiosInstance.delete(`checkins/${id}/`, {
      headers: { Authorization: `Token ${getToken()}` },
    });
    await refetchCheckins();
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
    totalCheckins,
    paginationModel,
    setPaginationModel,
    isLoading,
  };
}
