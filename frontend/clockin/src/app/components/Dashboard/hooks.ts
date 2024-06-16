"use client";

import moment from "moment";

import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axios";

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
    const fetchCheckins = async () => {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("checkins/", {
        headers: { Authorization: `Token ${token}` },
      });
      const data: CheckIn[] = response.data;

      console.log("data: ", data);

      const groupedByTag = data.reduce((acc, curr) => {
        acc[curr.tag] = (acc[curr.tag] || 0) + parseFloat(curr.hours);
        return acc;
      }, {});

      const pieChartData = {
        labels: Object.keys(groupedByTag),
        datasets: [
          {
            data: Object.values(groupedByTag),
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

      const trendChartData = {
        labels: [
          ...new Set(
            data.map((entry) => moment(entry.created_at).format("YYYY-MM-DD")),
          ),
        ],
        datasets: [
          {
            label: "Hours",
            data: data.reduce((acc, curr) => {
              const date = moment(curr.created_at).format("YYYY-MM-DD");
              acc[date] = (acc[date] || 0) + parseFloat(curr.hours);
              return acc;
            }, {}),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      const totalTimeSpent = Object.values(groupedByTag).reduce(
        (sum, value) => sum + value,
        0,
      );

      const totalCheckInsCount = data.length;

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

      setPieData(pieChartData);
      setTrendData(trendChartData);
      setTotalTime(totalTimeSpent);
      setTotalCheckIns(totalCheckInsCount);
    };
    fetchCheckins();
  }, []);

  return { chartData, pieData, trendData, totalTime, totalCheckIns };
}
