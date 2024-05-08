import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function Barchart() {
  return (
    <div className="grid place-content-center cursor-pointer m-5 shadow-lg shadow-slate-200 rounded-lg p-5">
      <h1 className="text-slate-600 text-lg">Student Enrollments</h1>

      <Bar
        width={1000}
        height={400}
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Count",
              data: [3, 6, 9],
              borderWidth: 0,
              barThickness: 15,
              borderRadius: 10,
            },
            {
              label: "Count",
              data: [3, 6, 9],
              borderWidth: 0,
              barThickness: 15,
              borderRadius: 10,
            },
            {
              label: "Count",
              data: [3, 6, 9],
              borderWidth: 0,
              barThickness: 15,
              borderRadius: 10,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              border: {
                dash: [6],
              },
              display: false,
            },
            y: {
              border: {
                dash: [6],
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
