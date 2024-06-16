"use client";

import { Container } from "@mui/material";
import { useHooks } from "./hooks";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
);

export default function Dashboard() {
  const { chartData } = useHooks();
  console.log("chartData from server", chartData);

  return (
    <Container>
      <Bar data={chartData} />
    </Container>
  );
}
