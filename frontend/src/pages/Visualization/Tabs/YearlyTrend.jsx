import { useState, useEffect, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import NivoLineChart from "../Charts/NivoLineChart";
import lineData from "./NivoData/LineData";

const YearlyTrend = (yearlyChartData) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log("yearly trend chart data: ", yearlyChartData);
  const yearlyTrendData = yearlyChartData.data;
  const professorList = yearlyChartData.profList;

  function renderSwitch(prof) {

    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="secondary"
              defaultChecked />
          }
          label={prof}
        />
      </FormGroup>
    );
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12,1fr)"
      gridAutoRows={{ xs: "100px", lg: "1fr" }}
      gap="20px"
      marginTop={4}
      marginBottom={3}
      sx={{ height: "100%" }}
    >
      <Box
        gridColumn="span 12"
        gridRow={{ xs: "span 6", lg: "span 1" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        borderRadius="2%"
        padding={3}
      >
        <Box width="80%" height="64vh">
          <NivoLineChart data={yearlyTrendData} />
        </Box>
        <Box
          sx={{
            marginTop: 2,
            width: { xs: "100%", lg: "20%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormControl component="fieldset" variant="standard">
            {professorList.map((item) => {
              return renderSwitch(item);
            })}
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default YearlyTrend;
