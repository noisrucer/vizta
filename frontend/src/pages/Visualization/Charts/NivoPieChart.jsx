import React from "react";
import { useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../../theme";

const NivoPieChart = ({ data /* see data tab */ }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 30, right: 110, bottom: 60, left: 110 }}
      valueFormat={(value) =>
        `${Number(value).toLocaleString("en-EN", {
          minimumFractionDigits: 0,
        })} %`
      }
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      colors={{ scheme: "greens" }}
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
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={0}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLinkLabelsTextColor={colors.textColor}
      arcLabel={function (e) {
        return e.value + "%";
      }}
      arcLabelsTextColor={"black"}
    />
  );
};

export default NivoPieChart;
