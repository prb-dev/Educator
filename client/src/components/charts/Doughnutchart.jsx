import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

export default function Doughnutchart({ data }) {
  const labels = [];
  const chartData = [];
  const colors = [];

  Object.entries(data).forEach(([key, value]) => {
    labels.push(value.course.name);
    chartData.push(value.studentCount);
    colors.push(
      `rgb(${Math.floor(Math.random() * 150)} ${Math.floor(
        Math.random() * 200
      )} ${Math.floor(Math.random() * 256)})`
    );
  });

  return (
    <div>
      <h1 className="text-slate-600 text-lg">Popularity</h1>
      <Doughnut
        data={{
          labels: labels,
          datasets: [
            {
              label: "Count",
              data: chartData,
              backgroundColor: colors,
              borderWidth: 1,
              borderRadius: 5,
            },
          ],
        }}
        options={{
          aspectRatio: 2,
        }}
      />
    </div>
  );
}
