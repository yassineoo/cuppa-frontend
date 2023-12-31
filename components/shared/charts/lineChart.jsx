import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

let chartData = {
  labels,
  datasets: [
    {
      data: [66, 144, 146, 116, 107, 131, 43],
      label: "Applied",
      borderColor: "rgb(109, 253, 181)",
      backgroundColor: "rgb(109, 253, 181,0.5)",
      borderWidth: 2,
    },
    {
      data: [40, 100, 44, 70, 63, 30, 10],
      label: "Accepted",
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgb(75, 192, 192,0.5)",
      borderWidth: 2,
    },
    {
      data: [20, 24, 50, 34, 33, 23, 12],
      label: "Pending",
      borderColor: "rgb(255, 205, 86)",
      backgroundColor: "rgb(255, 205, 86,0.5)",
      borderWidth: 2,
    },
    {
      data: [6, 20, 52, 12, 11, 78, 21],
      label: "Rejected",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgb(255, 99, 132,0.5)",
      borderWidth: 2,
    },
  ],
};

export default function LineChart({ data }) {
  if (data !== undefined) {
    chartData = data;
  }
  return <Line data={chartData} className="w-full h-full" />;
}
