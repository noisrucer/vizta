import { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import { styled } from "@mui/material/styles";
import NivoBarChart from "../Charts/NivoBarChart";
import NivoRadarChart from "../Charts/NivoRadarChart";
import LinearPercentage from "../Charts/ProgessiveBar/LinearPercentage";
import LectureQualityScore from "../Charts/ProgessiveBar/LectureQuailtyScore";
import { Heading24 } from "../../../components/GlobalStyledComponents";
import { useSpring, animated } from "react-spring";

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n / 5,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return (
    <animated.div style={{ fontSize: "42px", marginRight: "10px" }}>
      {number.to((n) => n.toFixed(1))}
    </animated.div>
  );
}

const workloadLabel = ["VeryLight", "Light", "Medium", "Heavy", "VeryHeavy"];
const lectureFinalLabel = [
  "VeryEasy",
  "Easy",
  "Medium",
  "Difficult",
  "VeryDifficult",
];
const GPALabel = ["A+", "A", "A-", "B+", "B-", "C+", "C", "C-", "D+", "D", "F"];
const overallLabel = ["overall"];

const Badges = styled(Box)(({ borderColor, backgronudColor }) => ({
  height: "30px",
  width: "80px",
  backgroundColor: backgronudColor,
  color: "ff403d",
  borderRadius: 5,
  border: `2px solid ${borderColor}`,
}));

