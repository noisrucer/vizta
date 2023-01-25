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
  width: "800px"
}))

const GradingRatioGrid = styled(Item)(({theme}) => ({
  height: "250px",
  width: "500px"
}))

const OverallScoreGrid = styled(Item)(({theme}) => ({
  height: "250px",
  width: "700px"
}))

const CourseInfo = () => {
  return (
    <Box sx={{height: "600px", width: "2000px"}}>
      <Box sx={{margin: 2}}>
        <Stack sx={{display: "flex", flexDirection: "row"}}>
          <CourseDescriptionGrid sx={{marginRight: 2}}>
            Course Description
          </CourseDescriptionGrid>
          <TimeTableGrid>
            Time Table
          </TimeTableGrid>
        </Stack>
      </Box>
      <Box sx={{margin: 2}}>
        <Stack sx={{ display: "flex", flexDirection: "row"}}>
          <GradingRatioGrid sx={{marginRight: 2}}>
            Grading Ratio
          </GradingRatioGrid>
          <OverallScoreGrid>
            OverallScore
          </OverallScoreGrid>
        </Stack>
      </Box>
    </Box>
  )
}

export default CourseInfo