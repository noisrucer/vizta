import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DoughnutChart from '../Charts/DoughnutChart';
import Item from "../Boxes/Item";

const CourseDescriptionGrid = styled(Item)(({theme}) => ({
  height: "270px",
  width: "484px"
}))

const TimeTableGrid = styled(Item)(({theme}) => ({
  height: "270px",
  width: "884px"
}))

const GradingRatioGrid = styled(Item)(({theme}) => ({
  height: "270px",
  width: "584px"
}))

const OverallScoreGrid = styled(Item)(({theme}) => ({
  height: "270px",
  width: "784px"
}))

const CourseInfo = () => {
  return (
    <Box sx={{height: "550px", width: "1450px"}}>
      <Box sx={{marginLeft: 1}}>
        <Stack sx={{display: "flex", flexDirection: "row"}}>
          <CourseDescriptionGrid sx={{marginRight: 2}}>
            Course Description
          </CourseDescriptionGrid>
          <TimeTableGrid>
            Time Table
          </TimeTableGrid>
        </Stack>
      </Box>
      <Box sx={{marginLeft: 1, marginTop: 2}}>
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