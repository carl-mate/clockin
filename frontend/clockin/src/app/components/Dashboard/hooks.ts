import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axios";

export default function useHooks() {
  const [chartData, setChartData] = useState({
    labels: [""],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "",
        borderColor: "",
        borderWidth: 0,
      },
    ],
  });

  useEffect(() => {
    const fetchCheckins = async () => {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("checkins/", {
        headers: { Authorization: `Token ${token}` },
      });
      const data = response.data;

      console.log("data: ", data);

      const groupedByTag = data.reduce((acc, curr) => {
        acc[curr.tag] = (acc[curr.tag] || 0) + parseFloat(curr.hours);
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(groupedByTag),
        datasets: [
          {
            label: "Hours",
            data: Object.values(groupedByTag),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    };
    fetchCheckins();
  }, []);

  console.log("chartData", chartData);

  return { chartData };
}
