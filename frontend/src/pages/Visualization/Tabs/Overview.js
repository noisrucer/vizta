import "@fontsource/public-sans";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import HorizontalBarChart from "../Charts/HorizontalBarChart";
import RadarChart from "../Charts/RadarChart";
import OverallScore from "../OverallScore/OverallScore";
import { useSpring, animated } from "react-spring";
import Item from "../Boxes/Item";
import LinearPercentage from "../Charts/LinearPercentage";

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n / 10,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return (
    <animated.div style={{ fontSize: "42px" }}>
      {number.to((n) => n.toFixed(1))}
    </animated.div>
  );
}

const HorizontalGrid = styled(Item)(({ theme }) => ({
  height: "260px",
  width: "455px",
}));

const BarChartGrid = styled(Box)(({ theme }) => ({
  height: "230px",
  width: "400px",
}));

const GPABarChartGrid = styled(Box)(({ theme }) => ({
  height: "230px",
  width: "385px",
}));

const Square = styled(Box)(({ theme }) => ({
  height: "360px",
  width: "360px",
}));

const TeachingQualityGrid = styled(Box)(({ theme }) => ({
  height: "120px",
  width: "120px",
}));

const TQSubGrid = styled(Box)(({ theme }) => ({
  height: "40px",
  width: "200px",
}));

const Badges = styled(Box)(({ borderColor, backgronudColor }) => ({
  height: "30px",
  width: "100px",
  backgroundColor: backgronudColor,
  color: "ff403d",
  borderRadius: 5,
  border: `2px solid ${borderColor}`,
}));

