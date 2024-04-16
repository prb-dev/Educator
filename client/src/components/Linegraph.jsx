import React from "react";
import { ResponsiveLine } from "@nivo/line";

export default function Linegraph() {
  const data = [
    {
      id: "japan",
      color: "hsl(135, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 70,
        },
        {
          x: "helicopter",
          y: 192,
        },
        {
          x: "boat",
          y: 96,
        },
        {
          x: "train",
          y: 257,
        },
        {
          x: "subway",
          y: 248,
        },
        {
          x: "bus",
          y: 215,
        },
        {
          x: "car",
          y: 290,
        },
        {
          x: "moto",
          y: 136,
        },
        {
          x: "bicycle",
          y: 274,
        },
        {
          x: "horse",
          y: 35,
        },
        {
          x: "skateboard",
          y: 30,
        },
        {
          x: "others",
          y: 251,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(172, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 14,
        },
        {
          x: "helicopter",
          y: 279,
        },
        {
          x: "boat",
          y: 159,
        },
        {
          x: "train",
          y: 188,
        },
        {
          x: "subway",
          y: 15,
        },
        {
          x: "bus",
          y: 198,
        },
        {
          x: "car",
          y: 99,
        },
        {
          x: "moto",
          y: 50,
        },
        {
          x: "bicycle",
          y: 107,
        },
        {
          x: "horse",
          y: 225,
        },
        {
          x: "skateboard",
          y: 48,
        },
        {
          x: "others",
          y: 65,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(290, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 31,
        },
        {
          x: "helicopter",
          y: 66,
        },
        {
          x: "boat",
          y: 74,
        },
        {
          x: "train",
          y: 138,
        },
        {
          x: "subway",
          y: 167,
        },
        {
          x: "bus",
          y: 194,
        },
        {
          x: "car",
          y: 266,
        },
        {
          x: "moto",
          y: 196,
        },
        {
          x: "bicycle",
          y: 177,
        },
        {
          x: "horse",
          y: 51,
        },
        {
          x: "skateboard",
          y: 129,
        },
        {
          x: "others",
          y: 148,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(150, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 239,
        },
        {
          x: "helicopter",
          y: 74,
        },
        {
          x: "boat",
          y: 181,
        },
        {
          x: "train",
          y: 286,
        },
        {
          x: "subway",
          y: 172,
        },
        {
          x: "bus",
          y: 248,
        },
        {
          x: "car",
          y: 37,
        },
        {
          x: "moto",
          y: 231,
        },
        {
          x: "bicycle",
          y: 129,
        },
        {
          x: "horse",
          y: 37,
        },
        {
          x: "skateboard",
          y: 37,
        },
        {
          x: "others",
          y: 87,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(154, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 207,
        },
        {
          x: "helicopter",
          y: 260,
        },
        {
          x: "boat",
          y: 107,
        },
        {
          x: "train",
          y: 96,
        },
        {
          x: "subway",
          y: 89,
        },
        {
          x: "bus",
          y: 12,
        },
        {
          x: "car",
          y: 21,
        },
        {
          x: "moto",
          y: 193,
        },
        {
          x: "bicycle",
          y: 183,
        },
        {
          x: "horse",
          y: 207,
        },
        {
          x: "skateboard",
          y: 225,
        },
        {
          x: "others",
          y: 107,
        },
      ],
    },
  ];

  return (
    <div
      className="flex flex-col p-5  m-5 rounded-xl items-center w-[800px] h-[400px] hover:brightness-105 cursor-pointer"
      style={{ backgroundColor: "#141b2d" }}
    >
      <h1 className="text-lg text-white font-semibold">Line chart</h1>
      <ResponsiveLine
        data={data}
        layers={[
          "grid",
          "markers",
          "axes",
          "areas",
          "crosshair",
          "lines",
          "points",
          "slices",
          "mesh",
          "legends",
        ]}
        enableGridX={false}
        enableGridY={false}
        enablePoints={true}
        enablePointLabel={false}
        pointLabel="y"
        colors={{ scheme: "nivo" }}
        enableArea={false}
        areaOpacity={0.2}
        areaBlendMode="normal"
        areaBaselineValue={0}
        lineWidth={2}
        isInteractive={true}
        debugMesh={false}
        enableSlices={false}
        debugSlices={false}
        sliceTooltip={() => {}}
        enableCrosshair={true}
        crosshairType="bottom-left"
        role="application"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        pointSize={8}
        pointColor={{ from: "color" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
