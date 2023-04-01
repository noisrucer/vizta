import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import {
  Heading48,
  Heading32,
  Paragraph32,
  Paragraph20,
  Paragraph16,
  Paragraph24,
  Heading20,
} from "../../../components/GlobalStyledComponents";

export default function TimeTable(chartData) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const timeTableInfo = chartData.chartData;

  const CreateTimeTableElements = (subclass, timeslots, instructor) => {
    return (
      <Box
        sx={{
          height: "170px",
          width: "200px",
          backgroundColor: colors.primary[400],
          border: "0.05px solid #70D9BD",
          borderRadius: 2,
          boxShadow: 2,
          marginTop: 1,
          marginBottom: 1,
          margin: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "#70D9BD", marginLeft: 15, marginTop: 1 }}>
            {subclass}
          </h1>
          <h3 style={{ color: "#70D9BD", marginLeft: 15, marginTop: -25 }}>
            Instructor:
          </h3>
          <h4 style={{ marginLeft: 15, fontWeight: "400", marginTop: -20 }}>
            {instructor}
          </h4>
          <h3 style={{ color: "#70D9BD", marginLeft: 15, marginTop: -20 }}>
            Time slots:
          </h3>
        </Box>
        {timeslots.map((item) => (
          <Box
            sx={{
              width: "190px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h4 style={{ marginLeft: 15, fontWeight: "600", marginTop: -20 }}>
              {item.Weekday}:{" "}
            </h4>
            <h5 style={{ marginLeft: 15, fontWeight: "400", marginTop: -20 }}>
              {item.StartTime} ~ {item.EndTime} {item.Location}
            </h5>
          </Box>
        ))}
      </Box>
    );
  };

  function createTimeTable(table) {
    const elements = [];
    for (const key in table) {
      elements.push(
        CreateTimeTableElements(
          key,
          table[key].Timeslots,
          table[key].Instructor
        )
      );
    }
    return elements;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          // overflowX: "hidden",
          // overflowY: "hidden"
          marginBottom: 1,
        }}
      >
        {createTimeTable(timeTableInfo)}
      </Box>
    </Box>
  );
}
