import '@fontsource/public-sans';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import HorizontalBarChart from '../Charts/HorizontalBarChart';
import RadarChart from '../Charts/RadarChart';
import OverallScore from '../OverallScore/OverallScore';
import { useSpring, animated } from "react-spring";
import Item from "../Boxes/Item";
import LinearPercentage from "../Charts/LinearPercentage";

function Number({ n }) {
  const { number } = useSpring({
      from: { number: 0 },
      number: n / 10,
      delay: 200,
      config: {mass: 1, tension: 20, friction: 10},
  });
  return ( 
      <animated.div style={{ fontSize: '42px'}}>
              {number.to((n) => n.toFixed(1))}
      </animated.div>
  )
}

const HorizontalGrid = styled(Item)(({theme}) => ({
  height: "260px",
  width: "455px",
}));

const BarChartGrid = styled(Box)(({ theme }) => ({
  height: "230px",
  width: "400px"
}));

const GPABarChartGrid = styled(Box)(({ theme }) => ({
  height: "230px",
  width: "385px"
}))

const Square = styled(Box)(({theme}) => ({
  height: "360px",
  width: "360px",
}));

const TeachingQualityGrid = styled(Box)(({theme}) => ({
  height: "120px",
  width: "120px"
}));

const TQSubGrid = styled(Box)(({theme}) => ({
  height: "40px",
  width: "200px",
}));

const Badges = styled(Box)(({borderColor, backgronudColor}) => ({
  height: "30px",
  width: "100px",
  backgroundColor: backgronudColor,
  color: "ff403d",
  borderRadius: 5,
  border: `2px solid ${borderColor}`,
}))

function JudgeBadgesColor(average) {
  if(average === null) {
    return ["#8F8F88", "#1D2630", "NONE"]
  } else if(average <= 1.66){
    return ["#ff403d", "#3b353eff", "HARD"]
  } else if (average <=3.33){
    return ["#e3994e", "#3b353eff", "MEDIUM"]
  } else {
    return ["#0cc1a9", "#2d3c47ff", "EASY"]
  }
};

function JudgeGPABadgeColor(average) {
  if(average === null) {
    return ["#8F8F88", "#1D2630", "NONE"]
  } else if(average === 0){
    return ["#ff403d", "#3b353eff", "Avg: F"]
  } else if(average <= 1){
    return ["#ff403d", "#3b353eff", "Avg: D"]
  } else if (average <=1.3){
    return ["#ff403d", "#3b353eff", "Avg: D+"]
  } else if (average <=1.7){
    return ["#ff403d", "#3b353eff", "Avg: C-"]
  } else if (average <= 2){
    return ["#ff403d", "#3b353eff", "Avg: C"]
  } else if (average <= 2.3){
    return ["#ff403d", "#3b353eff", "Avg: C+"]
  } else if (average <= 2.7){
    return ["#e3994e", "#3b353eff", "Avg: B-"]
  } else if (average <= 3){
    return ["#e3994e", "#3b353eff", "Avg: B"]
  } else if (average <= 3.3){
    return ["#e3994e", "#3b353eff", "Avg: B+"]
  } else if (average <= 3.7){
    return ["#0cc1a9", "#2d3c47ff", "Avg: A-"]
  } else if (average <= 4.0){
    return ["#0cc1a9", "#2d3c47ff", "Avg: A-"]
  } else {
    return ["#0cc1a9", "#2d3c47ff", "Avg: A+"]
  }
};

function StackedGPA(gpa) {
  const chartColor = ["#50B19E", "#5772B3", "#F4BA41", "#EC8B33", "#DF6E53"]
  const data = {
    labels: ["A range", "B range", "C range", "D range", "F"],
    datasets: [
      {
        label: "+ group",
        data: gpa[0],
        backgroundColor: ["#50B19E", "#5772B3", "#F4BA41", "#EC8B33", "#DF6E53"]
      },
      {
        label: "letter group",
        data: gpa[1],
        backgroundColor: chartColor
      },
      {
        label: "- group",
        data: gpa[2],
        backgronudColor: ["#50B19E", "#5772B3", "#F4BA41", "#EC8B33", "#DF6E53"]
      }
    ]
  }
  return data;
};

