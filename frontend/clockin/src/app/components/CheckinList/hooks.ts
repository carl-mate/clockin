import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axios";

export function useHooks() {
  const [checkins, setCheckins] = useState<any[]>([]);

  useEffect(() => {
    const fetchCheckins = async () => {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("checkins/", {
        headers: { Authorization: `Token ${token}` },
      });
      setCheckins(response.data);
    };
    fetchCheckins();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    await axiosInstance.delete(`checkins/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    setCheckins(checkins.filter((checkins) => checkins.id !== id));
  };

  return { checkins, handleDelete };
}
