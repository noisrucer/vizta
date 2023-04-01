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

const workloadLabel = ["VeryLight", "Light", "Medium", "Heavy", "VeryHeavy"]
const lectureFinalLabel = ["VeryEasy", "Easy", "Medium", "Difficult", "VeryDifficult"]
const GPALabel = ["A+", "A", "A-", "B+", "B-", "C+", "C", "C-", "D+", "D", "F"]
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
  const pentagonData = overviewData.Pentagon;
  const formattedPentData = [];
  const GPAData = overviewData.GPA
  const formattedGPAData = GPAData.slice().reverse()
  console.log("GPA: ", GPAData);
  console.log("formatted: ", formattedGPAData);

  pentagonData.map((value) => {
    if (value.criteria === "LectureDifficulty") {
      formattedPentData.push({ criteria: "Lecture Difficulty", overall: value.overall })
    }
  })

  pentagonData.map((value) => {
    if (value.criteria === "GPA") {
      formattedPentData.push({ criteria: "GPA", overall: value.overall })
    }
  })

  pentagonData.map((value) => {
    if (value.criteria === "FinalDifficulty") {
      formattedPentData.push({ criteria: "Final Difficulty", overall: value.overall })
    }
  })

  pentagonData.map((value) => {
    if (value.criteria === "LectureQuality") {
      formattedPentData.push({ criteria: "Lecture Quality", overall: value.overall })
    }
  })

  pentagonData.map((value) => {
    if (value.criteria === "Workload") {
      formattedPentData.push({ criteria: "Workload", overall: value.overall })
    }
  })

  const overallScore = chartData.score;

  function judgeBadgesColor(average) {
    if (average === null) {
      return ["#8F8F88", "secondary", "NONE"];
    } else if (average === "HARD") {
      return ["#ff403d", colors.badgeBackground[100], "HARD"];
    } else if (average === "MEDIUM") {
      return ["#DFB040", colors.badgeBackground[200], "MEDIUM"];
    } else if (average === "EASY") {
      return ["#0cc1a9", colors.badgeBackground[300], "EASY"];
    } else {
      return ["#8F8F88", "secondary", "NONE"];
    }
  }

  function judgeGPABadgeColor(average) {
    if (average === "NONE") {
      return ["#8F8F88", "secondary", "NONE"];
    } else if (average === "Avg: F") {
      return ["#ff403d", colors.badgeBackground[100], "Avg: F"];
    } else if (average === "Avg: D") {
      return ["#ff403d", colors.badgeBackground[100], "Avg: D"];
    } else if (average === "Avg: D+") {
      return ["#ff403d", colors.badgeBackground[100], "Avg: D+"];
    } else if (average === "Avg: C-") {
      return ["#ff403d", colors.badgeBackground[100], "Avg: C-"];
    } else if (average === "Avg: C") {
      return ["#ff403d", colors.badgeBackground[100], "Avg: C"];
    } else if (average === "Avg: C+") {
      return ["#ff403d", colors.badgeBackground[100], "Avg: C+"];
    } else if (average === "Avg: B-") {
      return ["#DFB040", colors.badgeBackground[200], "Avg: B-"];
    } else if (average === "Avg: B") {
      return ["#DFB040", colors.badgeBackground[200], "Avg: B"];
    } else if (average === "Avg: B+") {
      return ["#DFB040", colors.badgeBackground[200], "Avg: B+"];
    } else if (average === "Avg: A-") {
      return ["#0cc1a9", colors.badgeBackground[300], "Avg: A-"];
    } else if (average === "Avg: A") {
      return ["#0cc1a9", colors.badgeBackground[300], "Avg: A"];
    } else if (average === "Avg: A+") {
      return ["#0cc1a9", colors.badgeBackground[300], "Avg: A+"];
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
              ? judgeGPABadgeColor(overviewData.Badges.GPA)[0]
              : "#8F8F88"
          }
          backgroundColor={
            overviewData.Badges.GPA
              ? judgeGPABadgeColor(overviewData.Badges.GPA)[1]
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
                ? judgeGPABadgeColor(overviewData.Badges.GPA)[0]
                : "#8F8F88",
            }}
          >
            {overviewData.Badges.GPA
              ? judgeGPABadgeColor(overviewData.Badges.GPA)[2]
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
          borderColor={judgeBadgesColor(badgeName)[0]}
          backgroundColor={judgeBadgesColor(badgeName)[1]}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h5 style={{ color: judgeBadgesColor(badgeName)[0] }}>
            {judgeBadgesColor(badgeName)[2]}
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
      gridAutoRows={{ xs: "100px", lg: "1fr" }}
      gap="20px"
      marginTop={2}
      height="71.5vh"
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
      // height={{ xs: "100%", md: "100%", lg: "70%", xl: "77%" }}
      >
        {/*Put RADAR CHART in Here */}

        <Heading24 style={{ marginTop: "13px" }}>Overall Score</Heading24>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Number n={overallScore} />
          <h3> / 5.0</h3>
        </Box>
        <Box
          sx={{
            width: { xs: "350px", sm: "340px", lg: "340px", xl: "300px" },
            height: {
              xs: "300px",
              sm: "300px",
              md: "300px",
              lg: "300px",
              xl: "300px",
            },
            zIndex: "100",
            //marginTop: -4,
          }}
        >
          <NivoRadarChart data={formattedPentData} keys={overallLabel} />
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
      // height={{ xs: "100%", md: "100%", lg: "80%", xl: "85%" }}
      >
        {/*Put GPA in Here */}
        <GPAHeadings />
        <NivoBarChart data={overviewData.GPA.slice().reverse()} keys={GPALabel} />
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
      // height={{ xs: "100%", md: "100%", lg: "80%", xl: "85%" }}
      >
        {/*Put WORKLOAD in Here */}
        <Headings name="Workload" badgeName={overviewData.Badges.Workload} />
        <NivoBarChart data={overviewData.Workload.slice().reverse()} keys={workloadLabel} />
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
      // height={{ xs: "100%", md: "100%", lg: "80%", xl: "85%" }}
      // sx={{
      //   marginTop: { lg: -8 },
      // }}
      >
        {/*Put LECTURE DIFFICULTY in Here */}
        <Headings
          name="Lecture Difficulty"
          badgeName={overviewData.Badges.LectureDifficulty}
        />
        <NivoBarChart
          data={overviewData.LectureDifficulty.slice().reverse()}
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
      // height={{ xs: "100%", md: "100%", lg: "80%", xl: "85%" }}
      // sx={{
      //   marginTop: { lg: -8 },
      // }}
      >
        {/*Put EXAM DIFFICULTY in Here */}
        <Headings
          name="Final Exam Difficulty"
          badgeName={overviewData.Badges.FinalDifficulty}
        />
        <NivoBarChart
          data={overviewData.FinalDifficulty.slice().reverse()}
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
      >
        {/*Put LECTURE QUALITY in Here */}
        <Heading24 style={{ marginTop: "9px", marginBottom: "-10px" }}>
          Lecture Quality
        </Heading24>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "10px",
            paddingRight: "10px",
            marginBottom: "50px",
          }}
        >
          <Box
            sx={{
              width: { xs: "30%", sm: "35%", lg: "30%" },
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
              // height: { xs: "30%", md: "20%" },
              marginLeft: 4,
              marginBottom: "50px",
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
