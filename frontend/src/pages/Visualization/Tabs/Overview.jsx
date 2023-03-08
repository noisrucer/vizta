import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import NivoBarChart from "../Charts/NivoBarChart";
import NivoPieChart from "../Charts/NivoPieChart";
import NivoRadarChart from "../Charts/NivoRadarChart";
import barData from "./NivoData/BarData";
import pieData from "./NivoData/PieData";
import radarData from "./NivoData/RadarData";
import LinearPercentage from "../Charts/ProgessiveBar/LinearPercentage";
import LectureQualityScore from "../Charts/ProgessiveBar/LectureQuailtyScore";

const Overview = (chartData) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log("chartData: ", chartData)
  return (
    //Grid & Charts
    <Box
      display="grid"
      gridTemplateColumns="repeat(14,1fr)"
      gridAutoRows={{ xs: "100px", lg: "1fr" }}
      gap="20px"
      marginTop={4}
      marginBottom={3}
      sx={{ height: "100%" }}
    >
      {/* Row 1 */}
      <Box
        gridColumn={{ xs: "span 14", lg: "span 4" }}
        gridRow={{ xs: "span 3", lg: "span 4" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put RADAR CHART in Here */}
        <NivoRadarChart data={radarData} />
      </Box>
      <Box
        gridColumn={{ xs: "span 14", lg: "span 5" }}
        gridRow="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put GPA in Here */}
        <NivoBarChart data={barData} />
      </Box>
      <Box
        gridColumn={{ xs: "span 14", lg: "span 5" }}
        gridRow="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put WORKLOAD in Here */}
        <NivoBarChart data={barData} />
      </Box>
      {/* Row 2 */}
      <Box
        gridColumn={{ xs: "span 14", lg: "span 5" }}
        gridRow="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put LECTURE DIFFICULTY in Here */}
        <NivoBarChart data={barData} />
      </Box>
      <Box
        gridColumn={{ xs: "span 14", lg: "span 5" }}
        gridRow="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put EXAM DIFFICULTY in Here */}
        <NivoBarChart data={barData} />
      </Box>
      <Box
        gridColumn={{ xs: "span 14", lg: "span 4" }}
        gridRow={{ xs: "span 3", lg: "span 2" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put LECTURE QUALITY in Here */}
        <LectureQualityScore
          score={Math.round(chartData.teachingQuality[0] * 10)}
        />
        <Box sx={{ width: "280px", marginLeft: 4 }}>
          <h5 style={{ marginBottom: -1 }}>Entertainment </h5>
          <LinearPercentage
            percentage={chartData.entertaining[0]}
          ></LinearPercentage>
          <h5 style={{ marginBottom: -1 }}>Interactivity</h5>
          <LinearPercentage
            percentage={chartData.interactivity[0]}
          ></LinearPercentage>
          <h5 style={{ marginBottom: -1 }}>Delivery</h5>
          <LinearPercentage
            percentage={chartData.delivery[0]}
          ></LinearPercentage>
        </Box>
      </Box>
    </Box >
  );
};

export default Overview;
