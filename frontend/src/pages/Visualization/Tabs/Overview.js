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

const HorizontalGrid = styled(Item)(({theme}) => ({
  height: "300px",
  width: "477px"
}));

const Square = styled(Item)(({theme}) => ({
  height: "350px",
  width: "400px"
}));

const TeachingQualityGrid = styled(Item)(({theme}) => ({
  height: "200px",
  width: "200px"
}));

const TQSubGrid = styled(Item)(({theme}) => ({
  height: "66.66px",
  width: "200px"
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
    return ["#0cc1a9", "#2d3c47ff", "EASY"]
  } else if (average <=3.33){
    return ["#e3994e", "#3b353eff", "MEDIUM"]
  } else {
    return ["#ff403d", "#3b353eff", "HARD"]
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
  const pentagonLining = ["final diificulty", "GPA", "Lecture", "teaching Quality", "workload"]
  const criteriaAverage = chartData.pentagon.datasets[0].data
  console.log("pentagon in overview: ", chartData.pentagon.datasets[0].data)

  const GPAData = StackedGPA(chartData.GPA.datasets[0].data)
  console.log("GPASets: ", GPAData);
  console.log("ld: ", chartData.lectureDifficulty)

  return (
    <Box sx={{display: "flex", flexDirection: "row"}} >
      <Stack sx={{marginLeft: 1, marginRight: 1}}>
        <Square sx={{marginBottom: 2}}>
          <RadarChart chartData={chartData.pentagon}/>
        </Square>
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
      <Stack spacing={2} sx={{marginLeft: 1, merginRight: 1}}>
        <HorizontalGrid>
          <Stack sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{marginLeft: "47%"}}>
              <h2>GPA </h2>
            </Box>
            <Badges borderColor={JudgeBadgesColor(criteriaAverage[0])[0]} backgroundColor={JudgeBadgesColor(criteriaAverage[0])[1]} sx={{position: "relative", marginLeft: 'auto', display: "flex", alignItems: "center", justifyContent: "center"}}>
              <span style={{color: JudgeBadgesColor(criteriaAverage[0])[0]}}>{JudgeBadgesColor(criteriaAverage[0])[2]}</span>
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
      <Stack spacing={2} sx={{marginLeft: 2}}>
        <HorizontalGrid>
          <Stack sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{marginLeft: "40%"}}>
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