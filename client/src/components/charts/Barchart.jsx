import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function Barchart({ data }) {
  const dataSet = [];

  Object.entries(data).forEach(([key, value]) => {
    const monthCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const enrollmentMonths = value.enrollmentMonths;

    enrollmentMonths.forEach((month) => {
      switch (month) {
        case 0:
          monthCounts[0]++;
          break;
        case 1:
          monthCounts[1]++;
          break;
        case 2:
          monthCounts[2]++;
          break;
        case 3:
          monthCounts[3]++;
          break;
        case 4:
          monthCounts[4]++;
          break;
        case 5:
          monthCounts[5]++;
          break;
        case 6:
          monthCounts[6]++;
          break;
        case 7:
          monthCounts[7]++;
          break;
        case 8:
          monthCounts[8]++;
          break;
        case 9:
          monthCounts[9]++;
          break;
        case 10:
          monthCounts[10]++;
          break;
        case 11:
          monthCounts[11]++;
          break;
        default:
          break;
      }
    });

    dataSet.push({
      label: value.course.name,
      data: monthCounts,
      borderWidth: 2,
      barThickness: 20,
      borderRadius: 5,
    });
  });

  return (
    <div className="grid place-content-center cursor-pointer m-5 shadow-lg hover:brightness-105 shadow-slate-200 rounded-lg p-5">
      <h1 className="text-slate-600 text-lg">Student Enrollments</h1>

      <Bar
        width={500}
        height={1000}
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
          datasets: dataSet,
        }}
        options={{
          indexAxis: "y",
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
