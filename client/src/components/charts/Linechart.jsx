import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import revenueData from "../../data/revenueData.json";

export default function Linegraph() {
  const options = {};
  const data = {
    labels: ["Monday, Tuesday"],
    datasets: [
      {
        label: "steps",
        data: [100, 200],
        borderColor: "rgb(75,192,192)",
      },
    ],
  };
  return (
    <div className="w-fit h-fit">
      <h1 className="text-slate-700 text-lg">Revenue</h1>

      <Line
        width={700}
        height={400}
        data={{
          labels: revenueData.map((data) => data.label),
          datasets: [
            {
              label: "Revenue",
              data: revenueData.map((data) => data.revenue),
              borderWidth: 2,
            },
            {
              label: "Cost",
              data: revenueData.map((data) => data.cost),
              borderWidth: 2,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              border: {
                dash: [6],
              },
            },
            y: {
              border: {
                dash: [6],
              },
              ticks: {
                display: false,
              },
            },
          },
          plugins: {
            title: {
              text: "Revenue Source",
            },
          },
        }}
      />
    </div>
  );
}
