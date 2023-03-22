import { useState, useEffect, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import NivoLineChart from "../Charts/NivoLineChart";

const YearlyTrend = (yearlyChartData) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const yearlyTrendData = yearlyChartData.data;
  const professorList = yearlyChartData.profList;

  console.log("Yearly trend data: ", yearlyTrendData)

  const [switchStats, setSwitchStats] = useState(
    Object.fromEntries(professorList.map(prof => [prof, true]))
  );

  const filteredTrendData = yearlyTrendData.filter(item => switchStats[item.id]);

  function renderSwitch(prof) {
    const handleChange = () => {
      setSwitchStats(stats => ({
        ...stats,
        [prof]: !stats[prof]
      }));
    }

    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="secondary"
              defaultChecked
              onClick={handleChange}
            />
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
        <Box sx={{ width: { xs: "115%", lg: "80%" }, height: { lg: "64vh", xs: "64vh" } }}>
          <NivoLineChart data={filteredTrendData} />
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
