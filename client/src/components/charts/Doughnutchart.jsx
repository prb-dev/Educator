import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

export default function Doughnutchart() {
  return (
    <div>
      <h1 className="text-slate-700 text-lg">Popularity</h1>
      <Doughnut
        width={200}
        height={100}
        data={{
          labels: ["mon", "tue", "wed"],
          datasets: [
            {
              label: "Count",
              data: [3, 6, 9],
              borderWidth: 1,
              barThickness: 20,
              borderRadius: 5,
            },
          ],
        }}
      />
    </div>
  );
}
