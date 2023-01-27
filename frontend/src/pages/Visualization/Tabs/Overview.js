import '@fontsource/public-sans';
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../../UserContext';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/Textfield';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import BarChart from "../Charts/BarChart"
import DoughnutChart from '../Charts/DoughnutChart';
import HorizontalBarChart from '../Charts/HorizontalBarChart';
import RadarChart from '../Charts/RadarChart';
import OverallScore from '../OverallScore/OverallScore';
import AppBar from '@mui/material/AppBar';
import { useSpring, animated } from "react-spring";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Item from "../Boxes/Item";
import LinearPercentage from "../Charts/LinearPercentage";

function Number({ n }) {
  const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: {mass: 1, tension: 20, friction: 10},
  });
  return ( 
      <animated.div style={{ fontSize: '48px'}}>
              {number.to((n) => n.toFixed(0))}
      </animated.div>
  )
}

const HorizontalGrid = styled(Item)(({theme}) => ({
  height: "288px",
  width: "455px",
}));

const Square = styled(Box)(({theme}) => ({
  height: "300px",
  width: "300px",
}));

const TeachingQualityGrid = styled(Item)(({theme}) => ({
  height: "150px",
  width: "150px"
}));

const TQSubGrid = styled(Item)(({theme}) => ({
  height: "50px",
  width: "230px",
}));

const BadgeColorsList = {
  easy: {
    border: "#0cc1a9",
    text: "#0cc1a9",
    bacground: "#2d3c47ff"
  },
  medium: {
    border: "#e3994e",
    text: "#e3994e",
    background: "#3b353eff"
  },
  hard: {
    border: "#ff403d",
    text: "#ff403d",
    background: "#3b353eff"
  }
}

const Badges = styled(Box)(({borderColor, backgronudColor}) => ({
  height: "30px",
  width: "100px",
  backgroundColor: backgronudColor,
  color: "ff403d",
  borderRadius: 5,
  border: `2px solid ${borderColor}`,
}))

function JudgeBadgesColor(average) {
  if(average <= 1.66){
    return ["#ff403d", "#3b353eff", "HARD"]
  } else if (average <=3.33){
    return ["#e3994e", "#3b353eff", "MEDIUM"]
  } else {
    return ["#0cc1a9", "#2d3c47ff", "EASY"]
  }
};

function JudgeGPABadgeColor(average) {
  if(average === 0){
    return ["#ff403d", "#3b353eff", "AVg: F"]
  } else if(average <= 1){
    return ["#ff403d", "#3b353eff", "AVg: D"]
  } else if (average <=1.3){
    return ["#ff403d", "#3b353eff", "AVg: D+"]
  } else if (average <=1.7){
    return ["#ff403d", "#3b353eff", "AVg: C-"]
  } else if (average <= 2){
    return ["#ff403d", "#3b353eff", "AVg: C"]
  } else if (average <= 2.3){
    return ["#ff403d", "#3b353eff", "AVg: C+"]
  } else if (average <= 2.7){
    return ["#e3994e", "#3b353eff", "AVg: B-"]
  } else if (average <= 3){
    return ["#e3994e", "#3b353eff", "AVg: B"]
  } else if (average <= 3.3){
    return ["#e3994e", "#3b353eff", "AVg: B+"]
  } else if (average <= 3.7){
    return ["#0cc1a9", "#2d3c47ff", "AVg: A-"]
  } else if (average <= 4.0){
    return ["#0cc1a9", "#2d3c47ff", "AVg: A-"]
  } else {
    return ["#0cc1a9", "#2d3c47ff", "AVg: A+"]
  }
};

