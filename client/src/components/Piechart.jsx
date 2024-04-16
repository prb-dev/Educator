import React from "react";
import { ResponsivePie } from "@nivo/pie";

export default function Piechart() {
  const data = [
    {
      id: "javascript",
      label: "javascript",
      value: 325,
      color: "hsl(306, 70%, 50%)",
    },
    {
      id: "elixir",
      label: "elixir",
      value: 513,
      color: "hsl(183, 70%, 50%)",
    },
    {
      id: "c",
      label: "c",
      value: 553,
      color: "hsl(20, 70%, 50%)",
    },
    {
      id: "haskell",
      label: "haskell",
      value: 222,
      color: "hsl(10, 70%, 50%)",
    },
    {
      id: "hack",
      label: "hack",
      value: 152,
      color: "hsl(246, 70%, 50%)",
    },
  ];

  return (
    <div
      className="flex flex-col p-5  m-5 rounded-xl items-center w-[400px] h-[400px] hover:brightness-105 cursor-pointer"
      style={{ backgroundColor: "#141b2d" }}
    >
      <h1 className="text-lg text-white font-semibold">Pie chart</h1>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
