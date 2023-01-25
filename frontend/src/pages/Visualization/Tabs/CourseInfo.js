import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DoughnutChart from '../Charts/DoughnutChart';
import Item from "../Boxes/Item";

const CourseDescriptionGrid = styled(Item)(({theme}) => ({
  height: "250px",
  width: "400px"
}))

const TimeTableGrid = styled(Item)(({theme}) => ({
  height: "250px",
  width: "400px"
}))

const GradingRatioGrid = styled(Item)(({theme}) => ({
  height: "250px",
  width: "400px"
}))

const OverallScoreGrid = styled(Item)(({theme}) => ({
  height: "250px",
  width: "400px"
}))

const CourseInfo = () => {
  return (
    <Box sx={{display: "flex", flexDirection: "row"}}>
      <Stack spacing={2} sx={{margin: 1}}>
        <CourseDescriptionGrid>
          Course Description
        </CourseDescriptionGrid>
        <TimeTableGrid>
          Time Table
        </TimeTableGrid>
      </Stack>
      <Stack spacing={2} sx={{margin: 1}}>
        <GradingRatioGrid>
          Grading Ratio
        </GradingRatioGrid>
        <OverallScoreGrid>
          OverallScore
        </OverallScoreGrid>
      </Stack>
    </Box>
  )
}

export default CourseInfo