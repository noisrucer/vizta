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
      valueFormat=">-.2f"
      borderColor={{ from: "color" }}
      margin={{ top: 20, right: 95, bottom: 50, left: 95 }}
      gridShape="linear"
      gridLabelOffset={15}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      colors={{ scheme: "nivo" }}
      fillOpacity={1}
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
      animate={false}
      blendMode="multiply"
      motionConfig="wobbly"
    />
  );
};

export default NivoRadarChart;
