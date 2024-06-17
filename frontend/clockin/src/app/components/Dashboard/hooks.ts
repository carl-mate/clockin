"use client";

import moment from "moment";

import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axios";
import { getToken } from "@/app/utils/getToken";

type DashboardData = {
  total_time: number;
  total_checkins: number;
  time_allocation: number[];
  top_time_investments: Array<{ tag: string; total_hours: string }>;
  time_trends: Array<{ day: string; total_hours: string }>;
};

export function useHooks() {
  const [chartData, setChartData] = useState({
    labels: ["No Data"],
    datasets: [
      {
        label: "No Data",
        data: [0],
        backgroundColor: "",
        borderColor: "",
        borderWidth: 0,
      },
    ],
  });
  const [pieData, setPieData] = useState({
    labels: ["No Data"],
    datasets: [
      {
        data: [0],
        backgroundColor: [""],
        borderColor: [""],
        borderWidth: 0,
      },
    ],
  });
  const [trendData, setTrendData] = useState({
    labels: ["No Data"],
    datasets: [
      {
        label: "No Data",
        data: [0],
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
      const response = await axiosInstance.get<DashboardData>(
        "checkins/dashboard_data/",
        {
          headers: { Authorization: `Token ${getToken()}` },
        },
      );
      const { top_time_investments, time_trends, total_time, total_checkins } =
        response.data;

      // Process data for charts
      const topTags = top_time_investments.map((item) => item.tag);
      const topHours = top_time_investments.map((item) =>
        parseFloat(item.total_hours),
      );

      if (total_checkins === 0) {
        setTotalTime(0);
        setTotalCheckIns(0);
        return;
      }

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

      const trendLabels = time_trends.map((item) =>
        moment(item.day).format("YYYY-MM-DD"),
      );
      const trendHours = time_trends.map((item) =>
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

      setTotalTime(total_time);
      setTotalCheckIns(total_checkins);
      setPieData(pieChartData);
      setChartData(chartData);
      setTrendData(trendChartData);
    };

    fetchData();
  }, []);

  return { chartData, pieData, trendData, totalTime, totalCheckIns };
}
