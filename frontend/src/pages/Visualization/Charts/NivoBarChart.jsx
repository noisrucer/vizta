import React from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../../theme";

const NivoBarChart = ({ data, keys }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const maxValueList = []

  data.forEach((d) => {
    for (const [key, value] of Object.entries(d)) {
      if (Number.isInteger(value) === true) {
        maxValueList.push(value)
      }
    }
  });

  const maxValue = Math.max(...maxValueList)
  // const ticks = [0, Math.ceil(maxValue / 5), Math.ceil(2 * maxValue / 5), Math.ceil(3 * maxValue / 5), Math.ceil(4 * maxValue / 5), maxValue]
  const ticks = [0]

  if (maxValue <= 5) {
    ticks.push(1)
    ticks.push(2)
    ticks.push(3)
    ticks.push(4)
    ticks.push(5)
  } else {
    ticks.push(Math.ceil(maxValue / 2))
    ticks.push(maxValue)
  }

  return (
    <ResponsiveBar
      layout="horizontal"
      valueFormat=" >"
      data={data}
      keys={keys}
      indexBy="group"
      margin={{ top: 0, right: 5, bottom: 40, left: 70 }}
      padding={0.3}
      // colors={{ scheme: "greens" }}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      theme={{
        textColor: colors.primary[100],
        tooltip: {
          container: {
            background: colors.grey[900], // set the background color of the tooltip to black
          },
          basic: {
            whiteSpace: "pre",
            display: "flex",
            alignItems: "center",
            color: colors.textColor, // set the text color of the tooltip to white
          },
        },
      }}
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
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      enableGridX={true}
      enableGridY={false}
      gridXValues={3}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: ticks
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      labelSkipWidth={0.1}
      labelSkipHeight={0.1}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 3]],
      }}
      motionConfig="gentle"
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default NivoBarChart;
