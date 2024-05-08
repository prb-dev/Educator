import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function Progress() {
  // Dummy data representing progress for each course
  const progressData = {
    labels: ["Course 1", "Course 2", "Course 3"],
    datasets: [
      {
        label: "Progress",
        data: [80, 60, 90], // Progress percentage for each course
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-slate-700  pl-10 text-lg ">Progress</h1>
      <Doughnut
        width={200}
        height={100}
        data={progressData}
      />
    </div>
  );
}
