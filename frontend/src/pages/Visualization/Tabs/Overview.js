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

const HorizontalGrid = styled(Item)(({theme}) => ({
  height: "300px",
  width: "480px"
}));

const Square = styled(Item)(({theme}) => ({
  height: "350px",
  width: "400px"
}));

const VerticalItem = styled(Item)(({theme}) => ({
  height: "200px",
  width: "200px"
}))

const Overivew = (chartData) => {

  console.log("chartData in overview: ", chartData)

  return (
    <Box sx={{display: "flex", flexDirection: "row"}} >
      <Stack sx={{margin: 1}}>
        <Square sx={{marginBottom: 2}}>
          <RadarChart chartData={chartData.pentagon}/>
        </Square>
        <Item>
          <h2>Teaching Quality</h2>
        </Item>
        <VerticalItem>
          <OverallScore score={70} />
        </VerticalItem>
      </Stack>
      <Stack spacing={2} sx={{margin: 1}}>
        <HorizontalGrid>
          <h2>GPA</h2>
          {/* <HorizontalBarChart chartData={chartData.GPA} /> */}
        </HorizontalGrid>
        <HorizontalGrid>
          <h2>Lecture Difficulty</h2>
          <HorizontalBarChart chartData={chartData.lectureDifficulty} />
        </HorizontalGrid>
      </Stack>
      <Stack spacing={2} sx={{margin: 1}}>
        <HorizontalGrid>
          <h2>Workload</h2>
          <HorizontalBarChart chartData={chartData.workload} />
        </HorizontalGrid>
        <HorizontalGrid>
          <h2>Final Exam Difficulty</h2>
          <HorizontalBarChart chartData={chartData.finalDifficulty} />
        </HorizontalGrid>
      </Stack>
    </Box>
  )
}

export default Overivew