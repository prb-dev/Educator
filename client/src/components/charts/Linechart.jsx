import React from "react";
import { Line } from "react-chartjs-2";

import revenueData from "../../data/revenueData.json";

export default function Linegraph({ data }) {
  const dataSet = [];

  Object.entries(data).forEach(([key, value]) => {
    const monthCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const monthlyRevenues = [];
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

    monthCounts.forEach((month, i) => {
      monthlyRevenues[i] = month * value.course.price;
    });

    dataSet.push({
      label: value.course.name,
      data: monthlyRevenues,
      borderWidth: 2,
      pointStyle: "circle",
      radius: 0,
    });
  });

  return (
    <div className="w-fit h-fit">
      <h1 className="text-slate-600 text-lg">Revenue</h1>

      <Line
        width={400}
        height={300}
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
          scales: {
            x: {
              border: {
                dash: [6],
              },
              ticks: {
                display: false,
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
