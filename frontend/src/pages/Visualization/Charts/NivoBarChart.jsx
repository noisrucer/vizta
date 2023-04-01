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

  if (maxValueList.length === 12) {
    maxValueList[0] = maxValueList[0] + maxValueList[1] + maxValueList[2]
    maxValueList[1] = maxValueList[3] + maxValueList[4] + maxValueList[5]
    maxValueList[2] = maxValueList[6] + maxValueList[7] + maxValueList[8]
    maxValueList[3] = maxValueList[9] + maxValueList[10]
    maxValueList[4] = maxValueList[11]
  }

  const maxValue = Math.max(...maxValueList)
  const ticks = [0]

  if (maxValue <= 5) {
    ticks.push(1)
    ticks.push(2)
    ticks.push(3)
    ticks.push(4)
    ticks.push(5)
  } else {
    for (let i = 1; i < maxValue; i++) {
      ticks.push(i * 5)
    }
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
      colors={["#50B19E", "#5772B3", "#F4BA41", "#EC8B33", "#DF6E53"].reverse()}
      colorBy="index"
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
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      enableGridX={true}
      enableGridY={false}
      gridXValues={5}
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