function StackedGPA(gpa) {
  const chartColor = ["#50B19E", "#5772B3", "#F4BA41", "#EC8B33", "#DF6E53"]
  const data = {
    labels: ["A group", "B group", "C group", "D group", "F"],
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

  console.log("chartData in overview: ", chartData)
  const criteriaAverage = chartData.pentagon.datasets[0].data
  console.log("pentagon in overview: ", chartData.pentagon.datasets[0].data)

  const GPAData = StackedGPA(chartData.GPA.datasets[0].data)
  console.log("GPASets: ", GPAData);

  return (
    <Box sx={{display: "flex", flexDirection: "row"}} >
      <Stack sx={{marginLeft: 1, marginRight: 1}}>
        <Item sx={{width: "380px", height: "380px", marginBottom: 3}}>
          <Square>
            <RadarChart chartData={chartData.pentagon}/>
          </Square>
          <Box sx={{ height:"70px", width:"70px", marginLeft:"auto"}}>
            <Number n={chartData.overallScore} />
          </Box>
        </Item>
        <Item>
          <h2>Lecture Quality</h2>
        </Item>
        <Box sx={{display: "flex"}}>
          <TeachingQualityGrid>
            <OverallScore score={Math.round(chartData.teachingQuality[0] * 10)} />
          </TeachingQualityGrid>
          <Box>
            <TQSubGrid>
              <h6>Entertainment </h6>
              <LinearPercentage percentage={chartData.entertaining[0]}></LinearPercentage>
            </TQSubGrid>
            <TQSubGrid>
              <h6>Interactivity</h6>
              <LinearPercentage percentage={chartData.interactivity[0]}></LinearPercentage>
            </TQSubGrid>
            <TQSubGrid>
              <h6>Delivery</h6>
              <LinearPercentage percentage={chartData.delivery[0]}></LinearPercentage>
            </TQSubGrid>
          </Box>
        </Box>
      </Stack>
      <Stack spacing={3} sx={{marginLeft: 2, merginRight: 1}}>
        <HorizontalGrid>
          <Stack sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{marginLeft: "47%"}}>
              <h2>GPA </h2>
            </Box>
            <Badges borderColor={JudgeGPABadgeColor(criteriaAverage[1])[0]} backgroundColor={JudgeGPABadgeColor(criteriaAverage[1])[1]} sx={{position: "relative", marginLeft: 'auto', display: "flex", alignItems: "center", justifyContent: "center"}}>
              <span style={{color: JudgeGPABadgeColor(criteriaAverage[1])[0]}}>{JudgeGPABadgeColor(criteriaAverage[1])[2]}</span>
            </Badges>
          </Stack>
          <HorizontalBarChart chartData={GPAData} />
        </HorizontalGrid>
        <HorizontalGrid>
          <Stack sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{marginLeft: "34%"}}>
              <h2> Lecture Difficulty </h2>
            </Box>
            <Badges borderColor={JudgeBadgesColor(criteriaAverage[2])[0]} backgroundColor={JudgeBadgesColor(criteriaAverage[2])[1]} sx={{position: "relative", marginLeft: 'auto', display: "flex", alignItems: "center", justifyContent: "center"}}>
              <span style={{color: JudgeBadgesColor(criteriaAverage[2])[0]}}>{JudgeBadgesColor(criteriaAverage[2])[2]}</span>
            </Badges>
          </Stack>
          <HorizontalBarChart chartData={chartData.lectureDifficulty} />
        </HorizontalGrid>
      </Stack>
      <Stack spacing={3} sx={{marginLeft: 3}}>
        <HorizontalGrid>
          <Stack sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{marginLeft: "41%"}}>
              <h2> Workload </h2>
            </Box>
            <Badges borderColor={JudgeBadgesColor(criteriaAverage[4])[0]} backgroundColor={JudgeBadgesColor(criteriaAverage[4])[1]} sx={{position: "relative", marginLeft: 'auto', display: "flex", alignItems: "center", justifyContent: "center"}}>
              <span style={{color: JudgeBadgesColor(criteriaAverage[4])[0]}}>{JudgeBadgesColor(criteriaAverage[4])[2]}</span>
            </Badges>
          </Stack>
          <HorizontalBarChart chartData={chartData.workload} />
        </HorizontalGrid>
        <HorizontalGrid>
          <Stack sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{marginLeft: "29%"}}>
              <h2> Final Exam Difficulty </h2>
            </Box>
            <Badges borderColor={JudgeBadgesColor(criteriaAverage[0])[0]} backgroundColor={JudgeBadgesColor(criteriaAverage[0])[1]} sx={{position: "relative", marginLeft: 'auto', display: "flex", alignItems: "center", justifyContent: "center"}}>
              <span style={{color: JudgeBadgesColor(criteriaAverage[0])[0]}}>{JudgeBadgesColor(criteriaAverage[0])[2]}</span>
            </Badges>
          </Stack>
          <HorizontalBarChart chartData={chartData.finalDifficulty} />
        </HorizontalGrid>
      </Stack>
    </Box>
  )
}

export default Overivew