function JudgeBadgesColor(average) {
  if (average === null) {
    return ["#8F8F88", "#1D2630", "NONE"];
  } else if (average <= 1.66) {
    return ["#ff403d", "#3b353eff", "HARD"];
  } else if (average <= 3.33) {
    return ["#DFB040", "#3B3A3E", "MEDIUM"];
  } else {
    return ["#0cc1a9", "#2d3c47ff", "EASY"];
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

function StackedGPA(gpa) {
  const chartColor = ["#50B19E", "#5772B3", "#F4BA41", "#EC8B33", "#DF6E53"];
  const data = {
    labels: ["A range", "B range", "C range", "D range", "F"],
    datasets: [
      {
        label: "+ group",
        data: gpa[0],
        backgroundColor: [
          "#50B19E",
          "#5772B3",
          "#F4BA41",
          "#EC8B33",
          "#DF6E53",
        ],
      },
      {
        label: "letter group",
        data: gpa[1],
        backgroundColor: chartColor,
      },
      {
        label: "- group",
        data: gpa[2],
        backgronudColor: [
          "#50B19E",
          "#5772B3",
          "#F4BA41",
          "#EC8B33",
          "#DF6E53",
        ],
      },
    ],
  };
  return data;
}

const Overivew = (chartData) => {
  // console.log("chartData in overview: ", chartData)
  const criteriaAverage = chartData.pentagon.datasets[0].data;
  console.log("criteriAverage[1]", criteriaAverage[1]);
  console.log("ChartDtaa", chartData);
  console.log("criAvg", criteriaAverage);

  const GPAData = chartData.GPA;
  console.log("adsfasfasas", GPAData);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Stack sx={{ marginLeft: 1, marginRight: 1 }}>
        <Item sx={{ width: "380px", height: "340px", marginBottom: 3 }}>
          <Square sx={{ marginTop: -1.5 }}>
            <RadarChart chartData={chartData.pentagon} />
          </Square>
          <Box
            sx={{ position: "relative", top: -330, left: 25, display: "flex" }}
          >
            <Number n={chartData.overallScore} />
            <h1 style={{ position: "absolute", left: 24, top: 22 }}></h1>
            <h3 style={{ marginTop: 22, marginLeft: 5 }}>/ 5.0</h3>
          </Box>
        </Item>
        <Item sx={{ height: "180px", width: "380px" }}>
          <Box sx={{ marginBottom: 1 }}>
            <h3 style={{ fontSize: "19px" }}>Lecture Quality</h3>
          </Box>
          <Box sx={{ display: "flex" }}>
            <TeachingQualityGrid sx={{ marginLeft: 1 }}>
              <OverallScore
                score={Math.round(chartData.teachingQuality[0] * 10)}
              />
            </TeachingQualityGrid>
            <Box sx={{ marginLeft: 4 }}>
              <TQSubGrid>
                <h5>Entertainment </h5>
                <LinearPercentage
                  percentage={chartData.entertaining[0]}
                ></LinearPercentage>
              </TQSubGrid>
              <TQSubGrid>
                <h5>Interactivity</h5>
                <LinearPercentage
                  percentage={chartData.interactivity[0]}
                ></LinearPercentage>
              </TQSubGrid>
              <TQSubGrid>
                <h5>Delivery</h5>
                <LinearPercentage
                  percentage={chartData.delivery[0]}
                ></LinearPercentage>
              </TQSubGrid>
            </Box>
          </Box>
        </Item>
      </Stack>
      <Stack spacing={3} sx={{ marginLeft: 2 }}>
        <HorizontalGrid>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ marginLeft: "47%" }}>
              <h3 style={{ fontSize: "19px" }}>GPA </h3>
            </Box>
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
                position: "relative",
                marginLeft: "auto",
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
          </Stack>
          <GPABarChartGrid
            sx={{
              marginLeft: 4,
              marginTop: -1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HorizontalBarChart chartData={GPAData} />
          </GPABarChartGrid>
          <h6 style={{ position: "relative", top: -38, left: -170 }}>
            # students:
          </h6>
        </HorizontalGrid>
        <HorizontalGrid>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ marginLeft: "34%" }}>
              <h3 style={{ fontSize: "19px" }}> Lecture Difficulty </h3>
            </Box>
            <Badges
              borderColor={JudgeBadgesColor(criteriaAverage[2])[0]}
              backgroundColor={JudgeBadgesColor(criteriaAverage[2])[1]}
              sx={{
                position: "relative",
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: JudgeBadgesColor(criteriaAverage[2])[0] }}>
                {JudgeBadgesColor(criteriaAverage[2])[2]}
              </span>
            </Badges>
          </Stack>
          <BarChartGrid
            sx={{
              marginLeft: 2,
              marginTop: -1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HorizontalBarChart chartData={chartData.lectureDifficulty} />
          </BarChartGrid>
          <h6 style={{ position: "relative", top: -33.5, left: -160 }}>
            # students:
          </h6>
        </HorizontalGrid>
      </Stack>
      <Stack spacing={3} sx={{ marginLeft: 3 }}>
        <HorizontalGrid>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ marginLeft: "41%" }}>
              <h3 style={{ fontSize: "19px" }}> Workload </h3>
            </Box>
            <Badges
              borderColor={JudgeBadgesColor(criteriaAverage[4])[0]}
              backgroundColor={JudgeBadgesColor(criteriaAverage[4])[1]}
              sx={{
                position: "relative",
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: JudgeBadgesColor(criteriaAverage[4])[0] }}>
                {JudgeBadgesColor(criteriaAverage[4])[2]}
              </span>
            </Badges>
          </Stack>
          <BarChartGrid
            sx={{
              marginLeft: 2,
              marginTop: -1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HorizontalBarChart chartData={chartData.workload} />
          </BarChartGrid>
          <h6 style={{ position: "relative", top: -33.5, left: -166 }}>
            # students:
          </h6>
        </HorizontalGrid>
        <HorizontalGrid>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ marginLeft: "29%" }}>
              <h3 style={{ fontSize: "19px" }}> Final Exam Difficulty </h3>
            </Box>
            <Badges
              borderColor={JudgeBadgesColor(criteriaAverage[0])[0]}
              backgroundColor={JudgeBadgesColor(criteriaAverage[0])[1]}
              sx={{
                position: "relative",
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: JudgeBadgesColor(criteriaAverage[0])[0] }}>
                {JudgeBadgesColor(criteriaAverage[0])[2]}
              </span>
            </Badges>
          </Stack>
          <BarChartGrid
            sx={{
              marginLeft: 2,
              marginTop: -1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HorizontalBarChart chartData={chartData.finalDifficulty} />
          </BarChartGrid>
          <h6 style={{ position: "relative", top: -33.5, left: -159 }}>
            # students:
          </h6>
        </HorizontalGrid>
      </Stack>
    </Box>
  );
};

export default Overivew;