const Overview = (chartData) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const overviewData = chartData.data;
  const overallScore = chartData.score;

  function JudgeBadgesColor(average) {
    if (average === null) {
      return ["#8F8F88", "secondary", "NONE"];
    } else if (average === "HARD") {
      return ["#ff403d", "#3b353eff", "HARD"];
    } else if (average === "MEDIUM") {
      return ["#DFB040", "#3B3A3E", "MEDIUM"];
    } else {
      return ["#0cc1a9", "#2d3c47ff", "EASY"];
    }
  }

  function JudgeGPABadgeColor(average) {
    if (average === null) {
      return ["#8F8F88", "secondary", "NONE"];
    } else if (average === "Avg: F") {
      return ["#ff403d", "#3b353eff", "Avg: F"];
    } else if (average === "Avg: D") {
      return ["#ff403d", "#3b353eff", "Avg: D"];
    } else if (average === "Avg: D+") {
      return ["#ff403d", "#3b353eff", "Avg: D+"];
    } else if (average === "Avg: C-") {
      return ["#ff403d", "#3b353eff", "Avg: C-"];
    } else if (average === "Avg: C") {
      return ["#ff403d", "#3b353eff", "Avg: C"];
    } else if (average === "Avg: C+") {
      return ["#ff403d", "#3b353eff", "Avg: C+"];
    } else if (average === "Avg: B-") {
      return ["#DFB040", "#3B3A3E", "Avg: B-"];
    } else if (average === "Avg: B") {
      return ["#DFB040", "#3B3A3E", "Avg: B"];
    } else if (average === "Avg: B+") {
      return ["#DFB040", "#3B3A3E", "Avg: B+"];
    } else if (average === "Avg: A-") {
      return ["#0cc1a9", "#2d3c47ff", "Avg: A-"];
    } else if (average === "Avg: A") {
      return ["#0cc1a9", "#2d3c47ff", "Avg: A"];
    } else {
      return ["#0cc1a9", "#2d3c47ff", "Avg: A+"];
    }
  }

  const GPAHeadings = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ width: "80px", height: "30px" }}></Box>
        <Heading24>GPA </Heading24>
        <Badges
          borderColor={
            overviewData.Badges.GPA
              ? JudgeGPABadgeColor(overviewData.Badges.GPA)[0]
              : "#8F8F88"
          }
          backgroundColor={
            overviewData.Badges.GPA
              ? JudgeGPABadgeColor(overviewData.Badges.GPA)[1]
              : "#1D2630"
          }
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h5
            style={{
              color: overviewData.Badges.GPA
                ? JudgeGPABadgeColor(overviewData.Badges.GPA)[0]
                : "#8F8F88",
            }}
          >
            {overviewData.Badges.GPA
              ? JudgeGPABadgeColor(overviewData.Badges.GPA)[2]
              : "NONE"}
          </h5>
        </Badges>
      </Box>
    );
  };

  const Headings = ({ name, badgeName }) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ width: "80px", height: "30px" }}></Box>
        <Heading24> {name} </Heading24>
        <Badges
          borderColor={JudgeBadgesColor(badgeName)[0]}
          backgroundColor={JudgeBadgesColor(badgeName)[1]}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h5 style={{ color: JudgeBadgesColor(badgeName)[0] }}>
            {JudgeBadgesColor(badgeName)[2]}
          </h5>
        </Badges>
      </Box>
    );
  };

  return (
    //Grid & Charts
    <Box
      display="grid"
      gridTemplateColumns="repeat(14,1fr)"
      gridAutoRows={{ xs: "100px", lg: "100px", xl: "130px" }}
      gap="20px"
      marginTop={4}
      height="73vh"
    >
      {/* Row 1 */}
      <Box
        gridColumn={{ xs: "span 14", lg: "span 4" }}
        gridRow={{ xs: "span 3", lg: "span 4" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius="2%"
        height={{ xs: "100%", md: "100%", lg: "70%", xl: "77%" }}
      >
        {/*Put RADAR CHART in Here */}

        <Heading24 style={{ marginTop: "13px" }}>Overall Score</Heading24>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Number n={overallScore} />
          <h3> / 5.0</h3>
        </Box>
        <Box
          sx={{
            width: { xs: "350px", sm: "340px", lg: "340px", xl: "400px" },
            height: { xs: "300px", sm: "300px", md: "300px", lg: "300px", xl: "400px" },
            zIndex: "100",
            marginTop: -4
          }}
        >
          <NivoRadarChart data={overviewData.Pentagon} keys={overallLabel} />
        </Box>
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
        padding={3}
        height={{ xs: "100%", md: "100%", lg: "80%", xl: "85%" }}
      >
        {/*Put GPA in Here */}
        <GPAHeadings />
        <NivoBarChart data={overviewData.GPA} keys={GPALabel} />
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
        padding={3}
        height={{ xs: "100%", md: "100%", lg: "80%", xl: "85%" }}
      >
        {/*Put WORKLOAD in Here */}
        <Headings name="Workload" badgeName={overviewData.Badges.Workload} />
        <NivoBarChart data={overviewData.Workload} keys={workloadLabel} />
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
        padding={3}
        height={{ xs: "100%", md: "100%", lg: "80%", xl: "85%" }}
        sx={{
          marginTop: { lg: -8 }
        }}
      >
        {/*Put LECTURE DIFFICULTY in Here */}
        <Headings
          name="Lecture Difficulty"
          badgeName={overviewData.Badges.LectureDifficulty}
        />
        <NivoBarChart
          data={overviewData.LectureDifficulty}
          keys={lectureFinalLabel}
        />
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
        padding={3}
        height={{ xs: "100%", md: "100%", lg: "80%", xl: "85%" }}
        sx={{
          marginTop: { lg: -8 }
        }}
      >
        {/*Put EXAM DIFFICULTY in Here */}
        <Headings
          name="Final Exam Difficulty"
          badgeName={overviewData.Badges.FinalDifficulty}
        />
        <NivoBarChart
          data={overviewData.FinalDifficulty}
          keys={lectureFinalLabel}
        />
      </Box>
      <Box
        gridColumn={{ xs: "span 14", lg: "span 4" }}
        gridRow={{ xs: "span 2", lg: "span 2" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius="2%"
        height="100%"
        sx={{
          marginTop: { lg: -16.5, xl: -16 }
        }}
      >
        {/*Put LECTURE QUALITY in Here */}
        <Heading24 style={{ marginTop: "9px" }}>Lecture Quality</Heading24>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <Box
            sx={{
              width: { xs: "30%", sm: "35%", lg: "38%" },
            }}
          >
            <LectureQualityScore
              score={Math.round(
                (overviewData.LectureQuality.Entertainment +
                  overviewData.LectureQuality.Interactivity +
                  overviewData.LectureQuality.Delivery) /
                3
              )}
            />
          </Box>

          <Box
            sx={{
              width: { xs: "30%", md: "50%" },
              marginLeft: 4,
              marginBottom: "20px",
            }}
          >
            <h5 style={{ marginBottom: -1 }}>Entertainment </h5>
            <LinearPercentage
              percentage={overviewData.LectureQuality.Entertainment}
            ></LinearPercentage>
            <h5 style={{ marginBottom: -1 }}>Interactivity</h5>
            <LinearPercentage
              percentage={overviewData.LectureQuality.Interactivity}
            ></LinearPercentage>
            <h5 style={{ marginBottom: -1 }}>Delivery</h5>
            <LinearPercentage
              percentage={overviewData.LectureQuality.Delivery}
            ></LinearPercentage>
          </Box>
        </Box>
      </Box>
    </Box >
  );
};

export default Overview;
