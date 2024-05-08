import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

export default function Doughnutchart({ data }) {
  const labels = [];
  const chartData = [];

  Object.entries(data).forEach(([key, value]) => {
    labels.push(value.course.name);
    chartData.push(value.studentCount);
  });

  return (
    <div>
      <h1 className="text-slate-600 text-lg">Popularity</h1>
      <Doughnut
        width={150}
        height={400}
        data={{
          labels: labels,
          datasets: [
            {
              label: "Count",
              data: chartData,
            },
          ],
        }}
      />
    </div>
  );
}
