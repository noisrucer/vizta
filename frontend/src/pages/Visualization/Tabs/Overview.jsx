import { useState } from 'react';
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
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return (
    <animated.div style={{ fontSize: "42px" }}>
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
  width: "100px",
  backgroundColor: backgronudColor,
  color: "ff403d",
  borderRadius: 5,
  border: `2px solid ${borderColor}`,
}));

const Overview = (chartData) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log("colors: ", colors);
  console.log("chartData in overview: ", chartData);

  const overviewData = chartData.data;
  const [overallScore, setoverallScore] = useState(5.0)

  // setoverallScore((overviewData.Pentagon[0].overall + overviewData.Pentagon[1].overall + overviewData.Pentagon[2].overall + overviewData.Pentagon[3].overall + overviewData.Pentagon[4].overall) / 5)

  function JudgeBadgesColor(average) {
    if (average === null) {
      return ["#8F8F88", "secondary", "NONE"];
    } else if (average === "HARD") {
      return ["#ff403d", "secondary", "HARD"];
    } else if (average === "MEDIUM") {
      return ["#DFB040", "secondary", "MEDIUM"];
    } else {
      return ["#0cc1a9", "secondary", "EASY"];
    }
  }

  function JudgeGPABadgeColor(average) {
    if (average === null) {
      return ["#8F8F88", "secondary", "NONE"];
    } else if (average === "Avg: F") {
      return ["#ff403d", "secondary", "Avg: F"];
    } else if (average === "Avg: D") {
      return ["#ff403d", "secondary", "Avg: D"];
    } else if (average === "Avg: D+") {
      return ["#ff403d", "secondary", "Avg: D+"];
    } else if (average === "Avg: C-") {
      return ["#ff403d", "secondary", "Avg: C-"];
    } else if (average === "Avg: C") {
      return ["#ff403d", "secondary", "Avg: C"];
    } else if (average === "Avg: C+") {
      return ["#ff403d", "secondary", "Avg: C+"];
    } else if (average === "Avg: B-") {
      return ["#DFB040", "secondary", "Avg: B-"];
    } else if (average === "Avg: B") {
      return ["#DFB040", "secondary", "Avg: B"];
    } else if (average === "Avg: B+") {
      return ["#DFB040", "secondary", "Avg: B+"];
    } else if (average === "Avg: A-") {
      return ["#0cc1a9", "secondary", "Avg: A-"];
    } else if (average === "Avg: A") {
      return ["#0cc1a9", "secondary", "Avg: A"];
    } else {
      return ["#0cc1a9", "secondary", "Avg: A+"];
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
        <Box sx={{ width: "100px", height: "30px" }}></Box>
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
          <Heading24
            style={{
              color: overviewData.Badges.GPA
                ? JudgeGPABadgeColor(overviewData.Badges.GPA)[0]
                : "#8F8F88",
            }}
          >
            {overviewData.Badges.GPA
              ? JudgeGPABadgeColor(overviewData.Badges.GPA)[2]
              : "NONE"}
          </Heading24>
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
        <Box sx={{ width: "100px", height: "30px" }}></Box>
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
          <Heading24 style={{ color: JudgeBadgesColor(badgeName)[0] }}>
            {JudgeBadgesColor(badgeName)[2]}
          </Heading24>
        </Badges>
      </Box>
    );
  };

  return (
    //Grid & Charts
    <Box
      display="grid"
      gridTemplateColumns="repeat(14,1fr)"
      gridAutoRows={{ xs: "100px", lg: "100px" }}
      gap="20px"
      marginTop={4}
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
        padding={3}
        height="100%"
      >
        {/*Put RADAR CHART in Here */}
        <Heading24>
          Overall Score:
        </Heading24>
        <Box sx={{ display: "flex" }}>
          <Number n={overallScore} />
          <h6> / 5.0</h6>
        </Box>
        <NivoRadarChart data={overviewData.Pentagon} keys={overallLabel} />
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
        height="100%"
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
        height="100%"
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
        height="100%"
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
        height="100%"
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
        gridRow={{ xs: "span 3", lg: "span 2" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius="2%"
        height="100%"
      >
        {/*Put LECTURE QUALITY in Here */}
        <Heading24 style={{ marginTop: "9px" }}>Lecture Quality</Heading24>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: { xs: "200px", md: "100px", lg: "100px", xl: "150px" },
            marginBottom: "50px",
            marginTop: "25px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <Box
            sx={{
              width: { xs: "30%", md: "40%" },
              marginBottom: "20px",
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
    </Box>
  );
};

export default Overview;
