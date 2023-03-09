import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import { styled } from "@mui/material/styles";
import NivoBarChart from "../Charts/NivoBarChart";
import NivoRadarChart from "../Charts/NivoRadarChart";
import barData from "./NivoData/BarData";
import radarData from "./NivoData/RadarData";
import LinearPercentage from "../Charts/ProgessiveBar/LinearPercentage";
import LectureQualityScore from "../Charts/ProgessiveBar/LectureQuailtyScore";

const Badges = styled(Box)(({ borderColor, backgronudColor }) => ({
  height: "30px",
  width: "100px",
  backgroundColor: backgronudColor,
  color: "ff403d",
  borderRadius: 5,
  border: `2px solid ${borderColor}`,
}));

const Overview = (chartData) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log("colors: ", colors)
  console.log("chartData: ", chartData)

  function JudgeBadgesColor(average) {
    if (average === null) {
      return ["#8F8F88", "secondary", "NONE"];
    } else if (average <= 1.66) {
      return ["#ff403d", "secondary", "HARD"];
    } else if (average <= 3.33) {
      return ["#DFB040", "secondary", "MEDIUM"];
    } else {
      return ["#0cc1a9", "secondary", "EASY"];
    }
  }

  function JudgeGPABadgeColor(average) {
    if (average === null) {
      return ["#8F8F88", "#1D2630", "NONE"];
    } else if (average === 0) {
      return ["#ff403d", "#3b353eff", "Avg: F"];
    } else if (average <= 1.1627906976744187) {
      return ["#ff403d", "#3b353eff", "Avg: D"];
    } else if (average <= 1.5116279069767442) {
      return ["#ff403d", "#3b353eff", "Avg: D+"];
    } else if (average <= 1.9767441860465118) {
      return ["#ff403d", "#3b353eff", "Avg: C-"];
    } else if (average <= 2.3255813953488373) {
      return ["#ff403d", "#3b353eff", "Avg: C"];
    } else if (average <= 2.674418604651163) {
      return ["#ff403d", "#3b353eff", "Avg: C+"];
    } else if (average <= 3.1395348837209305) {
      return ["#DFB040", "#3B3A3E", "Avg: B-"];
    } else if (average <= 3.488372093023256) {
      return ["#DFB040", "#3B3A3E", "Avg: B"];
    } else if (average <= 3.8372093023255816) {
      return ["#DFB040", "#3B3A3E", "Avg: B+"];
    } else if (average <= 4.302325581395349) {
      return ["#0cc1a9", "#2d3c47ff", "Avg: A-"];
    } else if (average <= 4.651162790697675) {
      return ["#0cc1a9", "#2d3c47ff", "Avg: A"];
    } else {
      return ["#0cc1a9", "#2d3c47ff", "Avg: A+"];
    }
  }

  const criteriaAverage = chartData.pentagon.datasets[0].data;
  console.log("criteriaAverage: ", criteriaAverage);

  const GPAHeadings = () => {

    return (
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
      }}>
        <Box sx={{ width: "100px", height: "30px" }}></Box>
        <h3 style={{ fontSize: "19px" }}>GPA </h3>
        <Badges
          borderColor={
            criteriaAverage[1]
              ? JudgeGPABadgeColor(criteriaAverage[1])[0]
              : "#8F8F88"
          }
          backgroundColor={
            criteriaAverage[1]
              ? JudgeGPABadgeColor(criteriaAverage[1])[1]
              : "#1D2630"
          }
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: criteriaAverage[1]
                ? JudgeGPABadgeColor(criteriaAverage[1])[0]
                : "#8F8F88",
            }}
          >
            {criteriaAverage[1]
              ? JudgeGPABadgeColor(criteriaAverage[1])[2]
              : "NONE"}
          </span>
        </Badges>
      </Box>
    )
  }

  const Headings = ({ name, index }) => {
    return (
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
      }}>
        <Box sx={{ width: "100px", height: "30px" }}></Box>
        <h3 style={{ fontSize: "19px" }}> {name} </h3>
        <Badges
          borderColor={JudgeBadgesColor(criteriaAverage[{ index }])[0]}
          backgroundColor={JudgeBadgesColor(criteriaAverage[{ index }])[1]}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: JudgeBadgesColor(criteriaAverage[{ index }])[0] }}>
            {JudgeBadgesColor(criteriaAverage[{ index }])[2]}
          </span>
        </Badges>
      </Box>
    )
  }

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
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put RADAR CHART in Here */}
        <h2>Overall</h2>
        <NivoRadarChart data={radarData} />
      </Box>
      <Box
        gridColumn={{ xs: "span 14", lg: "span 5" }}
        gridRow="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put GPA in Here */}
        <GPAHeadings />
        <NivoBarChart data={barData} />
      </Box>
      <Box
        gridColumn={{ xs: "span 14", lg: "span 5" }}
        gridRow="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put WORKLOAD in Here */}
        <Headings name="Workload" index={4} />
        <NivoBarChart data={barData} />
      </Box>
      {/* Row 2 */}
      <Box
        gridColumn={{ xs: "span 14", lg: "span 5" }}
        gridRow="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put LECTURE DIFFICULTY in Here */}
        <Headings name="Lecture Difficulty" index={2} />
        <NivoBarChart data={barData} />
      </Box>
      <Box
        gridColumn={{ xs: "span 14", lg: "span 5" }}
        gridRow="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put EXAM DIFFICULTY in Here */}
        <Headings name="Final Exam Difficulty" index={0} />
        <NivoBarChart data={barData} />
      </Box>
      <Box
        gridColumn={{ xs: "span 14", lg: "span 4" }}
        gridRow={{ xs: "span 3", lg: "span 2" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put LECTURE QUALITY in Here */}
        <h2>Lecture Quality</h2>
        <Box sx={{ display: "flex" }}>
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
      </Box>
    </Box >
  );
};

export default Overview;
