import React from "react";
import { useTheme } from "@mui/material";
import { ResponsiveRadar } from "@nivo/radar";
import { tokens } from "../../../theme";

const NivoRadarChart = ({ data, keys }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveRadar
      data={data}
      keys={keys}
      indexBy="criteria"
      maxValue={5}
      valueFormat=">-.2f"
      borderColor={{ from: "color" }}
      margin={{ top: 20, right: 95, bottom: 100, left: 95 }}
      gridShape="linear"
      gridLabelOffset={15}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={0}
      colors={[
        "#36A0E9",
        "#E95E7C",
        "#50B19E",
        "#5772B3",
        "#F4BA41",
        "#EC8B33",
      ]}
      colorBy="index"
      fillOpacity={0.5}
      theme={{
        grid: {
          line: {
            stroke: colors.grey[600],
          },
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
      animate={false}
      blendMode="normal"
      motionConfig="wobbly"
    />
  );
};

export default NivoRadarChart;