const Overivew = (chartData) => {

  // console.log("chartData in overview: ", chartData)
  const criteriaAverage = chartData.pentagon.datasets[0].data

  const GPAData = StackedGPA(chartData.GPA.datasets[0].data)

  return (
    <Box sx={{display: "flex", flexDirection: "row"}} >
      <Stack sx={{marginLeft: 1, marginRight: 1}}>
        <Item sx={{width: "380px", height: "340px", marginBottom: 3}}>
          <Square sx={{marginTop: -1.5}}>
            <RadarChart chartData={chartData.pentagon}/>
          </Square>
          <Box sx={{ position: "absolute", left:80, top: 200, display:"flex"}}>
            <Number n={chartData.overallScore} />
            <h1 style={{position: "absolute", left: 24, top: 22}}></h1>
            <h3 style={{marginTop: 22, marginLeft: 5}}>/ 5.0</h3>
          </Box>
        </Item>
        <Item sx={{height: "180px", width: "380px"}}>
          <Box sx={{marginBottom: 1}}>
            <h3 style={{fontSize: "19px"}}>Lecture Quality</h3>
          </Box>
          <Box sx={{display: "flex"}}>
            <TeachingQualityGrid sx={{marginLeft:1}}>
              <OverallScore score={Math.round(chartData.teachingQuality[0] * 10)} />
            </TeachingQualityGrid>
            <Box sx={{marginLeft: 4}}>
              <TQSubGrid>
                <h5>Entertainment </h5>
                <LinearPercentage percentage={chartData.entertaining[0]}></LinearPercentage>
              </TQSubGrid>
              <TQSubGrid>
                <h5>Interactivity</h5>
                <LinearPercentage percentage={chartData.interactivity[0]}></LinearPercentage>
              </TQSubGrid>
              <TQSubGrid>
                <h5>Delivery</h5>
                <LinearPercentage percentage={chartData.delivery[0]}></LinearPercentage>
              </TQSubGrid>
            </Box>
          </Box>
        </Item>
      </Stack>
      <Stack spacing={3} sx={{marginLeft: 2, merginRight: 1}}>
        <HorizontalGrid >
          <Stack sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{marginLeft: "47%"}}>
              <h3 style={{fontSize: "19px"}}>GPA </h3>
            </Box>
            <Badges borderColor={JudgeGPABadgeColor(criteriaAverage[1])[0]} backgroundColor={JudgeGPABadgeColor(criteriaAverage[1])[1]} sx={{position: "relative", marginLeft: 'auto', display: "flex", alignItems: "center", justifyContent: "center"}}>
              <span style={{color: JudgeGPABadgeColor(criteriaAverage[1])[0]}}>{JudgeGPABadgeColor(criteriaAverage[1])[2]}</span>
            </Badges>
          </Stack>
          <GPABarChartGrid sx={{ marginLeft: 4, marginTop: -1, display: "flex", alignItems: "center", justifyContent: "center"}}>
            <HorizontalBarChart chartData={GPAData} />
          </GPABarChartGrid>
        </HorizontalGrid>
        <HorizontalGrid>
          <Stack sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{marginLeft: "34%"}}>
              <h3 style={{fontSize: "19px"}}> Lecture Difficulty </h3>
            </Box>
            <Badges borderColor={JudgeBadgesColor(criteriaAverage[2])[0]} backgroundColor={JudgeBadgesColor(criteriaAverage[2])[1]} sx={{position: "relative", marginLeft: 'auto', display: "flex", alignItems: "center", justifyContent: "center"}}>
              <span style={{color: JudgeBadgesColor(criteriaAverage[2])[0]}}>{JudgeBadgesColor(criteriaAverage[2])[2]}</span>
            </Badges>
          </Stack>
          <BarChartGrid sx={{ marginLeft: 2, marginTop: -1, display: "flex", alignItems: "center", justifyContent: "center"}}>
            <HorizontalBarChart chartData={chartData.lectureDifficulty} />
          </BarChartGrid>
        </HorizontalGrid>
      </Stack>
      <Stack spacing={3} sx={{marginLeft: 3}}>
        <HorizontalGrid>
          <Stack sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{marginLeft: "41%"}}>
              <h3 style={{fontSize: "19px"}}> Workload </h3>
            </Box>
            <Badges borderColor={JudgeBadgesColor(criteriaAverage[4])[0]} backgroundColor={JudgeBadgesColor(criteriaAverage[4])[1]} sx={{position: "relative", marginLeft: 'auto', display: "flex", alignItems: "center", justifyContent: "center"}}>
              <span style={{color: JudgeBadgesColor(criteriaAverage[4])[0]}}>{JudgeBadgesColor(criteriaAverage[4])[2]}</span>
            </Badges>
          </Stack>
          <BarChartGrid sx={{ marginLeft: 2, marginTop: -1, display: "flex", alignItems: "center", justifyContent: "center"}}>
            <HorizontalBarChart chartData={chartData.workload} />
          </BarChartGrid>
        </HorizontalGrid>
        <HorizontalGrid>
          <Stack sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{marginLeft: "29%"}}>
              <h3 style={{fontSize: "19px"}}> Final Exam Difficulty </h3>
            </Box>
            <Badges borderColor={JudgeBadgesColor(criteriaAverage[0])[0]} backgroundColor={JudgeBadgesColor(criteriaAverage[0])[1]} sx={{position: "relative", marginLeft: 'auto', display: "flex", alignItems: "center", justifyContent: "center"}}>
              <span style={{color: JudgeBadgesColor(criteriaAverage[0])[0]}}>{JudgeBadgesColor(criteriaAverage[0])[2]}</span>
            </Badges>
          </Stack>
          <BarChartGrid sx={{ marginLeft: 2, marginTop: -1, display: "flex", alignItems: "center", justifyContent: "center"}}>
            <HorizontalBarChart chartData={chartData.finalDifficulty} />
          </BarChartGrid>
        </HorizontalGrid>
      </Stack>
      <h6 style={{position: "absolute", top: 405.3, left: 480, color: "lightgrey"}}># Students:</h6>
      <h6 style={{position: "absolute", top: 410, left: 961, color: "lightgrey"}}># Students:</h6>
      <h6 style={{position: "absolute", top: 694, left: 490, color: "lightgrey"}}># Students:</h6>
      <h6 style={{position: "absolute", top: 694, left: 970, color: "lightgrey"}}># Students:</h6>
    </Box>
  )
}

export default Overivew