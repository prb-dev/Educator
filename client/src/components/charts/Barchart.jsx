import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function Barchart() {
  return (
    <div className="w-[80%] h-fit grid place-content-center cursor-pointer m-5 border border-slate-800 bg-slate-800/5 rounded-lg p-5">
      <h1 className="text-slate-700 text-lg">Student Enrollments</h1>
      
      <Bar
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
              borderWidth: 1,
              barThickness: 20,
              borderRadius: 5,
            },
            {
              label: "Count",
              data: [3, 6, 9],
              borderWidth: 1,
              barThickness: 20,
              borderRadius: 5,
            },
            {
              label: "Count",
              data: [3, 6, 9],
              borderWidth: 1,
              barThickness: 20,
              borderRadius: 5,
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
