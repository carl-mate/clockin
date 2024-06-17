"use client";

import moment from "moment";

import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axios";
import { getToken } from "@/app/utils/getToken";

type CheckIn = {
  id: number;
  user: number;
  hours: number;
  tag: string;
  activity: string;
  created_at: string;
};

export function useHooks() {
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
  const [pieData, setPieData] = useState({
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
  const [trendData, setTrendData] = useState({
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
  const [totalTime, setTotalTime] = useState(0);
  const [totalCheckIns, setTotalCheckIns] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("checkins/dashboard_data/", {
        headers: { Authorization: `Token ${getToken()}` },
      });
      const data = response.data;

      // Process data for charts
      const topTags = data.top_time_investments.map((item) => item.tag);
      const topHours = data.top_time_investments.map((item) =>
        parseFloat(item.total_hours),
      );

      const pieChartData = {
        labels: topTags,
        datasets: [
          {
            data: topHours,
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(201, 203, 207, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      const chartData = {
        labels: topTags,
        datasets: [
          {
            label: "Hours",
            data: topHours,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      const trendLabels = data.time_trends.map((item) => item.day);
      const trendHours = data.time_trends.map((item) =>
        parseFloat(item.total_hours),
      );

      const trendChartData = {
        labels: trendLabels,
        datasets: [
          {
            label: "Hours",
            data: trendHours,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      setTotalTime(data.total_time);
      setTotalCheckIns(data.total_checkins);
      setPieData(pieChartData);
      setChartData(chartData);
      setTrendData(trendChartData);
    };

    fetchData();
  }, []);

  return { chartData, pieData, trendData, totalTime, totalCheckIns };
}
