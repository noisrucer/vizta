import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { ColorModeContext, tokens } from "../../../theme";
import ProfessorRadarChart from "../Charts/ProfessorRadarChart";

const ProfessorStats = (profChartData) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const profStatsData = profChartData.data;
  const professorList = profChartData.profList;

  const [switchStats, setSwitchStats] = useState(
    Object.fromEntries(professorList.map((prof) => [prof, true]))
  );

  const filteredTrendData = profStatsData.map((item) => {
    const filteredItem = {};
    for (const [key, value] of Object.entries(item)) {
      filteredItem["criteria"] = item.criteria;
      if (switchStats[key] === true) {
        filteredItem[key] = value;
      }
    }
    return filteredItem;
  });

  const filteredKey = [];

  professorList.map((item) => {
    if (switchStats[item] === true) {
      filteredKey.push(item);
    }
  });

  function renderSwitch(prof) {
    const handleChange = () => {
      setSwitchStats((stats) => ({
        ...stats,
        [prof]: !stats[prof],
      }));
    };

    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Switch color="secondary" defaultChecked onClick={handleChange} />
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
      marginTop={2}
      height="71.5vh"
    >
      <Box
        gridColumn="span 12"
        gridRow={{ xs: "span 5", lg: "span 1" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        borderRadius="2%"
      >
        <Box
          width={{ xs: "100%", sm: "80%" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            width={{
              xs: "400px",
              sm: "500px",
              md: "500px",
              lg: "500px",
              xl: "500px",
            }}
            height={{
              xs: "400px",
              sm: "500px",
              md: "500px",
              lg: "500px",
              xl: "500px",
            }}
          >
            <ProfessorRadarChart data={filteredTrendData} keys={filteredKey} />
          </Box>
        </Box>
        <Box
          width={{ xs: "100%", sm: "20%" }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormControl component="fieldset" variant="standard">
            {profChartData.profList.map((item) => {
              return renderSwitch(item);
            })}
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfessorStats;
