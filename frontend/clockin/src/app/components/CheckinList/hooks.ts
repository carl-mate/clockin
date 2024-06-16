"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axios";
import { getToken } from "@/app/utils/getToken";

export function useHooks() {
  const [checkins, setCheckins] = useState<any[]>([]);

  useEffect(() => {
    const fetchCheckins = async () => {
      const response = await axiosInstance.get("checkins/", {
        headers: { Authorization: `Token ${getToken()}` },
      });
      setCheckins(response.data);
    };
    fetchCheckins();
  }, []);

  const handleDelete = async (id: number) => {
    await axiosInstance.delete(`checkins/${id}/`, {
      headers: { Authorization: `Token ${getToken()}` },
    });
    setCheckins(checkins.filter((checkins) => checkins.id !== id));
  };

  return { checkins, handleDelete };
}
