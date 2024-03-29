import React from "react";
import { useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../../../theme";

const NivoLineChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsiveLine
      data={data}
      colors={["#50B19E", "#5772B3", "#F4BA41", "#EC8B33", "#DF6E53"]}
      colorBy="index"
      margin={{ top: 50, right: 130, bottom: 25, left: 60 }}
      theme={{
        grid: {
          line: {
            stroke: colors.grey[600]
          }
        },
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
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "1",
        max: "5",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
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
  );
};

export default NivoLineChart;
